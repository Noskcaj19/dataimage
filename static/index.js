import draw_string from './draw'
import * as actions from './actions';


$(function () {
    $('.menu .item').tab()

    $('#encode_file_submit').click(function (e) {
        e.preventDefault();
        actions.handle_encode_upload();
    })

    $('#decode_file_submit').click(function (e) {
        e.preventDefault();
        actions.handle_decode_upload();
    })

    $('#text_area').bind('input propertychange focus', function () { draw_string(this.value) })
})

