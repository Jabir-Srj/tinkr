'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { LegacyToolWrapper } from '@/components/LegacyToolWrapper';

export default function ScientificCalculator() {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const handleNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperation = (op: string) => {
    const currentValue = parseFloat(display);
    
    if (prevValue === null) {
      setPrevValue(currentValue);
    } else if (operation) {
      const result = calculate(prevValue, currentValue, operation);
      setDisplay(String(result));
      setPrevValue(result);
    }
    
    setOperation(op);
    setWaitingForNewValue(true);
  };

  const calculate = (prev: number, current: number, op: string): number => {
    switch (op) {
      case '+': return prev + current;
      case '-': return prev - current;
      case '*': return prev * current;
      case '/': return prev / current;
      case 'pow': return Math.pow(prev, current);
      default: return current;
    }
  };

  const handleScientific = (func: string) => {
    const value = parseFloat(display);
    let result: number;

    switch (func) {
      case 'sin': result = Math.sin(value * (Math.PI / 180)); break;
      case 'cos': result = Math.cos(value * (Math.PI / 180)); break;
      case 'tan': result = Math.tan(value * (Math.PI / 180)); break;
      case 'sqrt': result = Math.sqrt(value); break;
      case 'log': result = Math.log10(value); break;
      case 'ln': result = Math.log(value); break;
      case 'factorial': result = factorial(Math.floor(value)); break;
      case 'abs': result = Math.abs(value); break;
      default: result = value;
    }

    setDisplay(String(result.toFixed(10)));
    setWaitingForNewValue(true);
  };

  const factorial = (n: number): number => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
  };

  const handleEquals = () => {
    if (operation && prevValue !== null) {
      const result = calculate(prevValue, parseFloat(display), operation);
      setDisplay(String(result));
      setPrevValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  return (
    <LegacyToolWrapper>
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-md mx-auto">
          <div className="border border-border p-6 bg-secondary-bg rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <span className="text-3xl">🧮</span> Scientific Calculator
            </h1>

            {/* Display */}
            <div className="bg-secondary-bg border border-border rounded p-4 mb-6">
              <div className="text-right text-3xl font-mono text-foreground break-words font-semibold">
                {display}
              </div>
            </div>

            {/* Scientific Functions */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {['sin', 'cos', 'tan', 'sqrt', 'log', 'ln', 'abs', '!'].map((func, i) => (
                <button
                  key={func}
                  onClick={() => handleScientific(['sin', 'cos', 'tan', 'sqrt', 'log', 'ln', 'abs', 'factorial'][i])}
                  className="bg-accent/10 hover:bg-accent/20 text-accent font-mono p-2 rounded border border-accent/30 transition text-sm font-semibold"
                >
                  {func}
                </button>
              ))}
            </div>

            {/* Main Calculator */}
            <div className="grid grid-cols-4 gap-2">
              {/* Row 1 */}
              <button
                onClick={handleClear}
                className="col-span-2 bg-red-500/20 hover:bg-red-500/30 text-red-500 font-bold p-4 rounded border border-red-500/30 transition"
              >
                C
              </button>
              <button
                onClick={() => handleOperation('/')}
                className="bg-accent/20 hover:bg-accent/30 text-accent font-bold p-4 rounded border border-accent/30 transition"
              >
                ÷
              </button>
              <button
                onClick={() => handleOperation('*')}
                className="bg-accent/20 hover:bg-accent/30 text-accent font-bold p-4 rounded border border-accent/30 transition"
              >
                ×
              </button>

              {/* Rows 2-4: Numbers */}
              {[['7', '8', '9', '-'], ['4', '5', '6', '+'], ['1', '2', '3', 'pow']].map((row, i) => (
                <div key={i} className="contents">
                  {row.map((btn, j) => (
                    <button
                      key={`${i}-${j}`}
                      onClick={() => {
                        if (['/', '*', '-', '+', 'pow'].includes(btn)) {
                          handleOperation(btn);
                        } else {
                          handleNumber(btn);
                        }
                      }}
                      className={`p-4 rounded border transition font-bold text-base ${
                        ['/', '*', '-', '+', 'pow'].includes(btn)
                          ? 'bg-accent/20 hover:bg-accent/30 text-accent border-accent/30'
                          : 'bg-border hover:bg-border/80 text-foreground border-border'
                      }`}
                    >
                      {btn}
                    </button>
                  ))}
                </div>
              ))}

              {/* Row 5 */}
              <button
                onClick={() => handleNumber('0')}
                className="col-span-2 bg-border hover:bg-border/80 text-foreground p-4 rounded border border-border font-bold transition"
              >
                0
              </button>
              <button
                onClick={() => setDisplay(display + '.')}
                className="bg-border hover:bg-border/80 text-foreground p-4 rounded border border-border font-bold transition"
              >
                .
              </button>
              <button
                onClick={handleEquals}
                className="bg-green-500/20 hover:bg-green-500/30 text-green-500 font-bold p-4 rounded border border-green-500/30 transition"
              >
                =
              </button>
            </div>
          </div>
        </div>
      </div>
    </LegacyToolWrapper>
  );
}
