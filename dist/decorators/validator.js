export function requireValidation(OriginalConstructor) {
    return class extends OriginalConstructor {
        validate(inputData) {
            const validators = this.validators;
            let isValid = true;
            for (const key in inputData) {
                isValid = isValid && checkRequired(inputData[key], validators[key]);
                isValid = isValid && checkMaxLength(inputData[key], validators[key]);
            }
            return isValid;
        }
    };
}
export function required(target, propName) {
    setValidator(target, propName, { required: true });
}
export function maxLength(maxLength) {
    return (target, propName) => {
        setValidator(target, propName, { maxLength });
    };
}
function checkRequired(propValue, validator) {
    let isValid = true;
    if (validator.required) {
        isValid = isValid && propValue !== "";
    }
    return isValid;
}
function checkMaxLength(propValue, validator) {
    let isValid = true;
    if (validator.maxLength) {
        isValid = isValid && propValue <= validator.maxLength;
    }
    return isValid;
}
const setValidator = (target, propName, value) => {
    if (!target.validators) {
        target.validators = {};
    }
    return (target.validators[propName] = Object.assign(Object.assign({}, target.validators[propName]), value));
};
//# sourceMappingURL=validator.js.map