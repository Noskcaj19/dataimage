import draw_string from './draw'
import * as actions from './actions';


$(function () {
    $('.menu .item').tab()

    $('#encode_file_submit').click(function (e) {
        e.preventDefault()
        actions.handle_encode_submit()
    })

    $('#decode_file_submit').click(function (e) {
        e.preventDefault()
        actions.handle_decode_submit()
    })

    $('#file_upload_decode').change(function () {
        actions.update_decode_preview()
    })

    $('#text_area').bind('input propertychange focus', function () { draw_string(this.value) })
})

