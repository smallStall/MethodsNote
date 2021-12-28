import { Collection, Entity, ManyToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Project } from "./project"

@Entity()
export class ProjectTag {
  @PrimaryKey()
  id!: number;

  @Property({ default: '' })
  name!: string;

  @Property({ default: '' })
  detail!: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @ManyToMany(() => Project, project => project.tags)
  projects = new Collection<Project>(this);
}