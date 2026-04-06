'use client';

import { useState } from 'react';
import { Copy } from 'lucide-react';
import { LegacyToolWrapper } from '@/components/LegacyToolWrapper';

export default function ReadabilityScore() {
  const [text, setText] = useState('The quick brown fox jumps over the lazy dog. This is an amazing example.');
  const [stats, setStats] = useState<Record<string, number>>({});

  const calculateReadability = () => {
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length || 1;
    const words = text.match(/\b\w+\b/g) || [];
    const totalWords = words.length || 1;
    const syllables = words.reduce((sum, word) => sum + countSyllables(word), 0) || 1;
    const characters = text.replace(/[^a-zA-Z]/g, '').length || 1;

    // Flesch Reading Ease
    const flesch = Math.max(0, 206.835 - 1.015 * (totalWords / sentences) - 84.6 * (syllables / totalWords));

    // Flesch-Kincaid Grade Level
    const kincaid = 0.39 * (totalWords / sentences) + 11.8 * (syllables / totalWords) - 15.59;

    // Automated Readability Index
    const ari = 4.71 * (characters / totalWords) + 0.5 * (totalWords / sentences) - 21.43;

    setStats({
      Characters: characters,
      Words: totalWords,
      Sentences: sentences,
      'Avg Word Length': totalWords > 0 ? Math.round((characters / totalWords) * 10) / 10 : 0,
      Syllables: syllables,
      'Flesch Reading Ease': Math.round(flesch * 10) / 10,
      'Flesch-Kincaid Grade': Math.round(kincaid * 10) / 10,
      'Automated Readability Index': Math.round(ari * 10) / 10,
    });
  };

  const countSyllables = (word: string): number => {
    word = word.toLowerCase();
    const vowels = 'aeiouy';
    let syllableCount = 0;
    let previousWasVowel = false;

    for (const char of word) {
      const isVowel = vowels.includes(char);
      if (isVowel && !previousWasVowel) {
        syllableCount++;
      }
      previousWasVowel = isVowel;
    }

    if (word.endsWith('e')) {
      syllableCount--;
    }
    if (word.endsWith('le') && word.length > 2 && !vowels.includes(word[word.length - 3])) {
      syllableCount++;
    }

    return Math.max(1, syllableCount);
  };

  const getReadabilityLevel = (flesch: number) => {
    if (flesch >= 90) return 'Very Easy';
    if (flesch >= 80) return 'Easy';
    if (flesch >= 70) return 'Fairly Easy';
    if (flesch >= 60) return 'Standard';
    if (flesch >= 50) return 'Fairly Difficult';
    if (flesch >= 30) return 'Difficult';
    return 'Very Difficult';
  };

  const copy = () => {
    const statsText = Object.entries(stats)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
    navigator.clipboard.writeText(statsText);
  };

  return (
    <LegacyToolWrapper>
      <div className="min-h-screen bg-background text-foreground p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">📈 Readability Score</h1>
            <p className="text-muted-foreground">Calculate readability metrics for text</p>
          </div>

          <div className="space-y-6 mb-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Text Input</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full h-40 p-4 border border-border rounded-lg bg-secondary-bg text-foreground resize-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                placeholder="Enter text to analyze..."
              />
            </div>

            {Object.keys(stats).length > 0 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(stats).map(([key, value]) => (
                    <div key={key} className="p-3 border border-border rounded-lg bg-secondary-bg">
                      <div className="text-xs text-muted-foreground mb-1">{key}</div>
                      <div className="text-lg font-bold text-accent">{value}</div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border border-border rounded-lg bg-secondary-bg">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-muted-foreground">Readability Level</div>
                      <div className="text-xl font-bold mt-1">
                        {getReadabilityLevel(stats['Flesch Reading Ease'])}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Grade Level</div>
                      <div className="text-xl font-bold text-accent mt-1">
                        {stats['Flesch-Kincaid Grade'] > 0 ? `Grade ${stats['Flesch-Kincaid Grade']}` : 'N/A'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={calculateReadability}
              className="px-6 py-2 bg-accent text-white rounded-lg hover:opacity-90 transition font-medium"
            >
              Calculate
            </button>
            {Object.keys(stats).length > 0 && (
              <button
                onClick={copy}
                className="px-4 py-2 border border-accent bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition flex items-center gap-2 font-medium"
              >
                <Copy size={16} /> Copy
              </button>
            )}
            <button
              onClick={() => {
                setText('');
                setStats({});
              }}
              className="px-4 py-2 border border-border bg-secondary-bg text-foreground rounded-lg hover:bg-border transition font-medium"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </LegacyToolWrapper>
  );
}
