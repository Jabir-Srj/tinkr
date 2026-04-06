'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, ToolCard } from '@/components/ToolTemplate';
import { CheckCircle, XCircle } from 'lucide-react';

export default function PalindromeCheckerPage() {
  const [text, setText] = useState('racecar');

  const isPalindrome = (str: string): boolean => {
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
  };

  const isValid = isPalindrome(text);
  const cleaned = text.toLowerCase().replace(/[^a-z0-9]/g, '');
  const reversed = cleaned.split('').reverse().join('');

  return (
    <ToolTemplate
      title="Palindrome Checker"
      description="Check if text reads the same forwards and backwards"
      icon="🔄"
      onReset={() => setText('racecar')}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input */}
        <div>
          <ToolCard title="Text Input">
            <InputGroup label="Enter Text">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to check..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-32"
              />
            </InputGroup>
          </ToolCard>
        </div>

        {/* Result */}
        <div className="space-y-4">
          {isValid ? (
            <ToolCard>
              <div className="flex gap-3 items-start">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-green-900 dark:text-green-200">Is a Palindrome!</p>
                  <p className="text-sm text-green-800 dark:text-green-300">
                    This text reads the same forwards and backwards
                  </p>
                </div>
              </div>
            </ToolCard>
          ) : (
            <ToolCard>
              <div className="flex gap-3 items-start">
                <XCircle className="text-red-600 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-red-900 dark:text-red-200">Not a Palindrome</p>
                  <p className="text-sm text-red-800 dark:text-red-300">
                    This text does not read the same backwards
                  </p>
                </div>
              </div>
            </ToolCard>
          )}

          <ToolCard title="Analysis">
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-600 dark:text-gray-400 mb-1">Original</p>
                <p className="font-mono text-gray-900 dark:text-gray-100 break-all">{text}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 mb-1">Cleaned (alphanumeric only)</p>
                <p className="font-mono text-gray-900 dark:text-gray-100 break-all">{cleaned}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 mb-1">Reversed</p>
                <p className="font-mono text-gray-900 dark:text-gray-100 break-all">{reversed}</p>
              </div>
            </div>
          </ToolCard>

          <ToolCard title="Examples">
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>✓ racecar</li>
              <li>✓ A man, a plan, a canal: Panama</li>
              <li>✓ Was it a car or a cat I saw?</li>
              <li>✗ hello</li>
            </ul>
          </ToolCard>
        </div>
      </div>
    </ToolTemplate>
  );
}
