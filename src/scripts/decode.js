import { Image } from "image-js"

/**
 * Decode an image to a string
 * @param {Image} image - Image to decode
 * @param {Boolean} use_alpha - Use data from the alpha channel
 * @returns {String}
 */
export function decode_image(image, use_alpha) {
    let decoder = new TextDecoder("utf-8")

    let text
    if (use_alpha) {
        text = decoder.decode(image.data)
    } else {
        text = decoder.decode(image.data.filter((value, index) => {
            return ((index + 1) % 4 != 0)
        }))
    }

    return text
}

/**
 * Decode an image to bytes
 * @param {Image} image - Image to decode
 * @returns {TypedArray}
 */
export function decode_image_raw(image) {
    return image.data
}