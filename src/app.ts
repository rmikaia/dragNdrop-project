// Drag & drop interfaces
interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}

// Types
enum ProjectStatus {
  Active = "active",
  Finished = "finished",
}

interface ProjectMetadata {
  title: string;
  description: string;
  people: number;
  [T: string]: any;
}

type ValidatorProps = {
  required: boolean;
  maxLength: number;
};

type Validators = {
  [T: string]: Partial<ValidatorProps>;
};

type CommonConstructor = { new (...arg: any[]): {} };

// Decorators
function autobind(
  _target: any,
  _methodName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  return {
    configurable: true,
    get() {
      return originalMethod.bind(this);
    },
  } as PropertyDescriptor;
}

function requireValidation<T extends CommonConstructor>(
  OriginalConstructor: T
) {
  return class extends OriginalConstructor {
    validators: unknown;

    validate(inputData: ProjectMetadata) {
      const validators = this.validators as Validators;
      let isValid = true;

      for (const key in inputData) {
        isValid = isValid && checkRequired(inputData[key], validators[key]);
        isValid = isValid && checkMaxLength(inputData[key], validators[key]);
      }

      return isValid;
    }
  };
}

function required(target: any, propName: string) {
  setValidator(target, propName, { required: true });
}

function maxLength(maxLength: number) {
  return (target: any, propName: string) => {
    setValidator(target, propName, { maxLength });
  };
}

// Functions
function checkRequired(propValue: any, validator: Partial<ValidatorProps>) {
  let isValid = true;

  if (validator.required) {
    isValid = isValid && propValue !== "";
  }

  return isValid;
}

function checkMaxLength(propValue: any, validator: Partial<ValidatorProps>) {
  let isValid = true;

  if (validator.maxLength) {
    isValid = isValid && propValue <= validator.maxLength;
  }

  return isValid;
}

const setValidator = (
  target: any,
  propName: string,
  value: { [T: string]: any }
) => {
  if (!target.validators) {
    target.validators = {};
  }

  return (target.validators[propName] = {
    ...target.validators[propName],
    ...value,
  });
};

class Project {
  id: number;

  constructor(
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {
    this.id = Date.now();
  }
}

class State<T> {
  protected listeners: ((project: T) => void)[] = [];

  constructor() {}

  addListener(listener: (projects: T) => void) {
    this.listeners.push(listener);
  }
}

class ProjectState extends State<Project[]> {
  private static instance: ProjectState;
  private projects: Project[] = [];

  private constructor() {
    super();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ProjectState();
    }

    return this.instance;
  }

  addProject(project: Project) {
    this.projects.push(project);
    this.updateListeners();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find(
      (prj) => prj.id.toString() === projectId
    );

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

const projectState = ProjectState.getInstance();

@requireValidation
class ProjectInput {
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

class ProjectItem implements Draggable {
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

class ProjectsList implements DragTarget {
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

const projectInput = new ProjectInput();
projectInput.bind();
projectInput.render();

const activeProjectsList = new ProjectsList("active");
activeProjectsList.bind();
activeProjectsList.render();

const finishedProjectsList = new ProjectsList("finished");
finishedProjectsList.bind();
finishedProjectsList.render();
