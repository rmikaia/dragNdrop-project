/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/project-input.ts":
/*!*****************************************!*\
  !*** ./src/components/project-input.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _decorators_validator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../decorators/validator */ "./src/decorators/validator.ts");
/* harmony import */ var _decorators_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../decorators/common */ "./src/decorators/common.ts");
/* harmony import */ var _models_project__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../models/project */ "./src/models/project.ts");
/* harmony import */ var _state_project__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../state/project */ "./src/state/project.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




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
            const newProject = new _models_project__WEBPACK_IMPORTED_MODULE_2__.Project(inputData.title, inputData.description, inputData.people, _models_project__WEBPACK_IMPORTED_MODULE_2__.ProjectStatus.Active);
            _state_project__WEBPACK_IMPORTED_MODULE_3__.PROJECT_STATE.addProject(newProject);
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
    _decorators_validator__WEBPACK_IMPORTED_MODULE_0__.required
], ProjectInput.prototype, "title", void 0);
__decorate([
    _decorators_validator__WEBPACK_IMPORTED_MODULE_0__.required
], ProjectInput.prototype, "description", void 0);
__decorate([
    (0,_decorators_validator__WEBPACK_IMPORTED_MODULE_0__.maxLength)(10),
    _decorators_validator__WEBPACK_IMPORTED_MODULE_0__.required
], ProjectInput.prototype, "people", void 0);
__decorate([
    _decorators_common__WEBPACK_IMPORTED_MODULE_1__.autobind
], ProjectInput.prototype, "submitForm", null);
ProjectInput = __decorate([
    _decorators_validator__WEBPACK_IMPORTED_MODULE_0__.requireValidation
], ProjectInput);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProjectInput);


/***/ }),

/***/ "./src/components/project-item.ts":
/*!****************************************!*\
  !*** ./src/components/project-item.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProjectItem)
/* harmony export */ });
/* harmony import */ var _decorators_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../decorators/common */ "./src/decorators/common.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

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
    _decorators_common__WEBPACK_IMPORTED_MODULE_0__.autobind
], ProjectItem.prototype, "dragStartHandler", null);
__decorate([
    _decorators_common__WEBPACK_IMPORTED_MODULE_0__.autobind
], ProjectItem.prototype, "dragEndHandler", null);


/***/ }),

/***/ "./src/components/projects-list.ts":
/*!*****************************************!*\
  !*** ./src/components/projects-list.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProjectsList)
/* harmony export */ });
/* harmony import */ var _decorators_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../decorators/common */ "./src/decorators/common.ts");
/* harmony import */ var _project_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project-item */ "./src/components/project-item.ts");
/* harmony import */ var _models_project__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../models/project */ "./src/models/project.ts");
/* harmony import */ var _state_project__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../state/project */ "./src/state/project.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




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
        _state_project__WEBPACK_IMPORTED_MODULE_3__.PROJECT_STATE.addListener(this.itemAddedHandler);
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
            event.preventDefault();
            this.listEl.classList.add("droppable");
        }
    }
    dropHandler(event) {
        const projectId = event.dataTransfer.getData("text/plain");
        _state_project__WEBPACK_IMPORTED_MODULE_3__.PROJECT_STATE.moveProject(projectId, this.type === "active" ? _models_project__WEBPACK_IMPORTED_MODULE_2__.ProjectStatus.Active : _models_project__WEBPACK_IMPORTED_MODULE_2__.ProjectStatus.Finished);
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
            const projectItem = new _project_item__WEBPACK_IMPORTED_MODULE_1__.default(this.listEl, project);
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
    _decorators_common__WEBPACK_IMPORTED_MODULE_0__.autobind
], ProjectsList.prototype, "dragOverHandler", null);
__decorate([
    _decorators_common__WEBPACK_IMPORTED_MODULE_0__.autobind
], ProjectsList.prototype, "dropHandler", null);
__decorate([
    _decorators_common__WEBPACK_IMPORTED_MODULE_0__.autobind
], ProjectsList.prototype, "dragLeaveHandler", null);
__decorate([
    _decorators_common__WEBPACK_IMPORTED_MODULE_0__.autobind
], ProjectsList.prototype, "itemAddedHandler", null);


/***/ }),

/***/ "./src/decorators/common.ts":
/*!**********************************!*\
  !*** ./src/decorators/common.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "autobind": () => (/* binding */ autobind)
/* harmony export */ });
function autobind(_target, _methodName, descriptor) {
    const originalMethod = descriptor.value;
    return {
        configurable: true,
        get() {
            return originalMethod.bind(this);
        },
    };
}


