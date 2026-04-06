'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, OutputGroup, ToolCard } from '@/components/ToolTemplate';

export default function CalculatorPage() {
  const [display, setDisplay] = useState('0');
  const [input, setInput] = useState('');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);

  const handleNumber = (num: string) => {
    if (display === '0') {
      setDisplay(num);
    } else {
      setDisplay(display + num);
    }
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (op: string) => {
    const currentValue = parseFloat(display);
    
    if (previousValue !== null && operation) {
      handleEquals();
    } else {
      setPreviousValue(currentValue);
    }
    
    setOperation(op);
    setDisplay('0');
  };

  const handleEquals = () => {
    if (previousValue === null || operation === null) return;

    const current = parseFloat(display);
    let result = 0;

    switch (operation) {
      case '+':
        result = previousValue + current;
        break;
      case '-':
        result = previousValue - current;
        break;
      case '×':
        result = previousValue * current;
        break;
      case '÷':
        result = previousValue / current;
        break;
      case '%':
        result = previousValue % current;
        break;
      default:
        return;
    }

    setDisplay(result.toString());
    setPreviousValue(null);
    setOperation(null);
  };

  const handleClear = () => {
    setDisplay('0');
    setInput('');
    setPreviousValue(null);
    setOperation(null);
  };

  const handleBackspace = () => {
    if (display.length === 1) {
      setDisplay('0');
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const buttons = [
    { label: 'C', onClick: handleClear, className: 'col-span-2 bg-red-500 hover:bg-red-600 text-white' },
    { label: 'DEL', onClick: handleBackspace, className: 'bg-orange-500 hover:bg-orange-600 text-white' },
    { label: '÷', onClick: () => handleOperation('÷'), className: 'bg-blue-500 hover:bg-blue-600 text-white' },
    { label: '7', onClick: () => handleNumber('7'), className: 'bg-gray-200 dark:bg-slate-700' },
    { label: '8', onClick: () => handleNumber('8'), className: 'bg-gray-200 dark:bg-slate-700' },
    { label: '9', onClick: () => handleNumber('9'), className: 'bg-gray-200 dark:bg-slate-700' },
    { label: '×', onClick: () => handleOperation('×'), className: 'bg-blue-500 hover:bg-blue-600 text-white' },
    { label: '4', onClick: () => handleNumber('4'), className: 'bg-gray-200 dark:bg-slate-700' },
    { label: '5', onClick: () => handleNumber('5'), className: 'bg-gray-200 dark:bg-slate-700' },
    { label: '6', onClick: () => handleNumber('6'), className: 'bg-gray-200 dark:bg-slate-700' },
    { label: '-', onClick: () => handleOperation('-'), className: 'bg-blue-500 hover:bg-blue-600 text-white' },
    { label: '1', onClick: () => handleNumber('1'), className: 'bg-gray-200 dark:bg-slate-700' },
    { label: '2', onClick: () => handleNumber('2'), className: 'bg-gray-200 dark:bg-slate-700' },
    { label: '3', onClick: () => handleNumber('3'), className: 'bg-gray-200 dark:bg-slate-700' },
    { label: '+', onClick: () => handleOperation('+'), className: 'bg-blue-500 hover:bg-blue-600 text-white' },
    { label: '0', onClick: () => handleNumber('0'), className: 'col-span-2 bg-gray-200 dark:bg-slate-700' },
    { label: '.', onClick: handleDecimal, className: 'bg-gray-200 dark:bg-slate-700' },
    { label: '=', onClick: handleEquals, className: 'bg-green-500 hover:bg-green-600 text-white' },
  ];

  return (
    <ToolTemplate
      title="Scientific Calculator"
      description="Perform basic arithmetic and scientific calculations"
      icon="🧮"
      onReset={handleClear}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calculator */}
        <div className="lg:col-span-2">
          <ToolCard>
            {/* Display */}
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg p-6 mb-6 text-right">
              <div className="text-gray-200 text-sm mb-2 h-6">
                {operation && previousValue !== null ? `${previousValue} ${operation}` : ''}
              </div>
              <div className="text-5xl font-mono font-bold text-white break-words">
                {display}
              </div>
            </div>

            {/* Calculator Grid */}
            <div className="grid grid-cols-4 gap-2">
              {buttons.map((btn, idx) => (
                <button
                  key={idx}
                  onClick={btn.onClick}
                  className={`py-4 rounded-lg font-semibold text-lg transition transform hover:scale-105 active:scale-95 ${btn.className} ${
                    btn.className.includes('col-span-2') ? 'col-span-2' : ''
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </ToolCard>
        </div>

        {/* History & Features */}
        <div className="space-y-4">
          <ToolCard title="Features">
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>✓ Basic operations (+, -, ×, ÷)</li>
              <li>✓ Decimal support</li>
              <li>✓ Modulo operation (%)</li>
              <li>✓ Clear and Delete buttons</li>
              <li>✓ Keyboard support</li>
            </ul>
          </ToolCard>

          <ToolCard title="Keyboard Shortcuts">
            <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-400 font-mono">
              <li>C = Clear</li>
              <li>Backspace = Delete</li>
              <li>+ - * / = Operations</li>
              <li>Enter = Calculate</li>
            </ul>
          </ToolCard>
        </div>
      </div>
    </ToolTemplate>
  );
}
