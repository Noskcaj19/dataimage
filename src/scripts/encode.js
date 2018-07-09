import { Image } from 'image-js'

const DEPTH = 4;

/**
 * Encode a string to an image
 * @param {String} data - String to encode
 * @returns {Image} Image containing the input data
 */
export function encode_string(data) {
    let data_len = data.length

    if (data_len == 0) {
        let canvas = $('#output')[0]
        let ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return
    }

    let size = calc_dimensisions(data_len, DEPTH);

    let array = u8array_from_str(data, data_len + amount_padding_needed(data_len, size, DEPTH))
    console.log(array);


    let _canvas = document.createElement('canvas');
    _canvas.width = _canvas.height = size;


    let img = Image.fromCanvas(_canvas)
    img.data = array

    return img
}

/**
 * Calculate the smallest image dimensions that can fit the daata
 * @param {Number} data_len - Length of the target data
 * @param {Number} components - The number of channels in the image
 * @return {Number} Length of a side
 */
function calc_dimensisions(data_len, components) {
    return Math.ceil(Math.sqrt(Math.ceil(data_len / components)))
}

/**
 * Calculate the amount of padding to fit a given image
 * @param {Number} data_len - Length of target data
 * @param {Number} size - The size of the image
 * @param {Number} channels - The number of channels in the image
 * @returns {Number} Padding needed
 */
function amount_padding_needed(data_len, size, channels) {
    let length = size * size * channels
    return (length - (data_len % length))
}

/**
 * Convert a string to raw ascii values in an int array
 * @param {String} data - The input string
 * @param {Number} [_length] - Optional output array length
 * @returns {Uint8ClampedArray} Resulting data
 */
function u8array_from_str(data, _length) {
    let length = _length ? _length : data.length
    let data_length = data.length

    let array = new Uint8ClampedArray(length)

    let i = 0
    let data_index = 0
    while (i < length) {
        // TODO: Add alpha option
        // if (((i + 1) % 4) == 0) {
        // array[i] = 255
        // } else {
        if (data_index < data_length) {
            array[i] = data[data_index++].charCodeAt(0)
        }
        // }
        i++
    }

    return array
}