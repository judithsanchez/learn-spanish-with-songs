import { useState } from 'react';
import './App.css';
import TextProcessor from './TextProcessor';
import songs from './songs.json';

function App() {
  const [processedText] = useState(
    new TextProcessor(songs[0].lyrics).processedText
  );

  return (
    <div className="lyrics">
      {processedText.map((sentence, sentenceIndex) => (
        <div
          className="sentence-container"
          id={`sentence${sentenceIndex}`}
          key={sentenceIndex}
        >
          <div className="translation-button-container">
            <button>T</button>
          </div>

          <div className="tokens-container">
            {sentence.tokens.map((token, tokenIndex) => {
              let currentToken;
              let nextToken;

              {
                if (tokenIndex !== sentence.tokens.length - 1) {
                  currentToken = token;
                  nextToken = sentence.tokens[tokenIndex + 1];
                }
              }

              return (
                <>
                  <p
                    className={`token ${
                      token.isPunctuationSign ? 'punctuationSign' : 'word'
                    } ${
                      !token.isPunctuationSign && !nextToken?.isPunctuationSign
                        ? 'separator'
                        : ''
                    } ${
                      token.isPunctuationSign && nextToken?.isPunctuationSign
                        ? 'separator'
                        : ''
                    }
                ${token.token === ',' ? 'separator' : ''}
                  `}
                    id={`token${tokenIndex}`}
                    key={tokenIndex}
                  >
                    {token.token}
                  </p>
                </>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
