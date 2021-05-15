import { Connection, ConnectionOptions, createConnection } from "typeorm";

const connectionOptions: ConnectionOptions = {
  name: "default",
  type: "postgres",
  synchronize: true,
  logging: true,
  dropSchema: true,  // TODO: dev only
  username: "postgres",
  password: "admin",
  host: "database",
  database: "yostock",
  migrations: [
    `${__dirname}/migration/**.all{.ts,.js}`,
    `${__dirname}/migration/**.demo{.ts,.js}`, // TODO: dev only
  ],
  entities: [
    `${__dirname}/entity/**{.ts,.js}`,
  ],
};

export const connection = async (): Promise<Connection> => {
  const connection = await createConnection(connectionOptions);
  await connection.runMigrations();

  return connection;
};
