import State from "./common.js";
class ProjectState extends State {
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
export const PROJECT_STATE = ProjectState.getInstance();
//# sourceMappingURL=project.js.map