
import { Options } from "@mikro-orm/core";
import { SqliteDriver } from "@mikro-orm/sqlite";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";

const options: Options<SqliteDriver> = {
  driver: SqliteDriver,
  metadataProvider: TsMorphMetadataProvider,
  entities: ["dist/infra/entities/*.js"],
  entitiesTs: ["src/infra/entities/*.ts"],
  dbName: './assets/nohoho.db',
  type: 'sqlite',
};

export default options;