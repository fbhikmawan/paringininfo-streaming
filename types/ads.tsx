import { BaseFields, Image } from './bases'

export interface AdBanner extends BaseFields {
  name: string;
  nameSlug: string;
  destinationLink?: string;
  banner728x90?: Image;
  banner320x50?: Image;
  banner300x250?: Image;
  banner160x300?: Image;
  banner160x600?: Image;
}