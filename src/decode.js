export function decode_image(img_data) {
    let output_area = $("#decoding_output")

    let enc = new TextDecoder("utf-8")

    let text = enc.decode(img_data.filter((value, index) => {
        return ((index + 1) % 4 != 0);
    }));

    output_area.text(text)
}