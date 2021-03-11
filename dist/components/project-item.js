var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { autobind } from "../decorators/common.js";
export default class ProjectItem {
    constructor(parentEl, project) {
        this.parentEl = parentEl;
        this.project = project;
        const templateEl = document.getElementById("single-project");
        this.elementEl = document.importNode(templateEl.content, true)
            .firstElementChild;
    }
    bind() {
        this.elementEl.addEventListener("dragstart", this.dragStartHandler);
        this.elementEl.addEventListener("dragend", this.dragEndHandler);
    }
    dragStartHandler(event) {
        event.dataTransfer.setData("text/plain", this.project.id.toString());
        event.dataTransfer.effectAllowed = "move";
    }
    dragEndHandler(_) {
        console.log("Project item - drag end");
    }
    get persons() {
        const plural = this.project.people > 1 ? "s" : "";
        return `${this.project.people} person${plural}`;
    }
    render() {
        this.elementEl.id = `project-${this.project.id}`;
        this.elementEl.querySelector("h2").textContent = this.project.title;
        this.elementEl.querySelector("h3").textContent = `${this.persons} assigned`;
        this.elementEl.querySelector("p").textContent = this.project.description;
        this.parentEl.appendChild(this.elementEl);
    }
}
__decorate([
    autobind
], ProjectItem.prototype, "dragStartHandler", null);
__decorate([
    autobind
], ProjectItem.prototype, "dragEndHandler", null);
//# sourceMappingURL=project-item.js.map