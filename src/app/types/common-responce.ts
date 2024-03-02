import { User } from './user';

export interface CommonResponse {
  user: User;
  accessToken: string;
}
