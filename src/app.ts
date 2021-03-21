import ProjectInput from "./components/project-input";
import ProjectsList from "./components/projects-list";
import View from "./components/view";
import { ProjectStatus } from "./models/project";

const Views: View[] = [
  new ProjectInput(),
  new ProjectsList(ProjectStatus.Active),
  new ProjectsList(ProjectStatus.Finished),
];

Views.forEach((view) => {
  view.bind();
  view.render();
});
