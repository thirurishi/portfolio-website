'use client';

import { Button, Input, Textarea } from '@/components/ui';

export function ContactForm() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input name="name" placeholder="Name" />
        <Input name="email" type="email" placeholder="Email" />
      </div>
      <Input name="subject" placeholder="Subject" />
      <Textarea name="message" placeholder="How can I help you?" />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-7 text-slate-400">
          Ideal for internship conversations, analytics collaborations, or AI product engagements.
        </p>
        <Button type="submit" variant="default" size="lg" className="w-full sm:w-auto">
          Send message
        </Button>
      </div>
    </form>
  );
}