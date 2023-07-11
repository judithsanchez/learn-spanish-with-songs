import { useState } from 'react';
import './App.css';
import TextProcessor from './TextProcessor';
import Song from './Song';
import songs from './songs.json';

function App() {
  const siTeVas = songs[0];
  const spanishSong = new TextProcessor(siTeVas.lyrics.spanish);
  const englishSong = new TextProcessor(siTeVas.lyrics.english);
  const [song] = useState(new Song(spanishSong, englishSong));

  return (
    <div className="lyrics-container">
      {song.lyrics.spanish.processedText.map((obj, index) => (
        <div className="verse-container">
          <p>{obj.sentence}</p>
          <p>{song.lyrics.english.processedText[index].sentence}</p>
        </div>
      ))}
    </div>
  );
}

export default App;

// {
//   processedText.map((sentence, sentenceIndex) => {
//     const { tokens } = sentence;
//     const tokenCount = tokens.length;

//     return (
//       <div
//         className="sentence-container"
//         id={`sentence${sentenceIndex}`}
//         key={sentenceIndex}
//       >
//         <div className="translation-button-container">
//           <button>T</button>
//         </div>

//         <div className="tokens-container">
//           {tokens.map((token, tokenIndex) => {
//             const nextToken =
//               tokenIndex !== tokenCount - 1 ? tokens[tokenIndex + 1] : null;
//             const isPunctuation = token.isPunctuationSign;
//             const isNextPunctuation = nextToken && nextToken.isPunctuationSign;
//             const isWord = !isPunctuation && !isNextPunctuation;
//             const isSeparator =
//               isWord ||
//               (isPunctuation && isNextPunctuation) ||
//               token.token === ',';

//             return (
//               <p
//                 className={`token ${
//                   isPunctuation ? 'punctuationSign' : 'word'
//                 } ${isSeparator ? 'separator' : ''}`}
//                 id={`token${tokenIndex}`}
//                 key={tokenIndex}
//               >
//                 {token.token}
//               </p>
//             );
//           })}
//         </div>
//       </div>
//     );
//   });
// }
