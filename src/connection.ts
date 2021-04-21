import { Connection, createConnection } from "typeorm";

export const connection = async (): Promise<Connection> => {
  const connection = await createConnection();
  await connection.runMigrations();

  return connection;
};
