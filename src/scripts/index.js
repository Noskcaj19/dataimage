import * as actions from './actions'
import { output_is_text } from './misc'

$(function () {
    $('.menu .item').tab()

    $('#output_format .ui.radio.checkbox').checkbox({
        onChecked: function () {
            if (output_is_text()) {
                $("#output_section_text").show()
                $("#output_section_file").hide()
                actions.decode_file_changed()
            } else {
                $("#output_section_text").hide()
                $("#output_section_file").show()
                actions.decode_file_changed()
            }
        }
    })
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
