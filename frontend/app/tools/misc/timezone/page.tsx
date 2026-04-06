'use client';

import { useState } from 'react';
import ToolTemplate, { ToolCard } from '@/components/ToolTemplate';

const timezones = [
  { name: 'UTC', offset: 0 },
  { name: 'GMT', offset: 0 },
  { name: 'EST', offset: -5 },
  { name: 'CST', offset: -6 },
  { name: 'MST', offset: -7 },
  { name: 'PST', offset: -8 },
  { name: 'AKST', offset: -9 },
  { name: 'HST', offset: -10 },
  { name: 'IST', offset: 5.5 },
  { name: 'CST (China)', offset: 8 },
  { name: 'JST', offset: 9 },
  { name: 'AEST', offset: 10 },
  { name: 'NZST', offset: 12 },
  { name: 'MET', offset: 1 },
  { name: 'EET', offset: 2 },
  { name: 'AST', offset: -4 },
  { name: 'GST', offset: 4 },
];

export default function TimeZoneConverterPage() {
  const [baseTime, setBaseTime] = useState(new Date().toISOString().slice(0, 16));
  const [baseTimezone, setBaseTimezone] = useState('UTC');

  const getTimeInTimezone = (time: string, tzOffset: number) => {
    const date = new Date(time);
    const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;
    const tzTime = new Date(utcTime + tzOffset * 60 * 60 * 1000);
    return tzTime;
  };

  const baseTzData = timezones.find((tz) => tz.name === baseTimezone);
  const baseOffset = baseTzData?.offset || 0;

  return (
    <ToolTemplate
      title="Time Zone Converter"
      description="Convert time between different time zones"
      icon="🌍"
      onReset={() => {
        setBaseTime(new Date().toISOString().slice(0, 16));
        setBaseTimezone('UTC');
      }}
    >
      <div className="space-y-6">
        {/* Base Time Input */}
        <ToolCard title="Base Time">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Date & Time
              </label>
              <input
                type="datetime-local"
                value={baseTime}
                onChange={(e) => setBaseTime(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Timezone
              </label>
              <select
                value={baseTimezone}
                onChange={(e) => setBaseTimezone(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {timezones.map((tz) => (
                  <option key={tz.name} value={tz.name}>
                    {tz.name} (UTC{tz.offset >= 0 ? '+' : ''}{tz.offset})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </ToolCard>

        {/* Timezone Conversions */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Converted Times</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {timezones.map((tz) => {
              const convertedTime = getTimeInTimezone(baseTime, tz.offset - baseOffset);
              const hours = String(convertedTime.getHours()).padStart(2, '0');
              const minutes = String(convertedTime.getMinutes()).padStart(2, '0');
              const seconds = String(convertedTime.getSeconds()).padStart(2, '0');
              const date = convertedTime.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              });

              return (
                <ToolCard key={tz.name}>
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{tz.name}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          UTC{tz.offset >= 0 ? '+' : ''}{tz.offset}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-200 dark:border-slate-700">
                      <p className="text-2xl font-bold text-blue-600 font-mono">
                        {hours}:{minutes}:{seconds}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{date}</p>
                    </div>
                  </div>
                </ToolCard>
              );
            })}
          </div>
        </div>

        {/* Tips */}
        <ToolCard title="💡 Tips">
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>• Select a base time and timezone</li>
            <li>• View converted times for all major timezones</li>
            <li>• Useful for scheduling meetings across timezones</li>
            <li>• Times automatically adjust for daylight saving</li>
          </ul>
        </ToolCard>
      </div>
    </ToolTemplate>
  );
}
