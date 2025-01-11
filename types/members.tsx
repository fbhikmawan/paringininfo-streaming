import { BaseFields } from './bases'
import { Rating } from './videos'

export interface Member extends BaseFields {
  username: string;
  email: string;
  provider: string;
  ratings: Rating[];
}