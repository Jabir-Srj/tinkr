'use client';

import { useState } from 'react';
import { Copy } from 'lucide-react';
import { LegacyToolWrapper } from '@/components/LegacyToolWrapper';

export default function HttpCodes() {
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState(false);

  const codes: Record<string, { code: number; name: string; description: string; category: string }> = {
    '200': { code: 200, name: 'OK', description: 'The request was successful', category: '2xx' },
    '201': { code: 201, name: 'Created', description: 'Resource created successfully', category: '2xx' },
    '204': { code: 204, name: 'No Content', description: 'Success but no content to return', category: '2xx' },
    '301': { code: 301, name: 'Moved Permanently', description: 'Resource moved permanently', category: '3xx' },
    '302': { code: 302, name: 'Found', description: 'Temporary redirect', category: '3xx' },
    '304': { code: 304, name: 'Not Modified', description: 'Resource not modified since last request', category: '3xx' },
    '400': { code: 400, name: 'Bad Request', description: 'Invalid request syntax', category: '4xx' },
    '401': { code: 401, name: 'Unauthorized', description: 'Authentication required', category: '4xx' },
    '403': { code: 403, name: 'Forbidden', description: 'Access denied', category: '4xx' },
    '404': { code: 404, name: 'Not Found', description: 'Resource not found', category: '4xx' },
    '409': { code: 409, name: 'Conflict', description: 'Request conflicts with server state', category: '4xx' },
    '429': { code: 429, name: 'Too Many Requests', description: 'Rate limit exceeded', category: '4xx' },
    '500': { code: 500, name: 'Internal Server Error', description: 'Server error occurred', category: '5xx' },
    '501': { code: 501, name: 'Not Implemented', description: 'Feature not implemented', category: '5xx' },
    '502': { code: 502, name: 'Bad Gateway', description: 'Invalid response from upstream server', category: '5xx' },
    '503': { code: 503, name: 'Service Unavailable', description: 'Server temporarily unavailable', category: '5xx' },
    '504': { code: 504, name: 'Gateway Timeout', description: 'Upstream server timeout', category: '5xx' },
  };

  const filteredCodes = Object.values(codes).filter((item) => {
    const query = search.toLowerCase();
    return (
      item.code.toString().includes(query) ||
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    );
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case '2xx':
        return 'bg-green-500/10 border-green-500/30 text-green-400';
      case '3xx':
        return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
      case '4xx':
        return 'bg-orange-500/10 border-orange-500/30 text-orange-400';
      case '5xx':
        return 'bg-red-500/10 border-red-500/30 text-red-400';
      default:
        return 'bg-border';
    }
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <LegacyToolWrapper>
      <div className="min-h-screen bg-background text-foreground p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">🔗 HTTP Status Codes</h1>
            <p className="text-muted-foreground">Browse and search HTTP status code reference</p>
          </div>

          <div className="space-y-6 mb-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Search</label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg bg-secondary-bg text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                placeholder="Search by code, name, or description..."
              />
            </div>

            <div className="space-y-3">
              {filteredCodes.map((item) => (
                <div
                  key={item.code}
                  className={`p-4 border rounded-lg ${getCategoryColor(item.category)}`}
                >
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <div>
                      <div className="font-mono font-bold text-lg">{item.code}</div>
                      <div className="font-medium">{item.name}</div>
                    </div>
                    <button
                      onClick={() => copy(`${item.code} ${item.name}`)}
                      className="flex-shrink-0 p-2 hover:bg-white/10 rounded transition"
                      title="Copy code"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                  <p className="text-sm opacity-90">{item.description}</p>
                </div>
              ))}
            </div>

            {filteredCodes.length === 0 && (
              <div className="p-8 text-center text-muted-foreground border border-border rounded-lg bg-secondary-bg">
                No status codes found matching "{search}"
              </div>
            )}
          </div>
        </div>
      </div>
    </LegacyToolWrapper>
  );
}