/***/ }),

/***/ "./src/decorators/validator.ts":
/*!*************************************!*\
  !*** ./src/decorators/validator.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "requireValidation": () => (/* binding */ requireValidation),
/* harmony export */   "required": () => (/* binding */ required),
/* harmony export */   "maxLength": () => (/* binding */ maxLength)
/* harmony export */ });
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
function required(target, propName) {
    setValidator(target, propName, { required: true });
}
function maxLength(maxLength) {
    return (target, propName) => {
        setValidator(target, propName, { maxLength });
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


/***/ }),

/***/ "./src/models/project.ts":
/*!*******************************!*\
  !*** ./src/models/project.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectStatus": () => (/* binding */ ProjectStatus),
/* harmony export */   "Project": () => (/* binding */ Project)
/* harmony export */ });
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus["Active"] = "active";
    ProjectStatus["Finished"] = "finished";
})(ProjectStatus || (ProjectStatus = {}));
class Project {
    constructor(title, description, people, status) {
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
        this.id = Date.now();
    }
}


/***/ }),

/***/ "./src/state/common.ts":
/*!*****************************!*\
  !*** ./src/state/common.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ State)
/* harmony export */ });
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listener) {
        this.listeners.push(listener);
    }
}


/***/ }),

/***/ "./src/state/project.ts":
/*!******************************!*\
  !*** ./src/state/project.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PROJECT_STATE": () => (/* binding */ PROJECT_STATE)
/* harmony export */ });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common */ "./src/state/common.ts");

class ProjectState extends _common__WEBPACK_IMPORTED_MODULE_0__.default {
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
const PROJECT_STATE = ProjectState.getInstance();


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_project_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/project-input */ "./src/components/project-input.ts");
/* harmony import */ var _components_projects_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/projects-list */ "./src/components/projects-list.ts");
/* harmony import */ var _models_project__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models/project */ "./src/models/project.ts");



