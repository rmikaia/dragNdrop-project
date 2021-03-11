var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("models/common", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("models/project", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Project = exports.ProjectStatus = void 0;
    var ProjectStatus;
    (function (ProjectStatus) {
        ProjectStatus["Active"] = "active";
        ProjectStatus["Finished"] = "finished";
    })(ProjectStatus = exports.ProjectStatus || (exports.ProjectStatus = {}));
    class Project {
        constructor(title, description, people, status) {
            this.title = title;
            this.description = description;
            this.people = people;
            this.status = status;
            this.id = Date.now();
        }
    }
    exports.Project = Project;
});
define("models/validator", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("decorators/validator", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.maxLength = exports.required = exports.requireValidation = void 0;
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
    exports.requireValidation = requireValidation;
    function required(target, propName) {
        setValidator(target, propName, { required: true });
    }
    exports.required = required;
    function maxLength(maxLength) {
        return (target, propName) => {
            setValidator(target, propName, { maxLength });
        };
    }
    exports.maxLength = maxLength;
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
});
define("decorators/common", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.autobind = void 0;
    function autobind(_target, _methodName, descriptor) {
        const originalMethod = descriptor.value;
        return {
            configurable: true,
            get() {
                return originalMethod.bind(this);
            },
        };
    }
    exports.autobind = autobind;
});
define("state/common", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class State {
        constructor() {
            this.listeners = [];
        }
        addListener(listener) {
            this.listeners.push(listener);
        }
    }
    exports.default = State;
});
define("state/project", ["require", "exports", "state/common"], function (require, exports, common_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PROJECT_STATE = void 0;
    common_js_1 = __importDefault(common_js_1);
    class ProjectState extends common_js_1.default {
        constructor() {
            super();
            this.projects = [];
        }
        static getInstance() {
            if (!this.instance) {
                this.instance = new ProjectState();
            }
            return this.instance;
        }
        addProject(project) {
            this.projects.push(project);
            this.updateListeners();
        }
        moveProject(projectId, newStatus) {
            const project = this.projects.find((prj) => prj.id.toString() === projectId);
            if (project && project.status !== newStatus) {
                project.status = newStatus;
                this.updateListeners();
            }
        }
        updateListeners() {
            this.listeners.forEach((listener) => {
                listener(this.projects.slice());
            });
        }
    }
    exports.PROJECT_STATE = ProjectState.getInstance();
});
define("components/project-input", ["require", "exports", "decorators/validator", "decorators/common", "models/project", "state/project"], function (require, exports, validator_js_1, common_js_2, project_js_1, project_js_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
                const newProject = new project_js_1.Project(inputData.title, inputData.description, inputData.people, project_js_1.ProjectStatus.Active);
                project_js_2.PROJECT_STATE.addProject(newProject);
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
        validator_js_1.required
    ], ProjectInput.prototype, "title", void 0);
    __decorate([
        validator_js_1.required
    ], ProjectInput.prototype, "description", void 0);
    __decorate([
        validator_js_1.maxLength(10),
        validator_js_1.required
    ], ProjectInput.prototype, "people", void 0);
    __decorate([
        common_js_2.autobind
    ], ProjectInput.prototype, "submitForm", null);
    ProjectInput = __decorate([
        validator_js_1.requireValidation
    ], ProjectInput);
    exports.default = ProjectInput;
});
define("models/drag-drop", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("components/project-item", ["require", "exports", "decorators/common"], function (require, exports, common_js_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ProjectItem {
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
        common_js_3.autobind
    ], ProjectItem.prototype, "dragStartHandler", null);
    __decorate([
        common_js_3.autobind
    ], ProjectItem.prototype, "dragEndHandler", null);
    exports.default = ProjectItem;
});
define("components/projects-list", ["require", "exports", "decorators/common", "components/project-item", "models/project", "state/project"], function (require, exports, common_js_4, project_item_js_1, project_js_3, project_js_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    project_item_js_1 = __importDefault(project_item_js_1);
    class ProjectsList {
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
            project_js_4.PROJECT_STATE.addListener(this.itemAddedHandler);
        }
        dragOverHandler(event) {
            if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
                event.preventDefault();
                this.listEl.classList.add("droppable");
            }
        }
        dropHandler(event) {
            const projectId = event.dataTransfer.getData("text/plain");
            project_js_4.PROJECT_STATE.moveProject(projectId, this.type === "active" ? project_js_3.ProjectStatus.Active : project_js_3.ProjectStatus.Finished);
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
                const projectItem = new project_item_js_1.default(this.listEl, project);
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
        common_js_4.autobind
    ], ProjectsList.prototype, "dragOverHandler", null);
    __decorate([
        common_js_4.autobind
    ], ProjectsList.prototype, "dropHandler", null);
    __decorate([
        common_js_4.autobind
    ], ProjectsList.prototype, "dragLeaveHandler", null);
    __decorate([
        common_js_4.autobind
    ], ProjectsList.prototype, "itemAddedHandler", null);
    exports.default = ProjectsList;
});
define("app", ["require", "exports", "components/project-input", "components/projects-list"], function (require, exports, project_input_js_1, projects_list_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    project_input_js_1 = __importDefault(project_input_js_1);
    projects_list_js_1 = __importDefault(projects_list_js_1);
    const projectInput = new project_input_js_1.default();
    projectInput.bind();
    projectInput.render();
    const activeProjectsList = new projects_list_js_1.default("active");
    activeProjectsList.bind();
    activeProjectsList.render();
    const finishedProjectsList = new projects_list_js_1.default("finished");
    finishedProjectsList.bind();
    finishedProjectsList.render();
});
//# sourceMappingURL=bundle.js.map