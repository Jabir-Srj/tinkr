'use client';

import { useState } from 'react';
import { Copy } from 'lucide-react';
import { LegacyToolWrapper } from '@/components/LegacyToolWrapper';

export default function MatrixCalculator() {
  const [matrixA, setMatrixA] = useState('1,2\n3,4');
  const [matrixB, setMatrixB] = useState('5,6\n7,8');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const parseMatrix = (str: string) => {
    const lines = str.trim().split('\n');
    return lines.map((line) => line.split(',').map((val) => parseFloat(val.trim())));
  };

  const formatMatrix = (matrix: number[][]) => {
    return matrix.map((row) => row.map((val) => val.toFixed(4).replace(/\.?0+$/, '')).join(', ')).join('\n');
  };

  const matrixAdd = (a: number[][], b: number[][]) => {
    if (a.length !== b.length || a[0].length !== b[0].length) throw new Error('Matrices must have same dimensions');
    return a.map((row, i) => row.map((val, j) => val + b[i][j]));
  };

  const matrixSubtract = (a: number[][], b: number[][]) => {
    if (a.length !== b.length || a[0].length !== b[0].length) throw new Error('Matrices must have same dimensions');
    return a.map((row, i) => row.map((val, j) => val - b[i][j]));
  };

  const matrixMultiply = (a: number[][], b: number[][]) => {
    if (a[0].length !== b.length) throw new Error('Invalid matrix dimensions for multiplication');
    const result = Array(a.length)
      .fill(0)
      .map(() => Array(b[0].length).fill(0));
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < b[0].length; j++) {
        for (let k = 0; k < b.length; k++) {
          result[i][j] += a[i][k] * b[k][j];
        }
      }
    }
    return result;
  };

  const matrixTranspose = (a: number[][]) => {
    return a[0].map((_, i) => a.map((row) => row[i]));
  };

  const determinant = (a: number[][]): number => {
    if (a.length !== a[0].length) throw new Error('Matrix must be square');
    if (a.length === 1) return a[0][0];
    if (a.length === 2) return a[0][0] * a[1][1] - a[0][1] * a[1][0];

    let det = 0;
    for (let j = 0; j < a.length; j++) {
      const minor = a.slice(1).map((row) => [...row.slice(0, j), ...row.slice(j + 1)]);
      det += Math.pow(-1, j) * a[0][j] * determinant(minor);
    }
    return det;
  };

  const calculate = () => {
    try {
      setError('');
      const a = parseMatrix(matrixA);
      let res: number[] | number[][] | string = '';

      if (operation === 'transpose') {
        res = matrixTranspose(a);
      } else if (operation === 'determinant') {
        const det = determinant(a);
        res = det.toFixed(4).replace(/\.?0+$/, '');
      } else {
        const b = parseMatrix(matrixB);
        if (operation === 'add') res = matrixAdd(a, b);
        else if (operation === 'subtract') res = matrixSubtract(a, b);
        else if (operation === 'multiply') res = matrixMultiply(a, b);
      }

      const formatted = typeof res === 'string' ? res : formatMatrix(res as number[][]);
      setResult(formatted);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Calculation failed';
      setError(msg);
      setResult('');
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <LegacyToolWrapper>
      <div className="min-h-screen bg-background text-foreground p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">📐 Matrix Calculator</h1>
            <p className="text-muted-foreground">Perform matrix operations</p>
          </div>

          <div className="space-y-6 mb-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Operation</label>
              <select
                value={operation}
                onChange={(e) => setOperation(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg bg-secondary-bg text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              >
                <option value="add">Add</option>
                <option value="subtract">Subtract</option>
                <option value="multiply">Multiply</option>
                <option value="transpose">Transpose</option>
                <option value="determinant">Determinant</option>
              </select>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Matrix A</label>
                <textarea
                  value={matrixA}
                  onChange={(e) => setMatrixA(e.target.value)}
                  className="w-full h-40 p-4 border border-border rounded-lg bg-secondary-bg text-foreground font-mono text-sm resize-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                  placeholder="1,2&#10;3,4"
                />
              </div>
              {!['transpose', 'determinant'].includes(operation) && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Matrix B</label>
                  <textarea
                    value={matrixB}
                    onChange={(e) => setMatrixB(e.target.value)}
                    className="w-full h-40 p-4 border border-border rounded-lg bg-secondary-bg text-foreground font-mono text-sm resize-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                    placeholder="5,6&#10;7,8"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Result</label>
              <textarea
                value={result}
                readOnly
                className="w-full h-32 p-4 border border-border rounded-lg bg-secondary-bg text-foreground font-mono text-sm resize-none focus:outline-none"
                placeholder="Result will appear here..."
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={calculate}
              className="px-6 py-2 bg-accent text-white rounded-lg hover:opacity-90 transition font-medium"
            >
              Calculate
            </button>
            {result && (
              <button
                onClick={copy}
                className="px-4 py-2 border border-accent bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition flex items-center gap-2 font-medium"
              >
                <Copy size={16} /> Copy
              </button>
            )}
            <button
              onClick={() => {
                setMatrixA('');
                setMatrixB('');
                setResult('');
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
