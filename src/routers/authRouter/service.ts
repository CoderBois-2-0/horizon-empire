import UserSQLHandler from "$db/sql/user/handler";
import UserDocumentHandler from "$db/document/user/handler";
import { TSafeUser } from "$db/sql/user/types";
import { TLoginUser, TSignUpUser } from "./types";

interface IUserService {
  create: (newUser: TSignUpUser) => Promise<TSafeUser>;
  findByUserCredentials: (
    user: TLoginUser,
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

function createDocumentService(): IUserService {
  const userDocumentHandlder = new UserDocumentHandler();

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
        user.password,
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

export { IUserService, createSQLService, createDocumentService };
