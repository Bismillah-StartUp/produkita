import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  throw new Error(
    'Missing RESEND_API_KEY environment variable. ' +
      'Get your API key from https://resend.com/api-keys',
  );
}

export const resend = new Resend(resendApiKey);