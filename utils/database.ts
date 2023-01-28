//@ts-nocheck

import * as SQLite from "expo-sqlite";
import { Movie } from "../models/movie";

const database = SQLite.openDatabase("movies.db");
const tableName = "moviesData222";
const dbHelper = {
  COLUMN_ID: {
    name: "id",
    type: "TEXT PRIMARY KEY",
  },
  COLUMN_TITLE: {
    name: "title",
    type: "TEXT",
  },
  COLUMN_RATING: {
    name: "rating",
    type: "REAL",
  },
  COLUMN_YEAR: {
    name: "year",
    type: "INTEGER",
  },
  COLUMN_IMAGE: {
    name: "image",
    type: "TEXT",
  },
  COLUMN_GENRE: {
    name: "genre",
    type: "TEXT",
  },
};

export function init() {
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
    ${dbHelper.COLUMN_ID.name} ${dbHelper.COLUMN_ID.type},  
    ${dbHelper.COLUMN_TITLE.name} ${dbHelper.COLUMN_TITLE.type}, 
    ${dbHelper.COLUMN_RATING.name} ${dbHelper.COLUMN_RATING.type}, 
    ${dbHelper.COLUMN_YEAR.name} ${dbHelper.COLUMN_YEAR.type},
    ${dbHelper.COLUMN_IMAGE.name} ${dbHelper.COLUMN_IMAGE.type},
    ${dbHelper.COLUMN_GENRE.name} ${dbHelper.COLUMN_GENRE.type}
);`;

  const promise = new Promise<void>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        query,
        [],
        () => {
          resolve();
        },
        (_, erorr) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function insertMovies(movies: Movie[]) {
  const insertQuery =
    `INSERT OR REPLACE INTO ${tableName}(${dbHelper.COLUMN_ID.name}, ${dbHelper.COLUMN_TITLE.name}, ${dbHelper.COLUMN_YEAR.name}, ${dbHelper.COLUMN_RATING.name}, ${dbHelper.COLUMN_IMAGE.name}, ${dbHelper.COLUMN_GENRE.name}) values` +
    movies
      .map(
        (i) =>
          `("${i.id}", "${i.title}", ${i.year}, ${i.rating}, "${i.image}", "${i.genre}")`
      )
      .join(",");

  const promise = new Promise<void>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        insertQuery,
        [],
        (_, result) => {
          console.log(result, "EEEEEEEEEEEE");
          resolve();
        },
        (_, erorr) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}

export function deleteMovie(id: string) {
  const query = `DELETE FROM ${tableName} WHERE ${dbHelper.COLUMN_ID.name} = '${id}'`;

  const promise = new Promise<void>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        query,
        [],
        (_, result) => {
          resolve();
        },
        (_, erorr) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}

export function fetchRandomMovie() {
  let query = `SELECT * FROM ${tableName}  ORDER BY RANDOM() LIMIT 1`;

  const promise = new Promise<Movie>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        query,
        [],
        (_, result) => {
          const dp = result.rows._array[0];
          const movie = new Movie(
            dp.id,
            dp.title,
            dp.rating,
            dp.year,
            dp.image,
            dp.genre
          );
          resolve(movie);
        },
        (_, erorr) => {
          console.log(erorr);
          reject(error);
        }
      );
    });
  });
  return promise;
}

export function fetchMoviesFromDb(genre?: string = null) {
  let query = `SELECT * FROM ${tableName}`;
  genre && (query += ` WHERE ${dbHelper.COLUMN_GENRE.name} LIKE '%${genre}%'`);
  query += ` ORDER BY ${dbHelper.COLUMN_RATING.name} DESC`;
  const promise = new Promise<any>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        query,
        [],
        (_, result) => {
          const movies: Movie[] = [];
          for (const dp of result.rows._array) {
            movies.push(
              new Movie(dp.id, dp.title, dp.rating, dp.year, dp.image, dp.genre)
            );
          }
          resolve(movies);
        },
        (_, erorr) => {
          console.log(erorr);
          reject(error);
        }
      );
    });
  });
  return promise;
}

export function fetchGenres() {
  //uproszczone, żeby genres przetrzymywac jako string, a genre rozdzielany przecinkami zamiast oddzielnej tabeli i łącznikowej
  const query = `SELECT DISTINCT ${dbHelper.COLUMN_GENRE.name} FROM ${tableName}`;
  const promise = new Promise<any>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        query,
        [],
        (_, result) => {
          const genres: string[] = [];
          for (const dp of result.rows._array) {
            let genresArr: string[] = [];
            if (dp.genre.includes(",")) {
              genresArr = dp.genre.split(",");
            } else {
              genresArr.push(dp.genre);
            }
            for (let i = 0; i < genresArr.length; i++) {
              if (!genres.includes(genresArr[i])) {
                genres.push(genresArr[i]);
              }
            }
          }
          genres.sort();
          resolve(genres);
        },
        (_, erorr) => {
          console.log(erorr);
          reject(error);
        }
      );
    });
  });
  return promise;
}
