import * as actions from './actions'
import { output_is_text } from './misc'

$(function () {
    $('.menu .item').tab()

    $("#alpha.ui.checkbox").checkbox({
        onChange: function () {
            if (output_is_text()) {
                actions.update_encode_preview($('#text_area')[0].value)
            } else {
                actions.encode_file_changed()
            }
            actions.decode_file_changed()
        }
    })

    $('#output_format .ui.radio.checkbox').checkbox({
        onChecked: function () {
            if (output_is_text()) {
                $("#output_section_text").show()
                $("#encoding_text_input").show()
                $("#encoding_file_upload").hide()
                $("#output_section_file").hide()
                actions.decode_file_changed()
            } else {
                $("#output_section_text").hide()
                $("#encoding_text_input").hide()
                $("#encoding_file_upload").show()
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
