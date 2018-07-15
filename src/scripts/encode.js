import { Image } from 'image-js'

const DEPTH = 4;

/**
 * Encode a string to an image
 * @param {String} data - String to encode
 * @param {Boolean} use_alpha - Use alpha channel
 * @returns {Image} Image containing the input data
 */
export function encode_string(data, use_alpha) {
    let data_len = data.length

    if (data_len == 0) {
        return
    }

    let data_depth
    if (use_alpha) {
        data_depth = DEPTH
    } else {
        data_depth = 3
    }

    let size = calc_dimensisions(data_len, data_depth);

    let array = u8array_from_str(data, data_len + amount_padding_needed(data_len, size, DEPTH), use_alpha)

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
 * @param {Boolean} use_alpha - Use alpha channel
 * @returns {Uint8ClampedArray} Resulting data
 */
function u8array_from_str(data, _length, use_alpha) {
    let length = _length ? _length : data.length
    let data_length = data.length

    let array = new Uint8ClampedArray(length)

    let i = 0
    let data_index = 0
    while (i < length) {
        // TODO: Add alpha option
        if ((((i + 1) % 4) == 0) && !use_alpha) {
            array[i] = 255
        } else {
            if (data_index < data_length) {
                array[i] = data[data_index++].charCodeAt(0)
            }
        }
        i++
    }

    return array
}