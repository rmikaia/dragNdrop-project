/// <reference path="./common.ts"  />
/// <reference path="../models/project.ts"  />
/// <reference path="../state/common.ts"  />

namespace App {
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

  export const projectState = ProjectState.getInstance();
}
