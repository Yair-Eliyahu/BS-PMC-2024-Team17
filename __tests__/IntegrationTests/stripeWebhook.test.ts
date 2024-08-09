import { POST } from "@/app/api/stripe/webhook/route";
import { stripe } from "@/lib/stripe";
import { createSubscription, deleteSubscription } from "@/app/actions/userSubscription";

// Mock the stripe and subscription functions
jest.mock("@/lib/stripe", () => ({
  stripe: {
    webhooks: {
      constructEvent: jest.fn(),
    }
  }
}));

jest.mock("@/app/actions/userSubscription", () => ({
  createSubscription: jest.fn(),
  deleteSubscription: jest.fn(),
}));

describe('POST /api/stripe/webhook', () => {
  let mockReq: any;
  let mockRes: any;

  beforeEach(() => {
    // Create mock request and response objects
    mockReq = {
      text: jest.fn(),
      headers: {
        get: jest.fn()
      }
    };
    
    mockRes = {
      statusCode: 200,
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
  });

  it('should handle customer.subscription.created event', async () => {
    const event = {
      type: "customer.subscription.created",
      data: {
        object: {
          customer: "cus_123",
        }
      }
    };

    // Mock the Stripe method
    (stripe.webhooks.constructEvent as jest.Mock).mockReturnValue(event);

    // Mock functions
    (createSubscription as jest.Mock).mockResolvedValue({});

    // Set up mock request and response
    mockReq.text.mockResolvedValue(JSON.stringify(event));
    mockReq.headers.get.mockReturnValue('mocked_signature');

    await POST(mockReq as any, mockRes as any);

    expect(createSubscription).toHaveBeenCalledWith({
      stripeCustomerID: "cus_123",
    });
    expect(deleteSubscription).not.toHaveBeenCalled();
    expect(mockRes.statusCode).toBe(200);
  });

  it('should handle customer.subscription.deleted event', async () => {
    const event = {
      type: "customer.subscription.deleted",
      data: {
        object: {
          customer: "cus_123",
        }
      }
    };

    // Mock the Stripe method
    (stripe.webhooks.constructEvent as jest.Mock).mockReturnValue(event);

    // Mock functions
    (deleteSubscription as jest.Mock).mockResolvedValue({});

    // Set up mock request and response
    mockReq.text.mockResolvedValue(JSON.stringify(event));
    mockReq.headers.get.mockReturnValue('mocked_signature');

    await POST(mockReq as any, mockRes as any);

    expect(deleteSubscription).toHaveBeenCalledWith({
      stripeCustomerID: "cus_123",
    });
    expect(createSubscription).not.toHaveBeenCalled();
    expect(mockRes.statusCode).toBe(200);
  });

});
