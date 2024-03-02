import { User } from './user';

export interface Card {
  id: number;
  title: string;
  description: string;
  price: string;
  adress: string;
  img?: string;
  author?: User;
}
