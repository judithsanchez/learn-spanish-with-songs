import { useState } from 'react';
import './App.css';
import TextProcessor from './TextProcessor';
import { Token, Sentence } from './TextProcessor';
import Song from './Song';
import songs from './songs.json';

export default function App() {
  const siTeVas = songs[0];
  const spanishSong = new TextProcessor(siTeVas.lyrics.spanish);
  const englishSong = new TextProcessor(siTeVas.lyrics.english);
  const [song] = useState(new Song(spanishSong, englishSong));

  const renderTokens = (obj: Token) => {
    return obj.tokens.map((tokenObj: Token, tokenIndex: number) => {
      const nextToken =
        tokenIndex !== obj.tokens.length - 1
          ? obj.tokens[tokenIndex + 1]
          : null;
      const isPunctuation = tokenObj.isPunctuationSign;
      const isNextPunctuation = nextToken && nextToken.isPunctuationSign;
      const isWord = !isPunctuation && !isNextPunctuation;
      const isSeparator =
        isWord ||
        (isPunctuation && isNextPunctuation) ||
        tokenObj.token === ',';

      return (
        <p
          className={`token ${isPunctuation ? 'punctuationSign' : 'word'} ${
            isSeparator ? 'separator' : ''
          }`}
          id={`token${tokenIndex}`}
          key={`token${tokenIndex}`}
        >
          {tokenObj.token}
        </p>
      );
    });
  };

  const renderVerse = (obj: Sentence, index: number) => {
    return (
      <div className="verse-container" key={`verse${index}`}>
        <div className="tokens-container">{renderTokens(obj, index)}</div>
        <p className="verse verseSpanish" id={`verseSpanish${index}`}>
          {obj.sentence}
        </p>
        <p className="verse verseEnglish" id={`verseEnglish${index}`}>
          {song.lyrics.english.processedText[index].sentence}
        </p>
      </div>
    );
  };

  const renderVerses = () => {
    return song.lyrics.spanish.processedText.map((obj: object, index: number) =>
      renderVerse(obj, index)
    );
  };

  return <div className="lyrics-container">{renderVerses()}</div>;
}
