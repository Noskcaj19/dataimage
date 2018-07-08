import draw_string from './draw'
import { decode_image } from './decode'

export function handle_encode_submit() {
    let file_upload = $('#file_upload_encode')[0]
    if (file_upload.files.length) {
        let reader = new FileReader()

        reader.onload = function (e) {
            draw_string(e.target.result)
        }

        reader.readAsBinaryString(file_upload.files[0])
    } else {
        console.info("No files")
    }
}

export function handle_decode_submit() {
    let img = $("#decode_preview")[0]
    let canvas = document.createElement('canvas')
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight

    let ctx = canvas.getContext("2d")
    ctx.drawImage(img, 0, 0)
    let img_data = ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight)

    decode_image(img_data.data)
}

export function update_decode_preview() {
    let file_upload = $('#file_upload_decode')[0]
    if (file_upload.files.length) {
        let reader = new FileReader()

        reader.onload = function (e) {
            let img = $("#decode_preview")[0]
            img.src = e.target.result
        }

        reader.readAsDataURL(file_upload.files[0])
    }
}
