import { Artist } from './artist';

export class Album {
  id: number;
  name: string;
  releaseDate: string;
  image: File;
  artist: Artist
}
