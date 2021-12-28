import { Entity, PrimaryKey, Property, ManyToMany, Collection } from "@mikro-orm/core";
import { ProjectTag } from './projectTag';

@Entity()
export class Project {
  @PrimaryKey()
  id!: number;

  @Property({ default: '' })
  name!: string;

  @Property({ default: '' })
  objective!: string;

  @Property({ default: '' })
  background!: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @ManyToMany(() => ProjectTag, 'projects', { owner: true })
  tags = new Collection<ProjectTag>(this);
}