interface Languages {
  spanish: string;
  english: string;
}

interface Token {
  id: number;
  token: string;
  isPunctuationSign: boolean;
  languages?: Languages;
}

interface Sentence {
  id: number;
  tokens: Token[];
  languages?: Languages;
}

export default class TextProcessor {
  private punctuationSigns: Set<string> = new Set([
    ',',
    '.',
    '¡',
    '!',
    '¿',
    '?',
    ':',
    ';',
    "'",
    '(',
    ')',
    '-',
    '_',
    '[',
    ']',
    '{',
    '}',
    '/',
    '\\',
    '|',
    '@',
    '#',
    '$',
    '%',
    '&',
    '*',
    '+',
    '=',
    '<',
    '>',
    '~',
    '`',
    '"',
  ]);

  processedText: Sentence[];

  constructor(text: string) {
    if (typeof text !== 'string') {
      throw new Error('TextProcessor can only be initialized with a string.');
    }

    if (text.trim().length === 0) {
      throw new Error(
        'TextProcessor cannot be initialized with an empty string.'
      );
    }

    this.processedText = this.processText(text);
  }

  private processText(text: string): Sentence[] {
    const sentences = this.tokenizeSentences(text);
    if (sentences === null) {
      throw new Error('No valid sentences found in the input text.');
    }

    const result = sentences.map((sentence, index) => ({
      id: index,
      tokens: this.tokenizeSentence(sentence),
      languages: { spanish: sentence, english: '' },
    }));
    return result;
  }

  private tokenizeSentences(text: string): string[] | null {
    return text.split(/(?<=\.|\?)\s*/);
  }

  private tokenizeSentence(sentence: string): Token[] {
    const words = sentence.split(' ');
    const tokenizedSentence: Token[] = [];
    let id = 0;

    for (const word of words) {
      const tokens = this.tokenizeWord(word);

      for (const token of tokens) {
        const isPunctuationSign = this.isPunctuation(token);

        const tokenObject: Token = {
          id,
          token,
          isPunctuationSign,
        };

        tokenizedSentence.push(tokenObject);
        id++;
      }
    }
    return tokenizedSentence;
  }

  private tokenizeWord(word: string): string[] {
    const tokenizedWord: string[] = [];
    let currentToken = '';

    for (const char of word) {
      if (this.isPunctuation(char)) {
        if (currentToken.length > 0) {
          tokenizedWord.push(currentToken);
          currentToken = '';
        }
        tokenizedWord.push(char);
      } else {
        currentToken += char;
      }
    }

    if (currentToken.length > 0) {
      tokenizedWord.push(currentToken);
    }

    return tokenizedWord;
  }

  private isPunctuation(char: string): boolean {
    return this.punctuationSigns.has(char);
  }
}
