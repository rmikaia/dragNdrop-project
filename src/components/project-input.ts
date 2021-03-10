/// <reference path="../decorators/validator.ts"  />
/// <reference path="../decorators/common.ts"  />
/// <reference path="../models/project.ts"  />
/// <reference path="../state/project.ts"  />

namespace App {
  @requireValidation
  export class ProjectInput {
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
        projectState.addProject(newProject);
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
}
