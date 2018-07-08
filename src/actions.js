import draw_string from './draw'

export function handle_encode_upload() {
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

export function handle_decode_upload() {
    let file_upload = $('#file_upload_decode')[0]
    if (file_upload.files.length) {
        let reader = new FileReader()

        reader.onload = function (e) {
            process_decode(e.target.result)
        }

        reader.readAsDataURL(file_upload.files[0])
    } else {
        console.info("No files")
    }
}

function process_decode(data_uri) {
    let img = $("#decode_preview")[0]
    img.src = data_uri
    let canvas = document.createElement('canvas')
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0)

}