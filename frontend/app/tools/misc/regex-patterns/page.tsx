'use client';

import ToolTemplate, { ToolCard } from '@/components/ToolTemplate';
import { Copy } from 'lucide-react';

const commonPatterns = {
  email: {
    pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
    description: 'Email address',
    example: 'user@example.com',
  },
  url: {
    pattern: 'https?://[^\\s]+',
    description: 'URL (http/https)',
    example: 'https://example.com',
  },
  phone: {
    pattern: '^[+]?[(]?[0-9]{3}[)]?[-\\s.]?[0-9]{3}[-\\s.]?[0-9]{4,6}$',
    description: 'Phone number',
    example: '(123) 456-7890',
  },
  zipcode: {
    pattern: '^[0-9]{5}(?:-[0-9]{4})?$',
    description: 'US ZIP code',
    example: '12345 or 12345-6789',
  },
  ipv4: {
    pattern: '^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$',
    description: 'IPv4 address',
    example: '192.168.1.1',
  },
  hexcolor: {
    pattern: '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$',
    description: 'Hex color code',
    example: '#FF0000 or #F00',
  },
  date: {
    pattern: '^(0[1-9]|1[0-2])/(0[1-9]|[12][0-9]|3[01])/\\d{4}$',
    description: 'Date (MM/DD/YYYY)',
    example: '12/25/2024',
  },
  username: {
    pattern: '^[a-zA-Z0-9_]{3,16}$',
    description: 'Username (3-16 alphanumeric)',
    example: 'user_123',
  },
  slug: {
    pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$',
    description: 'URL slug',
    example: 'my-awesome-post',
  },
  creditcard: {
    pattern: '^[0-9]{13,19}$',
    description: 'Credit card number',
    example: '4532015112830366',
  },
};

export default function RegexPatternsPage() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <ToolTemplate
      title="Regex Pattern Library"
      description="Common regex patterns for validation"
      icon="📚"
    >
      <div className="space-y-4">
        {Object.entries(commonPatterns).map(([key, value]) => (
          <ToolCard key={key}>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{value.description}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <strong>Example:</strong> {value.example}
                </p>
              </div>

              <div className="bg-gray-100 dark:bg-slate-900 rounded-lg p-4">
                <div className="flex items-center justify-between gap-2">
                  <code className="font-mono text-xs text-gray-900 dark:text-gray-100 flex-1 break-all">
                    {value.pattern}
                  </code>
                  <button
                    onClick={() => copyToClipboard(value.pattern)}
                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 rounded transition flex-shrink-0"
                    title="Copy pattern"
                  >
                    <Copy size={16} />
                  </button>
                </div>
              </div>
            </div>
          </ToolCard>
        ))}

        <ToolCard title="How to Use">
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <p className="font-semibold text-gray-900 dark:text-white">JavaScript Example:</p>
            <div className="bg-gray-100 dark:bg-slate-900 p-3 rounded font-mono text-xs">
              const regex = /pattern/;<br />
              if (regex.test(input)) {'{'}
              <br />
              {'  // Matches!'}
              <br />
              {'}'}
            </div>

            <p className="font-semibold text-gray-900 dark:text-white mt-4">With Flags:</p>
            <div className="bg-gray-100 dark:bg-slate-900 p-3 rounded font-mono text-xs">
              /pattern/g  {' // global (all matches)'}
              <br />
              /pattern/i  {' // case-insensitive'}
              <br />
              /pattern/m  {' // multiline'}
            </div>
          </div>
        </ToolCard>

        <ToolCard title="Tips">
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>• Use ^ to match start of string</li>
            <li>• Use $ to match end of string</li>
            <li>• Use . to match any character</li>
            <li>• Use * for 0 or more matches</li>
            <li>• Use + for 1 or more matches</li>
            <li>• Use ? for 0 or 1 match</li>
            <li>• Use [] for character class</li>
            <li>• Use | for OR operator</li>
          </ul>
        </ToolCard>
      </div>
    </ToolTemplate>
  );
}
