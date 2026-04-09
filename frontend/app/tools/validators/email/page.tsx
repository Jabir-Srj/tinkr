'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, ToolCard } from '@/components/ToolTemplate';
import { Copy, CheckCircle, XCircle } from 'lucide-react';

export default function EmailValidatorPage() {
  const [email, setEmail] = useState('user@example.com');

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return regex.test(email);
  };

  const isValid = validateEmail(email);

  return (
    <ToolTemplate
      title="Email Validator"
      description="Validate email addresses format"
      icon="📧"
      onReset={() => {
        setEmail('user@example.com');
      }}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input */}
        <div className="lg:col-span-1">
          <ToolCard title="Email Input">
            <InputGroup label="Email Address">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address..."
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </InputGroup>
          </ToolCard>
        </div>

        {/* Status & Details */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {/* Validation Status */}
            {isValid ? (
              <ToolCard>
                <div className="flex gap-3 items-start">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-semibold text-green-900 dark:text-green-200">Valid Email</p>
                    <p className="text-sm text-green-800 dark:text-green-300">This email format is valid</p>
                  </div>
                </div>
              </ToolCard>
            ) : (
              <ToolCard>
                <div className="flex gap-3 items-start">
                  <XCircle className="text-red-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-semibold text-red-900 dark:text-red-200">Invalid Email</p>
                    <p className="text-sm text-red-800 dark:text-red-300">
                      This email format is invalid
                    </p>
                  </div>
                </div>
              </ToolCard>
            )}

            {/* Email Parts */}
            <ToolCard title="Email Components">
              {email.includes('@') ? (
                <div className="space-y-3">
                  {(() => {
                    const [local, domain] = email.split('@');
                    const [domainName, tld] = domain?.split('.').reverse() || [undefined, undefined];
                    return (
                      <>
                        <div className="p-3 bg-secondary-bg border border-border rounded">
                          <p className="text-xs text-muted-foreground mb-1">Local Part</p>
                          <p className="font-mono font-bold text-foreground break-all">
                            {local}
                          </p>
                        </div>
                        {domainName && (
                          <div className="p-3 bg-secondary-bg border border-border rounded">
                            <p className="text-xs text-muted-foreground mb-1">Domain</p>
                            <p className="font-mono font-bold text-foreground">
                              {domainName}
                            </p>
                          </div>
                        )}
                        {tld && (
                          <div className="p-3 bg-secondary-bg border border-border rounded">
                            <p className="text-xs text-muted-foreground mb-1">TLD</p>
                            <p className="font-mono font-bold text-foreground">
                              {tld}
                            </p>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Add @ to see components</p>
              )}
            </ToolCard>

            {/* Rules */}
            <ToolCard title="Validation Rules">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className={`flex items-center gap-2 ${email.includes('@') ? 'text-green-600' : ''}`}>
                  ✓ Must contain @
                </li>
                <li className={`flex items-center gap-2 ${email.includes('.') ? 'text-green-600' : ''}`}>
                  ✓ Must have domain
                </li>
                <li className={`flex items-center gap-2 ${!email.includes(' ') ? 'text-green-600' : ''}`}>
                  ✓ No spaces allowed
                </li>
                <li className={`flex items-center gap-2 ${email.split('@').length === 2 ? 'text-green-600' : ''}`}>
                  ✓ Only one @
                </li>
              </ul>
            </ToolCard>
          </div>
        </div>
      </div>
    </ToolTemplate>
  );
}
