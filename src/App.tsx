import { useState } from 'react';
import './App.css';
import TextProcessor from './TextProcessor';
import songs from './songs.json';

function App() {
  const [processedText, setProcessedText] = useState(
    new TextProcessor(songs[0].lyrics).processedText
  );

  // console.log(processedText);

  return (
    <div className="lyrics">
      {processedText.map((sentence, sentenceIndex) => (
        <div
          className="sentence-container"
          id={`sentence${sentenceIndex}`}
          key={sentenceIndex}
        >
          {sentence.tokens.map((token, tokenIndex) => {
            // {
            //   console.log('first', token.token, token.isPunctuationSign);
            // }
            // {
            //   console.log(
            //     'second',
            //     sentence.tokens[tokenIndex + 1].token,
            //     sentence.tokens[tokenIndex + 1].isPunctuationSign
            //   );
            // }
            // {
            //   if (tokenIndex === sentence.tokens.length - 1) {
            //     return;
            //   } else {
            //     console.log(
            //       'second',
            //       sentence.tokens[tokenIndex + 1].token,
            //       sentence.tokens[tokenIndex + 1].isPunctuationSign
            //     );
            //   }
            // }

            const nextToken = sentence.tokens[tokenIndex + 1];
            const isNextTokenPunctuation =
              nextToken && nextToken.isPunctuationSign;

            return (
              <p
                className={`token ${
                  token.isPunctuationSign ? 'punctuationSign' : 'word'
                }`}
                id={`token${tokenIndex}`}
                key={tokenIndex}
              >
                {token.token}
              </p>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default App;