const projectInput = new _components_project_input__WEBPACK_IMPORTED_MODULE_0__.default();
projectInput.bind();
projectInput.render();
const activeProjectsList = new _components_projects_list__WEBPACK_IMPORTED_MODULE_1__.default(_models_project__WEBPACK_IMPORTED_MODULE_2__.ProjectStatus.Active);
activeProjectsList.bind();
activeProjectsList.render();
const finishedProjectsList = new _components_projects_list__WEBPACK_IMPORTED_MODULE_1__.default(_models_project__WEBPACK_IMPORTED_MODULE_2__.ProjectStatus.Finished);
finishedProjectsList.bind();
finishedProjectsList.render();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kcmFnbmRyb3AvLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0LWlucHV0LnRzIiwid2VicGFjazovL2RyYWduZHJvcC8uL3NyYy9jb21wb25lbnRzL3Byb2plY3QtaXRlbS50cyIsIndlYnBhY2s6Ly9kcmFnbmRyb3AvLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0cy1saXN0LnRzIiwid2VicGFjazovL2RyYWduZHJvcC8uL3NyYy9kZWNvcmF0b3JzL2NvbW1vbi50cyIsIndlYnBhY2s6Ly9kcmFnbmRyb3AvLi9zcmMvZGVjb3JhdG9ycy92YWxpZGF0b3IudHMiLCJ3ZWJwYWNrOi8vZHJhZ25kcm9wLy4vc3JjL21vZGVscy9wcm9qZWN0LnRzIiwid2VicGFjazovL2RyYWduZHJvcC8uL3NyYy9zdGF0ZS9jb21tb24udHMiLCJ3ZWJwYWNrOi8vZHJhZ25kcm9wLy4vc3JjL3N0YXRlL3Byb2plY3QudHMiLCJ3ZWJwYWNrOi8vZHJhZ25kcm9wL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2RyYWduZHJvcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZHJhZ25kcm9wL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZHJhZ25kcm9wL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZHJhZ25kcm9wLy4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJaUM7QUFDZTtBQUM0QjtBQUMzQjtBQUdqRCxJQUFxQixZQUFZLEdBQWpDLE1BQXFCLFlBQVk7SUFtQi9CO1FBYkEsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQUduQixnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUl6QixXQUFNLEdBQVcsQ0FBQyxDQUFDO1FBT2pCLElBQUksQ0FBQyxVQUFVLEdB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OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7OztBQ05zRDtBQUNBO0FBQ0w7QUFFakQsTUFBTSxZQUFZLEdBQUcsSUFBSSw4REFBWSxFQUFFLENBQUM7QUFDeEMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3BCLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUV0QixNQUFNLGtCQUFrQixHQUFHLElBQUksOERBQVksQ0FBQyxpRUFBb0IsQ0FBQyxDQUFDO0FBQ2xFLGtCQUFrQixDQUFDLElBQUksRUFBRSxDQUFDO0FBQzFCLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRTVCLE1BQU0sb0JBQW9CLEdBQUcsSUFBSSw4REFBWSxDQUFDLG1FQUFzQixDQUFDLENBQUM7QUFDdEUsb0JBQW9CLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDNUIsb0JBQW9CLENBQUMsTUFBTSxFQUFFLENBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgcmVxdWlyZVZhbGlkYXRpb24sXG4gIHJlcXVpcmVkLFxuICBtYXhMZW5ndGgsXG59IGZyb20gXCIuLi9kZWNvcmF0b3JzL3ZhbGlkYXRvclwiO1xuaW1wb3J0IHsgYXV0b2JpbmQgfSBmcm9tIFwiLi4vZGVjb3JhdG9ycy9jb21tb25cIjtcbmltcG9ydCB7IFByb2plY3QsIFByb2plY3RNZXRhZGF0YSwgUHJvamVjdFN0YXR1cyB9IGZyb20gXCIuLi9tb2RlbHMvcHJvamVjdFwiO1xuaW1wb3J0IHsgUFJPSkVDVF9TVEFURSB9IGZyb20gXCIuLi9zdGF0ZS9wcm9qZWN0XCI7XG5cbkByZXF1aXJlVmFsaWRhdGlvblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdElucHV0IHtcbiAgdGVtcGxhdGVFbDogSFRNTFRlbXBsYXRlRWxlbWVudDtcbiAgaG9zdEVsOiBIVE1MRGl2RWxlbWVudDtcbiAgZm9ybUVsOiBIVE1MRm9ybUVsZW1lbnQ7XG5cbiAgQHJlcXVpcmVkXG4gIHRpdGxlOiBzdHJpbmcgPSBcIlwiO1xuXG4gIEByZXF1aXJlZFxuICBkZXNjcmlwdGlvbjogc3RyaW5nID0gXCJcIjtcblxuICBAbWF4TGVuZ3RoKDEwKVxuICBAcmVxdWlyZWRcbiAgcGVvcGxlOiBudW1iZXIgPSAwO1xuXG4gIHRpdGxlRWw6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gIGRlc2NyaXB0aW9uRWw6IEhUTUxUZXh0QXJlYUVsZW1lbnQ7XG4gIHBlb3BsZUVsOiBIVE1MSW5wdXRFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudGVtcGxhdGVFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgXCJwcm9qZWN0LWlucHV0XCJcbiAgICApISBhcyBIVE1MVGVtcGxhdGVFbGVtZW50O1xuICAgIHRoaXMuaG9zdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhcHBcIikhIGFzIEhUTUxEaXZFbGVtZW50O1xuICAgIHRoaXMuZm9ybUVsID0gZG9jdW1lbnQuaW1wb3J0Tm9kZSh0aGlzLnRlbXBsYXRlRWwuY29udGVudCwgdHJ1ZSlcbiAgICAgIC5maXJzdEVsZW1lbnRDaGlsZCEgYXMgSFRNTEZvcm1FbGVtZW50O1xuICAgIHRoaXMuZm9ybUVsLmlkID0gXCJ1c2VyLWlucHV0XCI7XG4gICAgdGhpcy50aXRsZUVsID0gdGhpcy5mb3JtRWwucXVlcnlTZWxlY3RvcihcIiN0aXRsZVwiKSEgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICB0aGlzLmRlc2NyaXB0aW9uRWwgPSB0aGlzLmZvcm1FbC5xdWVyeVNlbGVjdG9yKFxuICAgICAgXCIjZGVzY3JpcHRpb25cIlxuICAgICkhIGFzIEhUTUxUZXh0QXJlYUVsZW1lbnQ7XG4gICAgdGhpcy5wZW9wbGVFbCA9IHRoaXMuZm9ybUVsLnF1ZXJ5U2VsZWN0b3IoXCIjcGVvcGxlXCIpISBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICB9XG5cbiAgYmluZCgpIHtcbiAgICB0aGlzLmZvcm1FbC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHRoaXMuc3VibWl0Rm9ybSk7XG4gIH1cblxuICB2YWxpZGF0ZShfaW5wdXREYXRhOiBQcm9qZWN0TWV0YWRhdGEpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIEBhdXRvYmluZFxuICBzdWJtaXRGb3JtKGU6IEV2ZW50KSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgY29uc3QgaW5wdXREYXRhID0gdGhpcy5nYXRoZXJJbnB1dHMoKTtcbiAgICBpZiAodGhpcy52YWxpZGF0ZShpbnB1dERhdGEpKSB7XG4gICAgICBjb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QoXG4gICAgICAgIGlucHV0RGF0YS50aXRsZSxcbiAgICAgICAgaW5wdXREYXRhLmRlc2NyaXB0aW9uLFxuICAgICAgICBpbnB1dERhdGEucGVvcGxlLFxuICAgICAgICBQcm9qZWN0U3RhdHVzLkFjdGl2ZVxuICAgICAgKTtcbiAgICAgIFBST0pFQ1RfU1RBVEUuYWRkUHJvamVjdChuZXdQcm9qZWN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWxlcnQoXCJFcnJvciB2YWxpZGF0aW9uXCIpO1xuICAgIH1cbiAgfVxuXG4gIGdhdGhlcklucHV0cygpOiBQcm9qZWN0TWV0YWRhdGEge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogdGhpcy50aXRsZUVsLnZhbHVlLFxuICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb25FbC52YWx1ZSxcbiAgICAgIHBlb3BsZTogK3RoaXMucGVvcGxlRWwudmFsdWUsXG4gICAgfTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB0aGlzLmhvc3RFbC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmJlZ2luXCIsIHRoaXMuZm9ybUVsKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRHJhZ2dhYmxlIH0gZnJvbSBcIi4uL21vZGVscy9kcmFnLWRyb3BcIjtcbmltcG9ydCB7IGF1dG9iaW5kIH0gZnJvbSBcIi4uL2RlY29yYXRvcnMvY29tbW9uXCI7XG5pbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSBcIi4uL21vZGVscy9wcm9qZWN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3RJdGVtIGltcGxlbWVudHMgRHJhZ2dhYmxlIHtcbiAgZWxlbWVudEVsOiBIVE1MTElFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwYXJlbnRFbDogSFRNTFVMaXN0RWxlbWVudCwgcHVibGljIHByb2plY3Q6IFByb2plY3QpIHtcbiAgICBjb25zdCB0ZW1wbGF0ZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICBcInNpbmdsZS1wcm9qZWN0XCJcbiAgICApISBhcyBIVE1MVGVtcGxhdGVFbGVtZW50O1xuICAgIHRoaXMuZWxlbWVudEVsID0gZG9jdW1lbnQuaW1wb3J0Tm9kZSh0ZW1wbGF0ZUVsLmNvbnRlbnQsIHRydWUpXG4gICAgICAuZmlyc3RFbGVtZW50Q2hpbGQhIGFzIEhUTUxMSUVsZW1lbnQ7XG4gIH1cblxuICBiaW5kKCkge1xuICAgIHRoaXMuZWxlbWVudEVsLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnc3RhcnRcIiwgdGhpcy5kcmFnU3RhcnRIYW5kbGVyKTtcbiAgICB0aGlzLmVsZW1lbnRFbC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VuZFwiLCB0aGlzLmRyYWdFbmRIYW5kbGVyKTtcbiAgfVxuXG4gIEBhdXRvYmluZFxuICBkcmFnU3RhcnRIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgICBldmVudC5kYXRhVHJhbnNmZXIhLnNldERhdGEoXCJ0ZXh0L3BsYWluXCIsIHRoaXMucHJvamVjdC5pZC50b1N0cmluZygpKTtcbiAgICBldmVudC5kYXRhVHJhbnNmZXIhLmVmZmVjdEFsbG93ZWQgPSBcIm1vdmVcIjtcbiAgfVxuXG4gIEBhdXRvYmluZFxuICBkcmFnRW5kSGFuZGxlcihfOiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZyhcIlByb2plY3QgaXRlbSAtIGRyYWcgZW5kXCIpO1xuICB9XG5cbiAgZ2V0IHBlcnNvbnMoKSB7XG4gICAgY29uc3QgcGx1cmFsID0gdGhpcy5wcm9qZWN0LnBlb3BsZSA+IDEgPyBcInNcIiA6IFwiXCI7XG5cbiAgICByZXR1cm4gYCR7dGhpcy5wcm9qZWN0LnBlb3BsZX0gcGVyc29uJHtwbHVyYWx9YDtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB0aGlzLmVsZW1lbnRFbC5pZCA9IGBwcm9qZWN0LSR7dGhpcy5wcm9qZWN0LmlkfWA7XG4gICAgdGhpcy5lbGVtZW50RWwucXVlcnlTZWxlY3RvcihcImgyXCIpIS50ZXh0Q29udGVudCA9IHRoaXMucHJvamVjdC50aXRsZTtcbiAgICB0aGlzLmVsZW1lbnRFbC5xdWVyeVNlbGVjdG9yKFxuICAgICAgXCJoM1wiXG4gICAgKSEudGV4dENvbnRlbnQgPSBgJHt0aGlzLnBlcnNvbnN9IGFzc2lnbmVkYDtcbiAgICB0aGlzLmVsZW1lbnRFbC5xdWVyeVNlbGVjdG9yKFwicFwiKSEudGV4dENvbnRlbnQgPSB0aGlzLnByb2plY3QuZGVzY3JpcHRpb247XG5cbiAgICB0aGlzLnBhcmVudEVsLmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudEVsKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRHJhZ1RhcmdldCB9IGZyb20gXCIuLi9tb2RlbHMvZHJhZy1kcm9wXCI7XG5pbXBvcnQgeyBhdXRvYmluZCB9IGZyb20gXCIuLi9kZWNvcmF0b3JzL2NvbW1vblwiO1xuaW1wb3J0IFByb2plY3RJdGVtIGZyb20gXCIuL3Byb2plY3QtaXRlbVwiO1xuaW1wb3J0IHsgUHJvamVjdCwgUHJvamVjdFN0YXR1cyB9IGZyb20gXCIuLi9tb2RlbHMvcHJvamVjdFwiO1xuaW1wb3J0IHsgUFJPSkVDVF9TVEFURSB9IGZyb20gXCIuLi9zdGF0ZS9wcm9qZWN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3RzTGlzdCBpbXBsZW1lbnRzIERyYWdUYXJnZXQge1xuICB0ZW1wbGF0ZUVsOiBIVE1MVGVtcGxhdGVFbGVtZW50O1xuICBob3N0RWw6IEhUTUxEaXZFbGVtZW50O1xuICBsaXN0Q29udGFpbmVyRWw6IEhUTUxFbGVtZW50O1xuICBsaXN0RWw6IEhUTUxVTGlzdEVsZW1lbnQ7XG4gIHJlbGV2YW50UHJvamVjdHM6IFByb2plY3RbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHlwZTogXCJhY3RpdmVcIiB8IFwiZmluaXNoZWRcIikge1xuICAgIHRoaXMudGVtcGxhdGVFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgXCJwcm9qZWN0LWxpc3RcIlxuICAgICkhIGFzIEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG4gICAgdGhpcy5ob3N0RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFwcFwiKSEgYXMgSFRNTERpdkVsZW1lbnQ7XG4gICAgdGhpcy5saXN0Q29udGFpbmVyRWwgPSBkb2N1bWVudC5pbXBvcnROb2RlKHRoaXMudGVtcGxhdGVFbC5jb250ZW50LCB0cnVlKVxuICAgICAgLmZpcnN0RWxlbWVudENoaWxkISBhcyBIVE1MRWxlbWVudDtcbiAgICB0aGlzLmxpc3RDb250YWluZXJFbC5pZCA9IGAke3RoaXMudHlwZX0tcHJvamVjdHNgO1xuICAgIHRoaXMubGlzdEVsID0gdGhpcy5saXN0Q29udGFpbmVyRWwucXVlcnlTZWxlY3RvcihcInVsXCIpISBhcyBIVE1MVUxpc3RFbGVtZW50O1xuICAgIHRoaXMubGlzdEVsLmlkID0gYCR7dGhpcy50eXBlfS1wcm9qZWN0cy1saXN0YDtcbiAgfVxuXG4gIGJpbmQoKSB7XG4gICAgdGhpcy5saXN0RWwuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIHRoaXMuZHJhZ092ZXJIYW5kbGVyKTtcbiAgICB0aGlzLmxpc3RFbC5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCB0aGlzLmRyb3BIYW5kbGVyKTtcbiAgICB0aGlzLmxpc3RFbC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2xlYXZlXCIsIHRoaXMuZHJhZ0xlYXZlSGFuZGxlcik7XG5cbiAgICBQUk9KRUNUX1NUQVRFLmFkZExpc3RlbmVyKHRoaXMuaXRlbUFkZGVkSGFuZGxlcik7XG4gIH1cblxuICBAYXV0b2JpbmRcbiAgZHJhZ092ZXJIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpIHtcbiAgICBpZiAoZXZlbnQuZGF0YVRyYW5zZmVyICYmIGV2ZW50LmRhdGFUcmFuc2Zlci50eXBlc1swXSA9PT0gXCJ0ZXh0L3BsYWluXCIpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLmxpc3RFbC5jbGFzc0xpc3QuYWRkKFwiZHJvcHBhYmxlXCIpO1xuICAgIH1cbiAgfVxuXG4gIEBhdXRvYmluZFxuICBkcm9wSGFuZGxlcihldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgY29uc3QgcHJvamVjdElkID0gZXZlbnQuZGF0YVRyYW5zZmVyIS5nZXREYXRhKFwidGV4dC9wbGFpblwiKTtcbiAgICBQUk9KRUNUX1NUQVRFLm1vdmVQcm9qZWN0KFxuICAgICAgcHJvamVjdElkLFxuICAgICAgdGhpcy50eXBlID09PSBcImFjdGl2ZVwiID8gUHJvamVjdFN0YXR1cy5BY3RpdmUgOiBQcm9qZWN0U3RhdHVzLkZpbmlzaGVkXG4gICAgKTtcbiAgfVxuXG4gIEBhdXRvYmluZFxuICBkcmFnTGVhdmVIYW5kbGVyKF86IERyYWdFdmVudCkge1xuICAgIHRoaXMubGlzdEVsLmNsYXNzTGlzdC5yZW1vdmUoXCJkcm9wcGFibGVcIik7XG4gIH1cblxuICBAYXV0b2JpbmRcbiAgaXRlbUFkZGVkSGFuZGxlcihwcm9qZWN0czogUHJvamVjdFtdKSB7XG4gICAgdGhpcy5yZWxldmFudFByb2plY3RzID0gcHJvamVjdHMuZmlsdGVyKFxuICAgICAgKHByb2plY3QpID0+IHByb2plY3Quc3RhdHVzID09PSB0aGlzLnR5cGVcbiAgICApO1xuICAgIHRoaXMucmVuZGVyTGlzdCgpO1xuICB9XG5cbiAgcmVuZGVyTGlzdCgpIHtcbiAgICB0aGlzLmxpc3RFbC5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgdGhpcy5yZWxldmFudFByb2plY3RzLmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICAgIGNvbnN0IHByb2plY3RJdGVtID0gbmV3IFByb2plY3RJdGVtKHRoaXMubGlzdEVsLCBwcm9qZWN0KTtcbiAgICAgIHByb2plY3RJdGVtLmJpbmQoKTtcbiAgICAgIHByb2plY3RJdGVtLnJlbmRlcigpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHRpdGxlRWwgPSB0aGlzLmxpc3RDb250YWluZXJFbC5xdWVyeVNlbGVjdG9yKFwiaDJcIikhO1xuICAgIHRpdGxlRWwudGV4dENvbnRlbnQgPSBgJHt0aGlzLnR5cGUudG9VcHBlckNhc2UoKX0gUFJPSkVDVFNgO1xuXG4gICAgdGhpcy5ob3N0RWwuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIHRoaXMubGlzdENvbnRhaW5lckVsKTtcbiAgfVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGF1dG9iaW5kKFxuICBfdGFyZ2V0OiBhbnksXG4gIF9tZXRob2ROYW1lOiBzdHJpbmcsXG4gIGRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvclxuKSB7XG4gIGNvbnN0IG9yaWdpbmFsTWV0aG9kID0gZGVzY3JpcHRvci52YWx1ZTtcblxuICByZXR1cm4ge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQoKSB7XG4gICAgICByZXR1cm4gb3JpZ2luYWxNZXRob2QuYmluZCh0aGlzKTtcbiAgICB9LFxuICB9IGFzIFByb3BlcnR5RGVzY3JpcHRvcjtcbn1cbiIsImltcG9ydCB7IENvbW1vbkNvbnN0cnVjdG9yIH0gZnJvbSBcIi4uL21vZGVscy9jb21tb25cIjtcbmltcG9ydCB7IFByb2plY3RNZXRhZGF0YSB9IGZyb20gXCIuLi9tb2RlbHMvcHJvamVjdFwiO1xuaW1wb3J0IHsgVmFsaWRhdG9yUHJvcHMsIFZhbGlkYXRvcnMgfSBmcm9tIFwiLi4vbW9kZWxzL3ZhbGlkYXRvclwiO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVxdWlyZVZhbGlkYXRpb248VCBleHRlbmRzIENvbW1vbkNvbnN0cnVjdG9yPihcbiAgT3JpZ2luYWxDb25zdHJ1Y3RvcjogVFxuKSB7XG4gIHJldHVybiBjbGFzcyBleHRlbmRzIE9yaWdpbmFsQ29uc3RydWN0b3Ige1xuICAgIHZhbGlkYXRvcnM6IHVua25vd247XG5cbiAgICB2YWxpZGF0ZShpbnB1dERhdGE6IFByb2plY3RNZXRhZGF0YSkge1xuICAgICAgY29uc3QgdmFsaWRhdG9ycyA9IHRoaXMudmFsaWRhdG9ycyBhcyBWYWxpZGF0b3JzO1xuICAgICAgbGV0IGlzVmFsaWQgPSB0cnVlO1xuXG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBpbnB1dERhdGEpIHtcbiAgICAgICAgaXNWYWxpZCA9IGlzVmFsaWQgJiYgY2hlY2tSZXF1aXJlZChpbnB1dERhdGFba2V5XSwgdmFsaWRhdG9yc1trZXldKTtcbiAgICAgICAgaXNWYWxpZCA9IGlzVmFsaWQgJiYgY2hlY2tNYXhMZW5ndGgoaW5wdXREYXRhW2tleV0sIHZhbGlkYXRvcnNba2V5XSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBpc1ZhbGlkO1xuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlcXVpcmVkKHRhcmdldDogYW55LCBwcm9wTmFtZTogc3RyaW5nKSB7XG4gIHNldFZhbGlkYXRvcih0YXJnZXQsIHByb3BOYW1lLCB7IHJlcXVpcmVkOiB0cnVlIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWF4TGVuZ3RoKG1heExlbmd0aDogbnVtYmVyKSB7XG4gIHJldHVybiAodGFyZ2V0OiBhbnksIHByb3BOYW1lOiBzdHJpbmcpID0+IHtcbiAgICBzZXRWYWxpZGF0b3IodGFyZ2V0LCBwcm9wTmFtZSwgeyBtYXhMZW5ndGggfSk7XG4gIH07XG59XG5cbi8vIEZ1bmN0aW9uc1xuZnVuY3Rpb24gY2hlY2tSZXF1aXJlZChwcm9wVmFsdWU6IGFueSwgdmFsaWRhdG9yOiBQYXJ0aWFsPFZhbGlkYXRvclByb3BzPikge1xuICBsZXQgaXNWYWxpZCA9IHRydWU7XG5cbiAgaWYgKHZhbGlkYXRvci5yZXF1aXJlZCkge1xuICAgIGlzVmFsaWQgPSBpc1ZhbGlkICYmIHByb3BWYWx1ZSAhPT0gXCJcIjtcbiAgfVxuXG4gIHJldHVybiBpc1ZhbGlkO1xufVxuXG5mdW5jdGlvbiBjaGVja01heExlbmd0aChwcm9wVmFsdWU6IGFueSwgdmFsaWRhdG9yOiBQYXJ0aWFsPFZhbGlkYXRvclByb3BzPikge1xuICBsZXQgaXNWYWxpZCA9IHRydWU7XG5cbiAgaWYgKHZhbGlkYXRvci5tYXhMZW5ndGgpIHtcbiAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiBwcm9wVmFsdWUgPD0gdmFsaWRhdG9yLm1heExlbmd0aDtcbiAgfVxuXG4gIHJldHVybiBpc1ZhbGlkO1xufVxuXG5jb25zdCBzZXRWYWxpZGF0b3IgPSAoXG4gIHRhcmdldDogYW55LFxuICBwcm9wTmFtZTogc3RyaW5nLFxuICB2YWx1ZTogeyBbVDogc3RyaW5nXTogYW55IH1cbikgPT4ge1xuICBpZiAoIXRhcmdldC52YWxpZGF0b3JzKSB7XG4gICAgdGFyZ2V0LnZhbGlkYXRvcnMgPSB7fTtcbiAgfVxuXG4gIHJldHVybiAodGFyZ2V0LnZhbGlkYXRvcnNbcHJvcE5hbWVdID0ge1xuICAgIC4uLnRhcmdldC52YWxpZGF0b3JzW3Byb3BOYW1lXSxcbiAgICAuLi52YWx1ZSxcbiAgfSk7XG59O1xuIiwiZXhwb3J0IGVudW0gUHJvamVjdFN0YXR1cyB7XG4gIEFjdGl2ZSA9IFwiYWN0aXZlXCIsXG4gIEZpbmlzaGVkID0gXCJmaW5pc2hlZFwiLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFByb2plY3RNZXRhZGF0YSB7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIHBlb3BsZTogbnVtYmVyO1xuICBbVDogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgY2xhc3MgUHJvamVjdCB7XG4gIGlkOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmcsXG4gICAgcHVibGljIGRlc2NyaXB0aW9uOiBzdHJpbmcsXG4gICAgcHVibGljIHBlb3BsZTogbnVtYmVyLFxuICAgIHB1YmxpYyBzdGF0dXM6IFByb2plY3RTdGF0dXNcbiAgKSB7XG4gICAgdGhpcy5pZCA9IERhdGUubm93KCk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXRlPFQ+IHtcbiAgcHJvdGVjdGVkIGxpc3RlbmVyczogKChwcm9qZWN0OiBUKSA9PiB2b2lkKVtdID0gW107XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIGFkZExpc3RlbmVyKGxpc3RlbmVyOiAocHJvamVjdHM6IFQpID0+IHZvaWQpIHtcbiAgICB0aGlzLmxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgfVxufVxuIiwiaW1wb3J0IFN0YXRlIGZyb20gXCIuL2NvbW1vblwiO1xuaW1wb3J0IHsgUHJvamVjdCwgUHJvamVjdFN0YXR1cyB9IGZyb20gXCIuLi9tb2RlbHMvcHJvamVjdFwiO1xuXG5jbGFzcyBQcm9qZWN0U3RhdGUgZXh0ZW5kcyBTdGF0ZTxQcm9qZWN0W10+IHtcbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IFByb2plY3RTdGF0ZTtcbiAgcHJpdmF0ZSBwcm9qZWN0czogUHJvamVjdFtdID0gW107XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgc3RhdGljIGdldEluc3RhbmNlKCkge1xuICAgIGlmICghdGhpcy5pbnN0YW5jZSkge1xuICAgICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBQcm9qZWN0U3RhdGUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgfVxuXG4gIGFkZFByb2plY3QocHJvamVjdDogUHJvamVjdCkge1xuICAgIHRoaXMucHJvamVjdHMucHVzaChwcm9qZWN0KTtcbiAgICB0aGlzLnVwZGF0ZUxpc3RlbmVycygpO1xuICB9XG5cbiAgbW92ZVByb2plY3QocHJvamVjdElkOiBzdHJpbmcsIG5ld1N0YXR1czogUHJvamVjdFN0YXR1cykge1xuICAgIGNvbnN0IHByb2plY3QgPSB0aGlzLnByb2plY3RzLmZpbmQoXG4gICAgICAocHJqKSA9PiBwcmouaWQudG9TdHJpbmcoKSA9PT0gcHJvamVjdElkXG4gICAgKTtcblxuICAgIGlmIChwcm9qZWN0ICYmIHByb2plY3Quc3RhdHVzICE9PSBuZXdTdGF0dXMpIHtcbiAgICAgIHByb2plY3Quc3RhdHVzID0gbmV3U3RhdHVzO1xuICAgICAgdGhpcy51cGRhdGVMaXN0ZW5lcnMoKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5saXN0ZW5lcnMuZm9yRWFjaCgobGlzdGVuZXIpID0+IHtcbiAgICAgIGxpc3RlbmVyKHRoaXMucHJvamVjdHMuc2xpY2UoKSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IFBST0pFQ1RfU1RBVEUgPSBQcm9qZWN0U3RhdGUuZ2V0SW5zdGFuY2UoKTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFByb2plY3RJbnB1dCBmcm9tIFwiLi9jb21wb25lbnRzL3Byb2plY3QtaW5wdXRcIjtcbmltcG9ydCBQcm9qZWN0c0xpc3QgZnJvbSBcIi4vY29tcG9uZW50cy9wcm9qZWN0cy1saXN0XCI7XG5pbXBvcnQgeyBQcm9qZWN0U3RhdHVzIH0gZnJvbSBcIi4vbW9kZWxzL3Byb2plY3RcIjtcblxuY29uc3QgcHJvamVjdElucHV0ID0gbmV3IFByb2plY3RJbnB1dCgpO1xucHJvamVjdElucHV0LmJpbmQoKTtcbnByb2plY3RJbnB1dC5yZW5kZXIoKTtcblxuY29uc3QgYWN0aXZlUHJvamVjdHNMaXN0ID0gbmV3IFByb2plY3RzTGlzdChQcm9qZWN0U3RhdHVzLkFjdGl2ZSk7XG5hY3RpdmVQcm9qZWN0c0xpc3QuYmluZCgpO1xuYWN0aXZlUHJvamVjdHNMaXN0LnJlbmRlcigpO1xuXG5jb25zdCBmaW5pc2hlZFByb2plY3RzTGlzdCA9IG5ldyBQcm9qZWN0c0xpc3QoUHJvamVjdFN0YXR1cy5GaW5pc2hlZCk7XG5maW5pc2hlZFByb2plY3RzTGlzdC5iaW5kKCk7XG5maW5pc2hlZFByb2plY3RzTGlzdC5yZW5kZXIoKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=