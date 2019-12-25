
/**
 * Test if error include code.
 * @param error
 * @param code
 * @returns {boolean}
 */
export const hasError = (error,code) => {
    let result = false
    if(error) {
        const {graphQLErrors} = error
        if (graphQLErrors) {
            result = !!graphQLErrors.find((value) => {
                const extensions = value.extensions
                if (extensions) {
                    return extensions.code === code
                }
                return false
            })
        }
    }
    return result
}