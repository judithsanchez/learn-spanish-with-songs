export default class Song {
  lyrics: {
    spanish: object;
    english: object;
  };

  constructor(spanishLyrics: object, englishLyrics: object) {
    this.lyrics = {
      spanish: spanishLyrics,
      english: englishLyrics,
    };
  }
}
