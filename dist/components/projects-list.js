var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { autobind } from "../decorators/common.js";
import ProjectItem from "./project-item.js";
import { ProjectStatus } from "../models/project.js";
import { PROJECT_STATE } from "../state/project.js";
export default class ProjectsList {
    constructor(type) {
        this.type = type;
        this.relevantProjects = [];
        this.templateEl = document.getElementById("project-list");
        this.hostEl = document.getElementById("app");
        this.listContainerEl = document.importNode(this.templateEl.content, true)
            .firstElementChild;
        this.listContainerEl.id = `${this.type}-projects`;
        this.listEl = this.listContainerEl.querySelector("ul");
        this.listEl.id = `${this.type}-projects-list`;
    }
    bind() {
        this.listEl.addEventListener("dragover", this.dragOverHandler);
        this.listEl.addEventListener("drop", this.dropHandler);
        this.listEl.addEventListener("dragleave", this.dragLeaveHandler);
        PROJECT_STATE.addListener(this.itemAddedHandler);
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
            event.preventDefault();
            this.listEl.classList.add("droppable");
        }
    }
    dropHandler(event) {
        const projectId = event.dataTransfer.getData("text/plain");
        PROJECT_STATE.moveProject(projectId, this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished);
    }
    dragLeaveHandler(_) {
        this.listEl.classList.remove("droppable");
    }
    itemAddedHandler(projects) {
        this.relevantProjects = projects.filter((project) => project.status === this.type);
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
        const titleEl = this.listContainerEl.querySelector("h2");
        titleEl.textContent = `${this.type.toUpperCase()} PROJECTS`;
        this.hostEl.insertAdjacentElement("beforeend", this.listContainerEl);
    }
}
__decorate([
    autobind
], ProjectsList.prototype, "dragOverHandler", null);
__decorate([
    autobind
], ProjectsList.prototype, "dropHandler", null);
__decorate([
    autobind
], ProjectsList.prototype, "dragLeaveHandler", null);
__decorate([
    autobind
], ProjectsList.prototype, "itemAddedHandler", null);
//# sourceMappingURL=projects-list.js.map