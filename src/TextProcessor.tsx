interface Token {
  tokenId: number;
  token: string;
  isPunctuationSign: boolean;
  languages?: {
    spanish: string;
    english: string;
  };
}

interface Sentence {
  sentenceId: number;
  tokens: Token[];
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

  private processedText: Sentence[];

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
    const result = sentences.map((sentence, index) => ({
      sentenceId: index,
      tokens: this.tokenizeSentence(sentence),
    }));
    return result;
  }

  private tokenizeSentences(text: string): string[] {
    return text.split(/(?<=\.)\s*/);
  }

  private tokenizeSentence(sentence: string): Token[] {
    const words = sentence.split(' ');
    const tokenizedSentence: Token[] = [];
    let tokenId = 0;

    for (const word of words) {
      const tokens = this.tokenizeWord(word);

      for (const token of tokens) {
        const isPunctuationSign = this.isPunctuation(token);

        const tokenObject: Token = {
          tokenId,
          token,
          isPunctuationSign,
        };

        if (!isPunctuationSign) {
          tokenObject.languages = { spanish: '', english: '' };
        }

        tokenizedSentence.push(tokenObject);
        tokenId++;
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