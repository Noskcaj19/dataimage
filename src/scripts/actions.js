import { decode_image } from './decode'
import { encode_string } from './encode'

import { Image } from 'image-js'

/**
 * Handles a new file to encode
 */
export function encode_file_changed() {
    load_encode_file(function (e) {
        update_encode_preview(e.target.result)
        // Set suggested download filename
        $("#download_link")[0].download = $("#file_upload_encode")[0].value.replace("C:\\fakepath\\", "")
    })
}

/**
 * Updates live image with an encoded string
 * @param {String} string String to encode
 */
export function update_encode_preview(string) {
    let img = encode_string(string)

    if (img != null) {
        let canvas = img.getCanvas()
        // Make sure we can access again
        canvas.id = "output"
        $('#output').replaceWith(canvas)

        $("#download_link")[0].href = img.toDataURL()
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
            $("#decoding_output").text(decode_image(img))
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