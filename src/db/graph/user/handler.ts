import type { Driver } from "neo4j-driver";
import { USER_CYPHER } from "./cypher";
import type { CreateUserInput, UserDTO } from "./types";

/**
 * Internal type for authentication (includes password hash).
 * Never return this from GraphQL.
 */
export type UserAuthDTO = UserDTO & { password: string };

export class UserGraphHandler {
  constructor(private readonly driver: Driver) {}

  async createUser(input: CreateUserInput): Promise<UserDTO> {
    const session = this.driver.session();
    try {
      const res = await session.executeWrite((tx) =>
        tx.run(USER_CYPHER.create, {
          username: input.username,
          password: input.password,
        })
      );

      const record = res.records[0];
      if (!record) throw new Error("Unable to create user.");
      return record.get("user") as UserDTO;
    } finally {
      await session.close();
    }
  }

  async getUserById(id: string): Promise<UserDTO | null> {
    const session = this.driver.session();
    try {
      const res = await session.executeRead((tx) =>
        tx.run(USER_CYPHER.getById, { id })
      );
      return (res.records[0]?.get("user") as UserDTO) ?? null;
    } finally {
      await session.close();
    }
  }

  async getUserByUsername(username: string): Promise<UserDTO | null> {
    const session = this.driver.session();
    try {
      const res = await session.executeRead((tx) =>
        tx.run(USER_CYPHER.getByUsername, { username })
      );
      return (res.records[0]?.get("user") as UserDTO) ?? null;
    } finally {
      await session.close();
    }
  }

  /**
   * Used by REST auth logic: fetch user + password hash for login verification.
   */
  async getUserAuthByUsername(username: string): Promise<UserAuthDTO | null> {
    const session = this.driver.session();
    try {
      const res = await session.executeRead((tx) =>
        tx.run(USER_CYPHER.getAuthByUsername, { username })
      );
      return (res.records[0]?.get("user") as UserAuthDTO) ?? null;
    } finally {
      await session.close();
    }
  }

  async deleteUser(id: string): Promise<string> {
    const session = this.driver.session();
    try {
      const res = await session.executeWrite((tx) =>
        tx.run(USER_CYPHER.deleteByIdCascadeCities, { id })
      );
      const record = res.records[0];
      if (!record) throw new Error("User not found.");
      return record.get("id") as string;
    } finally {
      await session.close();
    }
  }
}
