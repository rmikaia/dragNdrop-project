var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { requireValidation, required, maxLength, } from "../decorators/validator.js";
import { autobind } from "../decorators/common.js";
import { Project, ProjectStatus } from "../models/project.js";
import { PROJECT_STATE } from "../state/project.js";
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
            const newProject = new Project(inputData.title, inputData.description, inputData.people, ProjectStatus.Active);
            PROJECT_STATE.addProject(newProject);
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
export default ProjectInput;
//# sourceMappingURL=project-input.js.map