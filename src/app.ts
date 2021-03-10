/// <reference path="components/project-input.ts"  />
/// <reference path="components/project-item.ts"  />
/// <reference path="components/projects-list.ts"  />

namespace App {
  const projectInput = new ProjectInput();
  projectInput.bind();
  projectInput.render();

  const activeProjectsList = new ProjectsList("active");
  activeProjectsList.bind();
  activeProjectsList.render();

  const finishedProjectsList = new ProjectsList("finished");
  finishedProjectsList.bind();
  finishedProjectsList.render();
}
