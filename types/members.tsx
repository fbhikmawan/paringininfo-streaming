import { BaseFields } from './bases'

export interface Member extends BaseFields {
  username: string;
  email: string;
  provider: string;
  ratings: { documentId: string }[];
}