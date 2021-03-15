import { CommonConstructor } from "../models/common";
import { ProjectMetadata } from "../models/project";
import { ValidatorProps, Validators } from "../models/validator";

export function requireValidation<T extends CommonConstructor>(
  OriginalConstructor: T
) {
  return class extends OriginalConstructor {
    validators: unknown;

    validate(inputData: ProjectMetadata) {
      const validators = this.validators as Validators;
      let isValid = true;

      for (const key in inputData) {
        isValid = isValid && checkRequired(inputData[key], validators[key]);
        isValid = isValid && checkMaxLength(inputData[key], validators[key]);
      }

      return isValid;
    }
  };
}

export function required(target: any, propName: string) {
  setValidator(target, propName, { required: true });
}

export function maxLength(maxLength: number) {
  return (target: any, propName: string) => {
    setValidator(target, propName, { maxLength });
  };
}

// Functions
function checkRequired(propValue: any, validator: Partial<ValidatorProps>) {
  let isValid = true;

  if (validator.required) {
    isValid = isValid && propValue !== "";
  }

  return isValid;
}

function checkMaxLength(propValue: any, validator: Partial<ValidatorProps>) {
  let isValid = true;

  if (validator.maxLength) {
    isValid = isValid && propValue <= validator.maxLength;
  }

  return isValid;
}

const setValidator = (
  target: any,
  propName: string,
  value: { [T: string]: any }
) => {
  if (!target.validators) {
    target.validators = {};
  }

  return (target.validators[propName] = {
    ...target.validators[propName],
    ...value,
  });
};
