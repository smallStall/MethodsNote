
import { Options } from "@mikro-orm/core";
import { SqliteDriver } from "@mikro-orm/sqlite";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";

const options: Options<SqliteDriver> = {
  driver: SqliteDriver,
  metadataProvider: TsMorphMetadataProvider,
  //entities: ["./src/entities/*.js"],
  entitiesTs: ["./src/entities/*.ts"],
  dbName: 'mydb',
};

export default options;