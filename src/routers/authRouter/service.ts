import UserSQLHandler from "$db/sql/user/handler";
import UserDocumentHandler from "$db/document/user/handler";
import { UserGraphHandler } from "$db/graph/user/handler";
import { TSafeUser } from "$db/sql/user/types";
import { TLoginUser, TSignUpUser } from "./types";
import { makeNeo4jDriver } from "$db/graph/neo4j";


interface IUserService {
  create: (newUser: TSignUpUser) => Promise<TSafeUser>;
  findByUserCredentials: (
    user: TLoginUser
  ) => Promise<TSafeUser | undefined | null>;
}

function createSQLService(dbURL: string): IUserService {
  const userSQLHandler = new UserSQLHandler(dbURL);

  return {
    create: (newUser) => {
      return userSQLHandler.create(newUser);
    },
    findByUserCredentials: (user) => {
      return userSQLHandler.findByUserCredentials(user.username, user.password);
    },
  };
}

function createDocumentService(dbURL: string): IUserService {
  const userDocumentHandlder = new UserDocumentHandler(dbURL);

  return {
    create: async (newUser) => {
      const user = await userDocumentHandlder.create(newUser);

      return {
        id: user.id,
        username: user.username,
      };
    },
    findByUserCredentials: async (user) => {
      const foundUser = await userDocumentHandlder.findByCredentials(
        user.username,
        user.password
      );
      if (!foundUser) {
        return null;
      }

      return {
        id: foundUser.id,
        username: foundUser.username,
      };
    },
  };
}

function createGraphService(): IUserService {
  const driver = makeNeo4jDriver();
  const userGraphHandler = new UserGraphHandler(driver);

  return {
    create: async (newUser) => {
      // Store user in graph (handler returns safe user)
      const created = await userGraphHandler.createUser({
        username: newUser.username,
        password: newUser.password,
      });

      return {
        id: created.id,
        username: created.username,
      };
    },

    findByUserCredentials: async (user) => {
      // Fetch user + password hash/string for credential checking
      const found = await userGraphHandler.getUserAuthByUsername(user.username);
      if (!found) return null;

      if (found.password !== user.password) return null;

      return {
        id: found.id,
        username: found.username,
      };
    },
  };
}

export {
  IUserService,
  createSQLService,
  createDocumentService,
  createGraphService,
};
