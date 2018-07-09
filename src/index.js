import * as actions from './actions';

$(function () {
    $('.menu .item').tab()
})

$('#file_upload_decode').change(function () {
    actions.decode_file_changed()
})

$('#file_upload_encode').change(function () {
    actions.encode_file_changed()
})

$('#text_area').bind('input propertychange focus', function () {
    actions.update_encode_preview(this.value)
})
