import { DragTarget } from "../models/drag-drop.js";
import { autobind } from "../decorators/common.js";
import ProjectItem from "./project-item.js";
import { Project, ProjectStatus } from "../models/project.js";
import { PROJECT_STATE } from "../state/project.js";

export default class ProjectsList implements DragTarget {
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
    this.listEl = this.listContainerEl.querySelector("ul")! as HTMLUListElement;
    this.listEl.id = `${this.type}-projects-list`;
  }

  bind() {
    this.listEl.addEventListener("dragover", this.dragOverHandler);
    this.listEl.addEventListener("drop", this.dropHandler);
    this.listEl.addEventListener("dragleave", this.dragLeaveHandler);

    PROJECT_STATE.addListener(this.itemAddedHandler);
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
    PROJECT_STATE.moveProject(
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
