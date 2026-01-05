export type UserDTO = {
  id: string;
  username: string;
};

// mirrors your SQL insert type (no id, generated in DB)
export type CreateUserInput = {
  username: string;
  password: string;
};

export type CreateUserPayload = {
  user: UserDTO;
};
