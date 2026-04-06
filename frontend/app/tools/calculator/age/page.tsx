'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, ToolCard } from '@/components/ToolTemplate';

export default function AgeCalculatorPage() {
  const [birthDate, setBirthDate] = useState('2000-01-01');

  const calculateAge = () => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < today) {
      nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }
    const daysUntil = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    return { age, daysUntil };
  };

  const { age, daysUntil } = calculateAge();

  return (
    <ToolTemplate
      title="Age Calculator"
      description="Calculate age from birth date"
      icon="🎂"
      onReset={() => setBirthDate('2000-01-01')}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input */}
        <div className="lg:col-span-1">
          <ToolCard title="Birth Date">
            <InputGroup label="Select Date">
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100"
              />
            </InputGroup>
          </ToolCard>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-4">
          <ToolCard>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Current Age</p>
              <p className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {age}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">years old</p>
            </div>
          </ToolCard>

          <ToolCard title="Details">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-slate-900 rounded">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  Days Until Birthday
                </span>
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {daysUntil}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-slate-900 rounded">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  Birth Year
                </span>
                <span className="font-mono text-gray-900 dark:text-gray-100">
                  {new Date(birthDate).getFullYear()}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-slate-900 rounded">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  Days Lived
                </span>
                <span className="font-mono text-gray-900 dark:text-gray-100">
                  {Math.floor((new Date().getTime() - new Date(birthDate).getTime()) / (1000 * 60 * 60 * 24))}
                </span>
              </div>
            </div>
          </ToolCard>
        </div>
      </div>
    </ToolTemplate>
  );
}
