'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, ToolCard } from '@/components/ToolTemplate';
import { Copy } from 'lucide-react';

export default function VCardGeneratorPage() {
  const [fullName, setFullName] = useState('John Doe');
  const [phone, setPhone] = useState('+1-234-567-8900');
  const [email, setEmail] = useState('john@example.com');
  const [org, setOrg] = useState('Acme Corp');
  const [url, setUrl] = useState('https://johndoe.com');
  const [address, setAddress] = useState('123 Main St, City, Country');

  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${fullName}
TEL:${phone}
EMAIL:${email}
ORG:${org}
URL:${url}
ADR:;;${address}
END:VCARD`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadVCard = () => {
    const element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/vcard;charset=utf-8,' + encodeURIComponent(vcard)
    );
    element.setAttribute('download', `${fullName.replace(/\s/g, '_')}.vcf`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <ToolTemplate
      title="vCard Generator"
      description="Generate contact cards"
      icon="📇"
      onReset={() => {
        setFullName('John Doe');
        setPhone('+1-234-567-8900');
        setEmail('john@example.com');
        setOrg('Acme Corp');
        setUrl('https://johndoe.com');
        setAddress('123 Main St, City, Country');
      }}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="space-y-4">
          <ToolCard title="Contact Information">
            <InputGroup label="Full Name">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100"
              />
            </InputGroup>

            <InputGroup label="Phone">
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100"
              />
            </InputGroup>

            <InputGroup label="Email">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100"
              />
            </InputGroup>

            <InputGroup label="Organization">
              <input
                type="text"
                value={org}
                onChange={(e) => setOrg(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100"
              />
            </InputGroup>

            <InputGroup label="Website">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100"
              />
            </InputGroup>

            <InputGroup label="Address">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100"
              />
            </InputGroup>
          </ToolCard>
        </div>

        {/* Output */}
        <div className="space-y-4">
          <ToolCard title="vCard Code">
            <div className="relative">
              <textarea
                value={vcard}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100 resize-none h-64 font-mono text-xs"
              />
              <button
                onClick={() => copyToClipboard(vcard)}
                className="absolute top-2 right-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
              >
                <Copy size={16} />
              </button>
            </div>
          </ToolCard>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={downloadVCard}
              className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-semibold"
            >
              Download .vcf
            </button>
            <button
              onClick={() => copyToClipboard(vcard)}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-semibold"
            >
              Copy Code
            </button>
          </div>
        </div>
      </div>
    </ToolTemplate>
  );
}
