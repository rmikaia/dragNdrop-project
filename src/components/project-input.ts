import {
  requireValidation,
  required,
  maxLength,
} from "../decorators/validator.js";
import { autobind } from "../decorators/common.js";
import { Project, ProjectMetadata, ProjectStatus } from "../models/project.js";
import { PROJECT_STATE } from "../state/project.js";

@requireValidation
export default class ProjectInput {
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

  validate(_inputData: ProjectMetadata): boolean {
    return true;
  }

  @autobind
  submitForm(e: Event) {
    e.preventDefault();

    const inputData = this.gatherInputs();
    if (this.validate(inputData)) {
      const newProject = new Project(
        inputData.title,
        inputData.description,
        inputData.people,
        ProjectStatus.Active
      );
      PROJECT_STATE.addProject(newProject);
    } else {
      alert("Error validation");
    }
  }

  gatherInputs(): ProjectMetadata {
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
