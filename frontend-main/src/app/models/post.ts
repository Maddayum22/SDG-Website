import { User } from "./user";

export interface Post {
  id?: number;
  userId: number;
  title: string;
  description: string;
  image?: string;
  sdgId: number;
  areaOfExpertise: string;
  createdAt?: string;
  user?: User;
}
