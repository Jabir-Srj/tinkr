'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, ToolCard } from '@/components/ToolTemplate';
import { Copy } from 'lucide-react';

export default function PasswordGeneratorPage() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);

  const generatePassword = () => {
    let chars = '';
    if (uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) chars += '0123456789';
    if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
  };

  type StrengthColor = 'red' | 'yellow' | 'green';
  type StrengthResult = {
    level: 'Weak' | 'Fair' | 'Strong';
    color: StrengthColor;
  };

  const checkStrength = (pwd: string): StrengthResult => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (pwd.length >= 12) strength++;
    if (/[a-z]/.test(pwd)) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^a-zA-Z0-9]/.test(pwd)) strength++;

    if (strength <= 2) return { level: 'Weak', color: 'red' };
    if (strength <= 4) return { level: 'Fair', color: 'yellow' };
    return { level: 'Strong', color: 'green' };
  };

  const strength = password ? checkStrength(password) : null;
  const strengthStyles: Record<StrengthColor, {
    text: string;
    badgeBg: string;
    badgeBorder: string;
  }> = {
    red: {
      text: 'text-red-600 dark:text-red-400',
      badgeBg: 'bg-red-100 dark:bg-red-900/30',
      badgeBorder: 'border-red-600',
    },
    yellow: {
      text: 'text-yellow-600 dark:text-yellow-400',
      badgeBg: 'bg-yellow-100 dark:bg-yellow-900/30',
      badgeBorder: 'border-yellow-600',
    },
    green: {
      text: 'text-green-600 dark:text-green-400',
      badgeBg: 'bg-green-100 dark:bg-green-900/30',
      badgeBorder: 'border-green-600',
    },
  };

  const copyToClipboard = () => {
    if (password) navigator.clipboard.writeText(password);
  };

  return (
    <ToolTemplate
      title="Password Generator"
      description="Generate secure random passwords"
      icon="🔐"
      onReset={() => {
        setPassword('');
        setLength(16);
        setUppercase(true);
        setLowercase(true);
        setNumbers(true);
        setSymbols(true);
      }}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="lg:col-span-1">
          <ToolCard title="Settings">
            <InputGroup label="Length">
              <div className="flex gap-2 items-center">
                <input
                  type="range"
                  min="4"
                  max="128"
                  value={length}
                  onChange={(e) => setLength(parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 min-w-12">
                  {length}
                </span>
              </div>
            </InputGroup>

            <div className="space-y-3 my-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={uppercase}
                  onChange={(e) => setUppercase(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm text-foreground">Uppercase (A-Z)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={lowercase}
                  onChange={(e) => setLowercase(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm text-foreground">Lowercase (a-z)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={numbers}
                  onChange={(e) => setNumbers(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm text-foreground">Numbers (0-9)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={symbols}
                  onChange={(e) => setSymbols(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm text-foreground">Symbols (!@#$...)</span>
              </label>
            </div>

            <button
              onClick={generatePassword}
              className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
            >
              Generate
            </button>
          </ToolCard>
        </div>

        {/* Output */}
        <div className="lg:col-span-2 space-y-4">
          {password && (
            <>
              {/* Password Display */}
              <ToolCard>
                <div className="relative">
                  <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg p-6 text-white break-all font-mono text-lg min-h-24 flex items-center">
                    {password}
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="absolute top-2 right-2 p-2 bg-white/20 hover:bg-white/30 text-white rounded transition"
                  >
                    <Copy size={18} />
                  </button>
                </div>
              </ToolCard>

              {/* Strength */}
              {strength && (
                <ToolCard>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Strength</p>
                      <p className={`font-bold text-lg ${strengthStyles[strength.color].text}`}>
                        {strength.level}
                      </p>
                    </div>
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center ${strengthStyles[strength.color].badgeBg}`}
                    >
                      <div className={`w-12 h-12 rounded-full border-4 ${strengthStyles[strength.color].badgeBorder}`} />
                    </div>
                  </div>
                </ToolCard>
              )}

              {/* Statistics */}
              <ToolCard title="Character Analysis">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Uppercase</span>
                    <span className="font-mono font-bold text-gray-900 dark:text-gray-100">
                      {(password.match(/[A-Z]/g) || []).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Lowercase</span>
                    <span className="font-mono font-bold text-gray-900 dark:text-gray-100">
                      {(password.match(/[a-z]/g) || []).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Numbers</span>
                    <span className="font-mono font-bold text-gray-900 dark:text-gray-100">
                      {(password.match(/[0-9]/g) || []).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Symbols</span>
                    <span className="font-mono font-bold text-gray-900 dark:text-gray-100">
                      {(password.match(/[^a-zA-Z0-9]/g) || []).length}
                    </span>
                  </div>
                </div>
              </ToolCard>

              <ToolCard title="Tips">
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• Use at least 12 characters</li>
                  <li>• Mix uppercase and lowercase</li>
                  <li>• Include numbers and symbols</li>
                  <li>• Avoid common words</li>
                  <li>• Never reuse passwords</li>
                </ul>
              </ToolCard>
            </>
          )}
        </div>
      </div>
    </ToolTemplate>
  );
}
