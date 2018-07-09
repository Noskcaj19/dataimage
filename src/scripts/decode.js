import { Image } from "image-js"

/**
 * Decode a image to a string
 * @param {Image} image Image to decode
 * @returns {String}
 */
export function decode_image(image) {
    let decoder = new TextDecoder("utf-8")

    // TODO: Add alpha option
    // let text = decoder.decode(image.data.filter((value, index) => {
    //     return ((index + 1) % 4 != 0)
    // }))
    let text = decoder.decode(image.data)

    return text
}