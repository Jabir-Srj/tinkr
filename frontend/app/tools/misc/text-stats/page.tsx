'use client';

import { useState } from 'react';
import ToolTemplate, { ToolCard } from '@/components/ToolTemplate';

export default function TextStatisticsPage() {
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
        : (
            text.replace(/\s/g, '').length / (text.trim().split(/\s+/).length || 1)
          ).toFixed(2),
    averageSentenceLength:
      text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length === 0
        ? 0
        : (
            text.trim().split(/\s+/).length /
            (text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length || 1)
          ).toFixed(2),
    readingTime: Math.ceil((text.trim().split(/\s+/).length || 0) / 200),
  };

  const uniqueWords = [...new Set(text.toLowerCase().match(/\b\w+\b/g) || [])].length;

  return (
    <ToolTemplate
      title="Text Statistics"
      description="Analyze your text with detailed statistics"
      icon="📊"
      onReset={() =>
        setText('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')
      }
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input */}
        <div className="lg:col-span-1">
          <ToolCard title="Text Input">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-64"
              placeholder="Paste or type your text here..."
            />
          </ToolCard>
        </div>

        {/* Statistics */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Basic Stats */}
            <ToolCard>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Characters</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.characters}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Characters (no spaces)</p>
                  <p className="text-3xl font-bold text-teal-600">{stats.charactersNoSpaces}</p>
                </div>
              </div>
            </ToolCard>

            <ToolCard>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Words</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.words}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Unique Words</p>
                  <p className="text-3xl font-bold text-teal-600">{uniqueWords}</p>
                </div>
              </div>
            </ToolCard>

            <ToolCard>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Sentences</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.sentences}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Paragraphs</p>
                  <p className="text-3xl font-bold text-teal-600">{stats.paragraphs}</p>
                </div>
              </div>
            </ToolCard>

            <ToolCard>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Lines</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.lines}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Reading Time</p>
                  <p className="text-3xl font-bold text-teal-600">{stats.readingTime}m</p>
                </div>
              </div>
            </ToolCard>
          </div>

          {/* Advanced Stats */}
          <ToolCard title="Advanced Statistics">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Avg. Word Length</p>
                <p className="text-2xl font-bold text-blue-600">{stats.averageWordLength}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Avg. Sentence Length</p>
                <p className="text-2xl font-bold text-blue-600">{stats.averageSentenceLength}</p>
              </div>
            </div>
          </ToolCard>

          {/* Character Distribution */}
          <ToolCard title="Character Types">
            <div className="space-y-2">
              {[
                { label: 'Letters', count: (text.match(/[a-zA-Z]/g) || []).length },
                { label: 'Digits', count: (text.match(/[0-9]/g) || []).length },
                { label: 'Spaces', count: (text.match(/\s/g) || []).length },
                { label: 'Special', count: (text.match(/[^\w\s]/g) || []).length },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{item.label}</span>
                  <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </ToolCard>
        </div>
      </div>
    </ToolTemplate>
  );
}
