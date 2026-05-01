export type Role = 'admin' | 'user';

export type Treatment = 'Sr.' | 'Sra.' | 'Srta.';

export interface User {
  id: number;
  username: string;
  password: string;
  role: Role;
  name: string;
}

export type StoredUser = Omit<User, 'password'>;
