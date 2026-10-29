'use client';

import { useState } from 'react';
import { Button, Input, Textarea } from '@/components/ui';

type Status = 'idle' | 'sending' | 'sent' | 'error';

// Submissions are handled by Netlify Forms. The matching static form that
// Netlify detects at deploy time lives in public/__forms.html.
const FORM_NAME = 'contact';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus('sending');

    try {
      const data = new FormData(form);
      const body = new URLSearchParams(data as unknown as Record<string, string>).toString();
      const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <form name={FORM_NAME} className="space-y-4" onSubmit={handleSubmit}>
      <input type="hidden" name="form-name" value={FORM_NAME} />
      <p className="hidden">
        <label>
          Leave this empty: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input name="name" placeholder="Name" required aria-label="Name" />
        <Input name="email" type="email" placeholder="Email" required aria-label="Email" />
      </div>
      <Input name="subject" placeholder="Subject (e.g. Data Science Intern, Company)" aria-label="Subject" />
      <Textarea name="message" placeholder="Tell me about the role or project" required aria-label="Message" />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-7 text-slate-400" role="status" aria-live="polite">
          {status === 'sent' && 'Thanks, your message has been sent. I’ll get back to you soon.'}
          {status === 'error' && 'Something went wrong. Please email me directly at rishithiru1998@gmail.com.'}
          {(status === 'idle' || status === 'sending') && 'For internship opportunities, interviews or project questions.'}
        </p>
        <Button
          type="submit"
          variant="default"
          size="lg"
          className="w-full sm:w-auto"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </Button>
      </div>
    </form>
  );
}
