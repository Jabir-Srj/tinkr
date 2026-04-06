'use client';

import { useState } from 'react';
import { Copy, Download } from 'lucide-react';
import { LegacyToolWrapper } from '@/components/LegacyToolWrapper';

export default function XmlToJson() {
  const [input, setInput] = useState('<?xml version="1.0"?>\n<root>\n  <user id="1">\n    <name>John</name>\n    <email>john@example.com</email>\n  </user>\n</root>');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const xmlToJson = (xml: string) => {
    try {
      setError('');
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xml, 'text/xml');

      if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
        throw new Error('Invalid XML');
      }

      const convert = (node: any): any => {
        const obj: any = {};

        if (node.nodeType === 3) {
          return node.nodeValue?.trim();
        }

        if (node.attributes?.length > 0) {
          obj['@attributes'] = {};
          for (let i = 0; i < node.attributes.length; i++) {
            const attr = node.attributes[i];
            obj['@attributes'][attr.name] = attr.value;
          }
        }

        let hasChildren = false;
        for (let i = 0; i < node.childNodes.length; i++) {
          const child = node.childNodes[i];
          if (child.nodeType === 1 || child.nodeType === 3) {
            hasChildren = true;
            const childName = child.nodeName;
            const childValue = convert(child);

            if (childValue !== undefined && childValue !== '') {
              if (!obj[childName]) {
                obj[childName] = childValue;
              } else if (Array.isArray(obj[childName])) {
                obj[childName].push(childValue);
              } else {
                obj[childName] = [obj[childName], childValue];
              }
            }
          }
        }

        if (!hasChildren && Object.keys(obj).length === 0) {
          return node.textContent?.trim();
        }

        return Object.keys(obj).length === 0 ? undefined : obj;
      };

      const json = convert(xmlDoc.documentElement);
      return JSON.stringify(json, null, 2);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Conversion failed';
      setError(msg);
      return '';
    }
  };

  const handleConvert = () => {
    const result = xmlToJson(input);
    setOutput(result);
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const download = () => {
    const element = document.createElement('a');
    element.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(output);
    element.download = 'data.json';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <LegacyToolWrapper>
      <div className="min-h-screen bg-background text-foreground p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">🔄 XML to JSON</h1>
            <p className="text-muted-foreground">Convert XML to JSON format instantly</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">XML Input</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-64 p-4 border border-border rounded-lg bg-secondary-bg text-foreground font-mono text-sm resize-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                placeholder="Paste XML here..."
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">JSON Output</label>
              <textarea
                value={output}
                readOnly
                className="w-full h-64 p-4 border border-border rounded-lg bg-secondary-bg text-foreground font-mono text-sm resize-none focus:outline-none"
                placeholder="JSON output will appear here..."
              />
            </div>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              Error: {error}
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleConvert}
              className="px-6 py-2 bg-accent text-white rounded-lg hover:opacity-90 transition font-medium"
            >
              Convert
            </button>
            {output && (
              <>
                <button
                  onClick={copy}
                  className="px-4 py-2 border border-accent bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition flex items-center gap-2 font-medium"
                >
                  <Copy size={16} /> Copy
                </button>
                <button
                  onClick={download}
                  className="px-4 py-2 border border-border bg-secondary-bg text-foreground rounded-lg hover:bg-border transition flex items-center gap-2 font-medium"
                >
                  <Download size={16} /> Download
                </button>
              </>
            )}
            <button
              onClick={() => {
                setInput('');
                setOutput('');
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
