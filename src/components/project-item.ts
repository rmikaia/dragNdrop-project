import { Draggable } from "../models/drag-drop";
import { autobind } from "../decorators/common";
import { Project } from "../models/project";

export default class ProjectItem implements Draggable {
  elementEl: HTMLLIElement;

  constructor(public parentEl: HTMLUListElement, public project: Project) {
    const templateEl = document.getElementById(
      "single-project"
    )! as HTMLTemplateElement;
    this.elementEl = document.importNode(templateEl.content, true)
      .firstElementChild! as HTMLLIElement;
  }

  bind() {
    this.elementEl.addEventListener("dragstart", this.dragStartHandler);
    this.elementEl.addEventListener("dragend", this.dragEndHandler);
  }

  @autobind
  dragStartHandler(event: DragEvent): void {
    event.dataTransfer!.setData("text/plain", this.project.id.toString());
    event.dataTransfer!.effectAllowed = "move";
  }

  @autobind
  dragEndHandler(_: DragEvent): void {
    console.log("Project item - drag end");
  }

  get persons() {
    const plural = this.project.people > 1 ? "s" : "";

    return `${this.project.people} person${plural}`;
  }

  render() {
    this.elementEl.id = `project-${this.project.id}`;
    this.elementEl.querySelector("h2")!.textContent = this.project.title;
    this.elementEl.querySelector(
      "h3"
    )!.textContent = `${this.persons} assigned`;
    this.elementEl.querySelector("p")!.textContent = this.project.description;

    this.parentEl.appendChild(this.elementEl);
  }
}
