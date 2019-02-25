import { Genre } from './genre';

export class Artist {
  id: number;
  name: string;
  image: File;
  spotifyLink: string;
  youtubeLink: string;
  genre: Genre;
}
