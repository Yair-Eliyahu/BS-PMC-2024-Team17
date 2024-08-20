import { sendMail } from '@/lib/mail';
import { POST } from '../../src/app/api/mail/route';
import { MockNextResponse } from '__mocks__/next';
import { NextRequest } from 'next/server';

jest.mock('@/lib/mail', () => ({
  sendMail: jest.fn(),
}));

const createMockRequest = (body: any) => {
  return {
    json: jest.fn().mockResolvedValue(body),
  } as unknown as NextRequest;
};

describe('POST /api/mail', () => {
  it('should send an email successfully and return a success message', async () => {
    (sendMail as jest.Mock).mockResolvedValueOnce(undefined); // Mock success

    const req = createMockRequest({
      name: 'John Doe',
      email: 'john.doe@example.com',
    });
    const res = MockNextResponse.json({ message: 'Email sent successfully' });

    await POST(req, res as any);

    expect(res.getStatusCode()).toBe(200);
    expect(res.getBody()).toEqual({ message: 'Email sent successfully' });
    expect(sendMail).toHaveBeenCalledWith({
      to: 'john.doe@example.com',
      name: 'John Doe',
      subject: "You're Invited to Sami Quizzer AI!",
      body: expect.stringContaining('Dear John Doe,'),
    });
  });

  it('should handle errors and return a failure message', async () => {
    (sendMail as jest.Mock).mockRejectedValueOnce(new Error('Failed to send email')); // Mock error

    const req = createMockRequest({
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
    });
    const res = MockNextResponse.json({ error: 'Failed to send email' }, { status: 500 });

    await POST(req, res as any);

    expect(res.getStatusCode()).toBe(500);
    expect(res.getBody()).toEqual({ error: 'Failed to send email' });
  });
});
