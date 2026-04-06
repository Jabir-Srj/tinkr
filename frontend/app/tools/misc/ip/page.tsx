'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, ToolCard } from '@/components/ToolTemplate';
import { CheckCircle, XCircle } from 'lucide-react';

export default function IPValidatorPage() {
  const [ip, setIp] = useState('192.168.1.1');
  const [isValid, setIsValid] = useState(true);
  const [ipType, setIpType] = useState('IPv4');

  const validateIPv4 = (ip: string): boolean => {
    const parts = ip.split('.');
    if (parts.length !== 4) return false;
    return parts.every((part) => {
      const num = parseInt(part);
      return !isNaN(num) && num >= 0 && num <= 255;
    });
  };

  const getIPType = (ip: string) => {
    if (validateIPv4(ip)) {
      return 'IPv4';
    }
    return 'Invalid';
  };

  const handleChange = (value: string) => {
    setIp(value);
    const type = getIPType(value);
    setIpType(type);
    setIsValid(type !== 'Invalid');
  };

  const getIPDetails = () => {
    if (!validateIPv4(ip)) return null;

    const parts = ip.split('.').map(Number);
    const isPrivate =
      (parts[0] === 10) ||
      (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) ||
      (parts[0] === 192 && parts[1] === 168) ||
      (parts[0] === 127);

    const isLoopback = parts[0] === 127;
    const isBroadcast = ip === '255.255.255.255';

    return { isPrivate, isLoopback, isBroadcast, parts };
  };

  const details = getIPDetails();

  return (
    <ToolTemplate
      title="IP Address Validator"
      description="Validate and analyze IP addresses"
      icon="🌐"
      onReset={() => {
        setIp('192.168.1.1');
        setIsValid(true);
        setIpType('IPv4');
      }}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input */}
        <div className="lg:col-span-1">
          <ToolCard title="IP Input">
            <InputGroup label="IP Address">
              <input
                type="text"
                value={ip}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="e.g. 192.168.1.1"
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
              />
            </InputGroup>
          </ToolCard>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-4">
          {/* Status */}
          {isValid ? (
            <ToolCard>
              <div className="flex gap-3 items-start">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-green-900 dark:text-green-200">Valid {ipType}</p>
                  <p className="text-sm text-green-800 dark:text-green-300">This is a valid IP address</p>
                </div>
              </div>
            </ToolCard>
          ) : (
            <ToolCard>
              <div className="flex gap-3 items-start">
                <XCircle className="text-red-600 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-red-900 dark:text-red-200">Invalid IP Address</p>
                  <p className="text-sm text-red-800 dark:text-red-300">This is not a valid IP format</p>
                </div>
              </div>
            </ToolCard>
          )}

          {/* Details */}
          {details && (
            <>
              <ToolCard title="IP Breakdown">
                <div className="space-y-2">
                  {details.parts.map((part, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-100 dark:bg-slate-900 rounded">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Octet {idx + 1}</span>
                      <span className="font-mono font-bold text-gray-900 dark:text-gray-100">{part}</span>
                    </div>
                  ))}
                </div>
              </ToolCard>

              <ToolCard title="Properties">
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/30 rounded">
                    <span className="text-sm text-blue-700 dark:text-blue-300">Private</span>
                    <span className="font-bold text-blue-900 dark:text-blue-200">
                      {details.isPrivate ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/30 rounded">
                    <span className="text-sm text-purple-700 dark:text-purple-300">Loopback</span>
                    <span className="font-bold text-purple-900 dark:text-purple-200">
                      {details.isLoopback ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/30 rounded">
                    <span className="text-sm text-red-700 dark:text-red-300">Broadcast</span>
                    <span className="font-bold text-red-900 dark:text-red-200">
                      {details.isBroadcast ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </ToolCard>

              <ToolCard title="Common Private Ranges">
                <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-400 font-mono">
                  <li>• 10.0.0.0 - 10.255.255.255</li>
                  <li>• 172.16.0.0 - 172.31.255.255</li>
                  <li>• 192.168.0.0 - 192.168.255.255</li>
                  <li>• 127.0.0.0 - 127.255.255.255 (Loopback)</li>
                </ul>
              </ToolCard>
            </>
          )}
        </div>
      </div>
    </ToolTemplate>
  );
}
