const DEPTH = 4;

var canvas = $("#output")[0]
var ctx = canvas.getContext('2d', { alpha: true });


export default function draw_string(data) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (data.length == 0) {
        return
    }

    let size = calc_dimensisions(data.length, DEPTH);

    canvas.height = size
    canvas.width = size

    let data_len = data.length

    let array = u8array_from_str(data, data_len + amount_padding_needed(data_len, size, DEPTH))

    ctx.putImageData(new ImageData(array, size), 0, 0)
}

window.db = draw_string;

function calc_dimensisions(data_len, components) {
    return Math.ceil(Math.sqrt(Math.ceil(data_len / components)))
}

function amount_padding_needed(data_len, size, channels) {
    let length = size * size * channels
    return (length - (data_len % length))
}

function u8array_from_str(data, _length) {
    let length = _length ? _length : data.length
    let data_length = data.length
    let array = new Uint8ClampedArray(length)

    let i = 0
    let data_index = 0
    while (i < data_length) {
        // if (((i + 1) % 4) == 0) {
        // array[i] = 255
        // } else {
        array[i] = data[data_index].charCodeAt(0)

        data_index++
        // }
        i++
    }
    console.log(array);


    return array
}