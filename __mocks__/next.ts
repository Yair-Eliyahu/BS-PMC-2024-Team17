// __mocks__/next.ts
export class MockNextResponse {
    private statusCode: number = 200;
    private body: any;
  
    static json(body: any, options?: { status?: number }) {
      const instance = new MockNextResponse();
      instance.body = body;
      if (options?.status) {
        instance.statusCode = options.status;
      }
      return instance;
    }
  
    getStatusCode() {
      return this.statusCode;
    }
  
    getBody() {
      return this.body;
    }
  }
  
  jest.mock('next/server', () => ({
    NextResponse: MockNextResponse,
  }));
  