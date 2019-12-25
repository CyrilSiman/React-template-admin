export const required = value => (value ? undefined : 'validator.required')

export const mustBeNumber = value => (isNaN(value) ? 'validator.mustBeANumber' : undefined)
export const mustBeAnEmail = value => (value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ? undefined : 'validator.email')

export const mustBeIdentical = valueRef => value => (valueRef === value) ? undefined : 'validator.identical'

export const passwordComplexity = value => (value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,10}$/) ? undefined : 'validator.password')

export const minValue = min => value =>
    isNaN(value) || value >= min ? undefined : 'validator.greaterThan'
export const maxValue = max => value =>
    isNaN(value) || value <= max ? undefined : 'validator.lowerThan'

/**
 * Validate values and return translate error if necessary or undefined otherwise
 * @param value value tested
 * @param translateFunc function used to translate error
 * @param validators validators
 * @returns {*}
 */
export default function validator(value,translateFunc, ...validators) {
    const error = validators.reduce((error, validator) => error || validator(value), undefined)
    return error ? translateFunc(error) : undefined
}
