export class User {
  id: number;
  name: string;
  email: string;
  username: string;
  password: string;
  enabled: boolean;
  roles: string[] = [];
}
