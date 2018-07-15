import { decode_image, decode_image_raw } from './decode'
import { encode_string } from './encode'
import * as misc from './misc'

import { Image } from 'image-js'

/**
 * Handles a new file to encode
 */
export function encode_file_changed() {
    load_encode_file(function (e) {
        update_encode_preview(e.target.result)
        // Set suggested download filename
        $("#download_link")[0].download = misc.filename_from_path($("#file_upload_encode")[0].value)
    })
}

/**
 * Updates live image with an encoded string
 * @param {String} string String to encode
 */
export function update_encode_preview(string) {
    let img = encode_string(string, misc.should_use_alpha())

    if (img != null) {
        let url = img.toDataURL()
        $('#output')[0].src = url

        $("#download_link")[0].href = url
    }
}

/**
 * Load submitted file and get the content
 * @param {function(ProgressEvent):void} callback - Called when file load completes
 */
function load_encode_file(callback) {
    let file_upload = $('#file_upload_encode')[0]
    if (file_upload.files.length) {
        let reader = new FileReader()

        reader.onload = callback
        reader.readAsBinaryString(file_upload.files[0])
    } else {
        console.info("No files")
    }
}

/**
 * Decodes image and updates output text
 */
export function decode_file_changed() {
    load_decode_file(function (e) {
        let preview = $("#decode_preview")[0]
        preview.src = e.target.result

        Image.load(e.target.result).then(img => {
            let use_alpha = misc.should_use_alpha()

            if (misc.is_text_mode()) {
                $("#decoding_output").text(decode_image(img, use_alpha))
            } else {

                let blob = new Blob([misc.remove_end_nulls(decode_image_raw(img))], { type: 'application/octet-stream' })
                let url = URL.createObjectURL(blob)
                $("#decoded_download")[0].href = url

                // Set suggested download filename
                $("#decoded_download")[0].download = misc.filename_from_path($("#file_upload_decode")[0].value).replace(/\..{3}$/, "")
            }
        })
    })
}

/**
 * Load submitted file and get the content
 * @param {function(ProgressEvent):void} callback - Called when file load completes
 */
function load_decode_file(callback) {
    let file_upload = $('#file_upload_decode')[0]
    if (file_upload.files.length) {
        let reader = new FileReader()

        reader.onload = callback
        reader.readAsDataURL(file_upload.files[0])
    }
}