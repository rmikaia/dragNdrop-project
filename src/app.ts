function autobind(
  _target: any,
  _methodName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  return {
    configurable: true,
    get() {
      return originalMethod.bind(this);
    },
  } as PropertyDescriptor;
}

interface InputData {
  title: string;
  description: string;
  people: number;
  [T: string]: any;
}

type ValidatorProps = {
  required: boolean;
  maxLength: number;
};

type Validators = {
  [T: string]: Partial<ValidatorProps>;
};

type CommonConstructor = { new (...arg: any[]): {} };

function requireValidation<T extends CommonConstructor>(
  OriginalConstructor: T
) {
  return class extends OriginalConstructor {
    validators: unknown;

    validate(inputData: InputData) {
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

function required(target: any, propName: string) {
  setValidator(target, propName, { required: true });
}

function maxLength(maxLength: number) {
  return (target: any, propName: string) => {
    setValidator(target, propName, { maxLength });
  };
}

@requireValidation
class ProjectInput {
  templateEl: HTMLTemplateElement;
  hostEl: HTMLDivElement;
  formEl: HTMLFormElement;

  @required
  title: string = "";

  @required
  description: string = "";

  @maxLength(10)
  @required
  people: number = 0;

  titleEl: HTMLInputElement;
  descriptionEl: HTMLTextAreaElement;
  peopleEl: HTMLInputElement;

  constructor() {
    this.templateEl = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.hostEl = document.getElementById("app")! as HTMLDivElement;
    this.formEl = document.importNode(this.templateEl.content, true)
      .firstElementChild! as HTMLFormElement;
    this.formEl.id = "user-input";
    this.titleEl = this.formEl.querySelector("#title")! as HTMLInputElement;
    this.descriptionEl = this.formEl.querySelector(
      "#description"
    )! as HTMLTextAreaElement;
    this.peopleEl = this.formEl.querySelector("#people")! as HTMLInputElement;
  }

  bind() {
    this.formEl.addEventListener("submit", this.submitForm);
  }

  validate(_inputData: InputData): boolean {
    return true;
  }

  @autobind
  submitForm(e: Event) {
    e.preventDefault();

    const inputData = this.gatherInputs();
    if (this.validate(inputData)) {
      console.log(inputData);
    } else {
      alert("Error validation");
    }
  }

  gatherInputs(): InputData {
    return {
      title: this.titleEl.value,
      description: this.descriptionEl.value,
      people: +this.peopleEl.value,
    };
  }

  render() {
    this.hostEl.insertAdjacentElement("afterbegin", this.formEl);
  }
}

const projectInput = new ProjectInput();
projectInput.bind();
projectInput.render();
