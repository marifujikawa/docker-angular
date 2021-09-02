import { Hero } from "./hero";

export interface Power {
  id: number;
  name: string;
  heroes: Hero[];
}
