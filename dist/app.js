"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function autobind(_target, _methodName, descriptor) {
    const originalMethod = descriptor.value;
    return {
        configurable: true,
        get() {
            return originalMethod.bind(this);
        },
    };
}
function requireValidation(OriginalConstructor) {
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
function required(target, propName) {
    setValidator(target, propName, { required: true });
}
function maxLength(maxLength) {
    return (target, propName) => {
        setValidator(target, propName, { maxLength });
    };
}
let ProjectInput = class ProjectInput {
    constructor() {
        this.title = "";
        this.description = "";
        this.people = 0;
        this.templateEl = document.getElementById("project-input");
        this.hostEl = document.getElementById("app");
        this.formEl = document.importNode(this.templateEl.content, true)
            .firstElementChild;
        this.formEl.id = "user-input";
        this.titleEl = this.formEl.querySelector("#title");
        this.descriptionEl = this.formEl.querySelector("#description");
        this.peopleEl = this.formEl.querySelector("#people");
    }
    bind() {
        this.formEl.addEventListener("submit", this.submitForm);
    }
    validate(_inputData) {
        return true;
    }
    submitForm(e) {
        e.preventDefault();
        const inputData = this.gatherInputs();
        if (this.validate(inputData)) {
            console.log(inputData);
        }
        else {
            alert("Error validation");
        }
    }
    gatherInputs() {
        return {
            title: this.titleEl.value,
            description: this.descriptionEl.value,
            people: +this.peopleEl.value,
        };
    }
    render() {
        this.hostEl.insertAdjacentElement("afterbegin", this.formEl);
    }
};
__decorate([
    required
], ProjectInput.prototype, "title", void 0);
__decorate([
    required
], ProjectInput.prototype, "description", void 0);
__decorate([
    maxLength(10),
    required
], ProjectInput.prototype, "people", void 0);
__decorate([
    autobind
], ProjectInput.prototype, "submitForm", null);
ProjectInput = __decorate([
    requireValidation
], ProjectInput);
const projectInput = new ProjectInput();
projectInput.bind();
projectInput.render();
//# sourceMappingURL=app.js.map