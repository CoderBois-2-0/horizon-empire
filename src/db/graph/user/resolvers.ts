import type { Driver } from "neo4j-driver";
import { USER_CYPHER } from "./cypher";
import type { CreateUserInput, CreateUserPayload, UserDTO } from "./types";

type ResolverContext = {
  driver: Driver;
};

export function makeUserResolvers(driver: Driver) {
  const ctx: ResolverContext = { driver };

  return {
    Query: {
      // Fetch a user by id (safe fields only)
      user: async (
        _parent: unknown,
        args: { id: string }
      ): Promise<UserDTO | null> => {
        const session = ctx.driver.session();
        try {
          const res = await session.executeRead((tx) =>
            tx.run(USER_CYPHER.getById, { id: args.id })
          );
          const record = res.records[0];
          return record ? (record.get("user") as UserDTO) : null;
        } finally {
          await session.close();
        }
      },

      // Fetch a user by username (safe fields only)
      userByUsername: async (
        _parent: unknown,
        args: { username: string }
      ): Promise<UserDTO | null> => {
        const session = ctx.driver.session();
        try {
          const res = await session.executeRead((tx) =>
            tx.run(USER_CYPHER.getByUsername, { username: args.username })
          );
          const record = res.records[0];
          return record ? (record.get("user") as UserDTO) : null;
        } finally {
          await session.close();
        }
      },
    },

    Mutation: {
      // Create a new user (username must be unique). Returns safe user.
      createUser: async (
        _parent: unknown,
        args: { input: CreateUserInput }
      ): Promise<CreateUserPayload> => {
        const session = ctx.driver.session();
        try {
          const res = await session.executeWrite((tx) =>
            tx.run(USER_CYPHER.create, {
              username: args.input.username,
              password: args.input.password,
            })
          );

          const record = res.records[0];
          if (!record) throw new Error("Unable to create user.");
          return { user: record.get("user") as UserDTO };
        } finally {
          await session.close();
        }
      },

      // Delete user by id and cascade-delete owned cities (SQL ON DELETE CASCADE behavior)
      deleteUser: async (
        _parent: unknown,
        args: { id: string }
      ): Promise<string> => {
        const session = ctx.driver.session();
        try {
          const res = await session.executeWrite((tx) =>
            tx.run(USER_CYPHER.deleteByIdCascadeCities, { id: args.id })
          );
          const record = res.records[0];
          if (!record) throw new Error("User not found.");
          return record.get("id") as string;
        } finally {
          await session.close();
        }
      },
    },
  };
}
