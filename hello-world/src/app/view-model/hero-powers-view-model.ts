import { Hero } from '../interfaces/hero';
import { Power } from '../interfaces/power';

export default class HeroPowersViewModel {
  hero: Hero | undefined;
  powers: Power[] | undefined;
}
