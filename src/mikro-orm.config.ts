
import { Options } from "@mikro-orm/core";
import { SqliteDriver } from "@mikro-orm/sqlite";
import { ReflectMetadataProvider } from "@mikro-orm/core";
import { Project } from './infra/entity/project';
import { ProjectTag } from './infra/entity/projectTag';

const options: Options<SqliteDriver> = {
  driver: SqliteDriver,
  entities: [Project, ProjectTag],
  discovery: { disableDynamicFileAccess: true },
  metadataProvider: ReflectMetadataProvider,
  dbName: './assets/nohoho.db',
  type: 'sqlite',
};

export default options;