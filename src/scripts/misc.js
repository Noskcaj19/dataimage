/**
 * Returns whether or not decoding output is in text mode
 * @returns {Boolean}
 */
export function output_is_text() {
    return $("#output_format input[name=output_format]:checked").val() === "text"
}

/**
 * Returns whether or not encoding should use the alpha channel
 * @returns {Boolean}
 */
export function should_use_alpha() {
    return $("input[name=alpha]:checked").val() === "on"
}

/**
 * Returns the filename from a form path
 * @param {String} path - Dirty path
 * @returns {String}
 */
export function filename_from_path(path) {
    return path.replace("C:\\fakepath\\", "")
}

/**
 * Removes ending null bytes
 * @param {Array} array Array to trim
 * @returns {Array}
 */
export function remove_end_nulls(array) {
    let i = array.length
    for (; i >= 0; i--) {
        if (array[i] != 0x0) {
            break
        }
    }
    return array.slice(0, i)
}