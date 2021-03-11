import ProjectInput from "./components/project-input.js";
import ProjectsList from "./components/projects-list.js";
import { ProjectStatus } from "./models/project.js";

const projectInput = new ProjectInput();
projectInput.bind();
projectInput.render();

const activeProjectsList = new ProjectsList(ProjectStatus.Active);
activeProjectsList.bind();
activeProjectsList.render();

const finishedProjectsList = new ProjectsList(ProjectStatus.Finished);
finishedProjectsList.bind();
finishedProjectsList.render();
