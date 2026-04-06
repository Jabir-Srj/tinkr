'use client';

import { useState } from 'react';
import ToolTemplate, { ToolCard, InputGroup } from '@/components/ToolTemplate';
import { Copy } from 'lucide-react';

const MORSE_CODE_DICT: { [key: string]: string } = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
  '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.', '.': '.-.-.-', ',': '--..--', '?': '..--..',
  "'": '.----.',  '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
  '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.',
  '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.'
};

const REVERSE_MORSE: { [key: string]: string } = Object.fromEntries(
  Object.entries(MORSE_CODE_DICT).map(([k, v]) => [v, k])
);

export default function MorseCodePage() {
  const [text, setText] = useState('HELLO');
  const [morse, setMorse] = useState('.... . .-.. .-.. ---');

  const textToMorse = (str: string) => {
    return str
      .toUpperCase()
      .split('')
      .map(char => MORSE_CODE_DICT[char] || '?')
      .join(' ');
  };

  const morseToText = (str: string) => {
    return str
      .split(' ')
      .map(code => REVERSE_MORSE[code] || '?')
      .join('');
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);
    setMorse(textToMorse(value));
  };

  const handleMorseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMorse(value);
    setText(morseToText(value));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <ToolTemplate
      title="Morse Code Translator"
      description="Convert between text and Morse code"
      icon="📡"
      onReset={() => {
        setText('HELLO');
        setMorse('.... . .-.. .-.. ---');
      }}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <ToolCard title="Text Input">
          <InputGroup label="Text">
            <textarea
              value={text}
              onChange={handleTextChange}
              placeholder="Enter text here..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-32 font-mono"
            />
          </InputGroup>
          <button
            onClick={() => copyToClipboard(text)}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition flex items-center justify-center gap-2 mt-2"
          >
            <Copy size={16} />
            Copy Text
          </button>
        </ToolCard>

        <ToolCard title="Morse Code Output">
          <InputGroup label="Morse (· = dot, − = dash)">
            <textarea
              value={morse}
              onChange={handleMorseChange}
              placeholder="Morse code..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-32 font-mono"
            />
          </InputGroup>
          <button
            onClick={() => copyToClipboard(morse)}
            className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition flex items-center justify-center gap-2 mt-2"
          >
            <Copy size={16} />
            Copy Morse
          </button>
        </ToolCard>
      </div>

      <ToolCard title="Morse Code Reference">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-gray-700 dark:text-gray-300">
          <div><strong>A:</strong> .-</div>
          <div><strong>B:</strong> -...</div>
          <div><strong>C:</strong> -.-.</div>
          <div><strong>D:</strong> -..</div>
          <div><strong>E:</strong> .</div>
          <div><strong>S:</strong> ...</div>
          <div><strong>O:</strong> ---</div>
          <div><strong>Space:</strong> /</div>
        </div>
      </ToolCard>
    </ToolTemplate>
  );
}
