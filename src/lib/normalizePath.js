import path from 'path'

/**
 * Normalizes paths to be absolute and well formatted.
 *
 * @param  {String} oldPath Path to normalize.
 * @return {String}         Normalized path.
 */
export default function(oldPath) {
    let newPath = oldPath

    if (!path.isAbsolute(newPath)) {
        newPath = path.join(process.cwd(), newPath)
    }

    return path.normalize(newPath)
}
