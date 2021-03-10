/// <reference path="../models/drag-drop.ts"  />
/// <reference path="../decorators/common.ts"  />
/// <reference path="./project-item.ts"  />
/// <reference path="../models/project.ts"  />
/// <reference path="../state/project.ts"  />

namespace App {
  export class ProjectsList implements DragTarget {
    templateEl: HTMLTemplateElement;
    hostEl: HTMLDivElement;
    listContainerEl: HTMLElement;
    listEl: HTMLUListElement;
    relevantProjects: Project[] = [];

    constructor(private type: "active" | "finished") {
      this.templateEl = document.getElementById(
        "project-list"
      )! as HTMLTemplateElement;
      this.hostEl = document.getElementById("app")! as HTMLDivElement;
      this.listContainerEl = document.importNode(this.templateEl.content, true)
        .firstElementChild! as HTMLElement;
      this.listContainerEl.id = `${this.type}-projects`;
      this.listEl = this.listContainerEl.querySelector(
        "ul"
      )! as HTMLUListElement;
      this.listEl.id = `${this.type}-projects-list`;
    }

    bind() {
      this.listEl.addEventListener("dragover", this.dragOverHandler);
      this.listEl.addEventListener("drop", this.dropHandler);
      this.listEl.addEventListener("dragleave", this.dragLeaveHandler);

      projectState.addListener(this.itemAddedHandler);
    }

    @autobind
    dragOverHandler(event: DragEvent) {
      if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
        event.preventDefault();
        this.listEl.classList.add("droppable");
      }
    }

    @autobind
    dropHandler(event: DragEvent) {
      const projectId = event.dataTransfer!.getData("text/plain");
      projectState.moveProject(
        projectId,
        this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
      );
    }

    @autobind
    dragLeaveHandler(_: DragEvent) {
      this.listEl.classList.remove("droppable");
    }

    @autobind
    itemAddedHandler(projects: Project[]) {
      this.relevantProjects = projects.filter(
        (project) => project.status === this.type
      );
      this.renderList();
    }

    renderList() {
      this.listEl.innerHTML = "";

      this.relevantProjects.forEach((project) => {
        const projectItem = new ProjectItem(this.listEl, project);
        projectItem.bind();
        projectItem.render();
      });
    }

    render() {
      const titleEl = this.listContainerEl.querySelector("h2")!;
      titleEl.textContent = `${this.type.toUpperCase()} PROJECTS`;

      this.hostEl.insertAdjacentElement("beforeend", this.listContainerEl);
    }
  }
}
