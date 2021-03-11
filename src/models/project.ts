export enum ProjectStatus {
  Active = "active",
  Finished = "finished",
}

export interface ProjectMetadata {
  title: string;
  description: string;
  people: number;
  [T: string]: any;
}

export class Project {
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
