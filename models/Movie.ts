export class Movie {
  id: string;
  title: string;
  rating: number;
  year: number;
  image: string;
  genre: string[];

  constructor(
    id: string,
    title: string,
    rating: number,
    year: number,
    image: string,
    genre: string[]
  ) {
    this.id = id;
    this.title = title;
    this.rating = rating;
    this.year = year;
    this.image = image;
    this.genre = genre;
  }
}
