import type { Driver } from "neo4j-driver";
import type { CreateUserInput, CreateUserPayload, UserDTO } from "./types";
import { UserGraphHandler } from "./handler";

export function makeUserResolvers(driver: Driver) {
  const handler = new UserGraphHandler(driver);

  return {
    Query: {
      // Fetch a user by id (safe fields only)
      user: async (
        _parent: unknown,
        args: { id: string }
      ): Promise<UserDTO | null> => {
        return handler.getUserById(args.id);
      },

      // Fetch a user by username (safe fields only)
      userByUsername: async (
        _parent: unknown,
        args: { username: string }
      ): Promise<UserDTO | null> => {
        return handler.getUserByUsername(args.username);
      },
    },

    Mutation: {
      // Create a new user (username must be unique). Returns safe user.
      createUser: async (
        _parent: unknown,
        args: { input: CreateUserInput }
      ): Promise<CreateUserPayload> => {
        const user = await handler.createUser(args.input);
        return { user };
      },

      // Delete user by id (and cascade-delete owned cities)
      deleteUser: async (
        _parent: unknown,
        args: { id: string }
      ): Promise<string> => {
        return handler.deleteUser(args.id);
      },
    },
  };
}
