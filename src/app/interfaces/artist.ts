import { Genre } from './genre';

export class Artist {
  id: number;
  name: string;
  image: string;
  spotifyLink: string;
  youtubeLink: string;
  genre: Genre;
}
