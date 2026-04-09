'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, ToolCard } from '@/components/ToolTemplate';

export default function WordCountPage() {
  const [text, setText] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  );

  const stats = {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
    words: text.trim() === '' ? 0 : text.trim().split(/\s+/).length,
    sentences: text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length,
    paragraphs: text.split('\n\n').filter((p) => p.trim().length > 0).length,
    lines: text.split('\n').length,
    averageWordLength:
      text.trim() === ''
        ? 0
        : (text.replace(/\s/g, '').length / (text.trim().split(/\s+/).length || 1)).toFixed(2),
    averageSentenceLength:
      text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length === 0
        ? 0
        : (
            text.trim().split(/\s+/).length /
            (text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length || 1)
          ).toFixed(2),
    readingTime: Math.ceil((text.trim().split(/\s+/).length || 0) / 200),
  };

  return (
    <ToolTemplate
      title="Word Counter"
      description="Count words, characters, and analyze text"
      icon="📊"
      onReset={() =>
        setText('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')
      }
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input */}
        <div className="lg:col-span-1">
          <ToolCard title="Text Input">
            <InputGroup label="Enter Text">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-transparent resize-none h-64"
                placeholder="Paste or type your text here..."
              />
            </InputGroup>
          </ToolCard>
        </div>

        {/* Statistics */}
        <div className="lg:col-span-2 space-y-4">
          {/* Main Counts */}
          <div className="grid md:grid-cols-2 gap-4">
            <ToolCard>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Words</p>
                  <p className="text-4xl font-bold text-blue-600">{stats.words}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Characters</p>
                  <p className="text-4xl font-bold text-teal-600">{stats.characters}</p>
                </div>
              </div>
            </ToolCard>

            <ToolCard>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Characters (no spaces)</p>
                  <p className="text-4xl font-bold text-blue-600">{stats.charactersNoSpaces}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Reading Time</p>
                  <p className="text-4xl font-bold text-teal-600">{stats.readingTime}m</p>
                </div>
              </div>
            </ToolCard>
          </div>

          {/* Additional Stats */}
          <ToolCard title="Detailed Analysis">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: 'Sentences', value: stats.sentences },
                { label: 'Paragraphs', value: stats.paragraphs },
                { label: 'Lines', value: stats.lines },
                { label: 'Avg. Word Length', value: stats.averageWordLength },
                { label: 'Avg. Sentence Length', value: stats.averageSentenceLength },
                { label: 'Density', value: ((stats.words / stats.lines) || 0).toFixed(1) },
              ].map((item) => (
                <div key={item.label} className="p-3 bg-secondary-bg border border-border rounded">
                  <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                  <p className="text-xl font-bold text-foreground">{item.value}</p>
                </div>
              ))}
            </div>
          </ToolCard>

          {/* Character Distribution */}
          <ToolCard title="Character Types">
            <div className="space-y-2">
              {[
                { label: 'Letters', count: (text.match(/[a-zA-Z]/g) || []).length, color: 'blue' },
                { label: 'Digits', count: (text.match(/[0-9]/g) || []).length, color: 'green' },
                { label: 'Spaces', count: (text.match(/\s/g) || []).length, color: 'yellow' },
                { label: 'Special', count: (text.match(/[^\w\s]/g) || []).length, color: 'red' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="text-lg font-bold text-foreground">{item.count}</span>
                </div>
              ))}
            </div>
          </ToolCard>
        </div>
      </div>
    </ToolTemplate>
  );
}
