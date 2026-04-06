'use client';

import { useState } from 'react';
import { Copy } from 'lucide-react';
import { LegacyToolWrapper } from '@/components/LegacyToolWrapper';

export default function DnsLookup() {
  const [domain, setDomain] = useState('example.com');
  const [results, setResults] = useState<Record<string, string>>({});
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const dnsRecords: Record<string, Record<string, string>> = {
    'example.com': {
      'A Record': '93.184.216.34',
      'AAAA Record': '2606:2800:220:1:248:1893:25c8:1946',
      'MX Record': '10 mail.example.com',
      'NS Record': 'a.iana-servers.net, b.iana-servers.net',
      'TXT Record': 'v=spf1 include:example.com ~all',
      'CNAME': 'N/A',
      'SOA': 'ns.example.com hostmaster.example.com',
    },
    'google.com': {
      'A Record': '142.251.32.46',
      'AAAA Record': '2607:f8b0:4004:80f::200e',
      'MX Record': '10 smtp.google.com',
      'NS Record': 'ns1.google.com, ns2.google.com, ns3.google.com, ns4.google.com',
      'TXT Record': 'v=spf1 include:_spf.google.com ~all',
      'CNAME': 'N/A',
    },
  };

  const lookup = () => {
    try {
      setError('');
      const normalizedDomain = domain.toLowerCase().trim();

      if (normalizedDomain === '' || !normalizedDomain.includes('.')) {
        throw new Error('Invalid domain format');
      }

      const mockRecords = dnsRecords[normalizedDomain] || {
        'A Record': '192.0.2.1 (Mock)',
        'AAAA Record': '2001:db8::1 (Mock)',
        'MX Record': '10 mail.' + normalizedDomain,
        'NS Record': 'ns1.' + normalizedDomain + ', ns2.' + normalizedDomain,
        'TXT Record': 'v=spf1 ~all',
        'CNAME': 'N/A',
        'SOA': 'ns1.' + normalizedDomain + ' postmaster@' + normalizedDomain,
      };

      setResults(mockRecords);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Lookup failed';
      setError(msg);
      setResults({});
    }
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      lookup();
    }
  };

  return (
    <LegacyToolWrapper>
      <div className="min-h-screen bg-background text-foreground p-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">🔍 DNS Lookup</h1>
            <p className="text-muted-foreground">Simulate DNS record lookups</p>
          </div>

          <div className="space-y-6 mb-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Domain</label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 border border-border rounded-lg bg-secondary-bg text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                placeholder="example.com"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            {Object.keys(results).length > 0 && (
              <div className="space-y-3">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">DNS Records</label>
                  <div className="border border-border rounded-lg bg-secondary-bg overflow-hidden">
                    {Object.entries(results).map(([recordType, value], idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-start gap-2 p-4 border-b border-border/30 last:border-b-0 hover:bg-border/50 transition"
                      >
                        <div>
                          <div className="text-sm font-medium text-muted-foreground">{recordType}</div>
                          <div className="text-sm font-mono mt-1 break-all">{value}</div>
                        </div>
                        <button
                          onClick={() => copy(value)}
                          className="flex-shrink-0 p-2 hover:text-accent transition"
                          title="Copy value"
                        >
                          <Copy size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 border border-border rounded-lg bg-secondary-bg text-sm text-muted-foreground">
                  <p>📌 Note: This tool shows simulated DNS records for demonstration purposes.</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={lookup}
              className="px-6 py-2 bg-accent text-white rounded-lg hover:opacity-90 transition font-medium"
            >
              Lookup
            </button>
            <button
              onClick={() => {
                setDomain('');
                setResults({});
                setError('');
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
