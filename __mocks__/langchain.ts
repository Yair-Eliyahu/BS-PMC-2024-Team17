// __mocks__/langchain.ts
import { ChatOpenAI } from "@langchain/openai";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

export const mockedChatOpenAI = jest.fn().mockImplementation(() => ({
  bind: jest.fn().mockReturnThis(),
  pipe: jest.fn().mockReturnThis(),
  invoke: jest.fn().mockResolvedValue({ quizz: {} }),
}));

export const mockedPDFLoader = jest.fn().mockImplementation(() => ({
  load: jest.fn().mockResolvedValue([]),
}));

export { mockedChatOpenAI as ChatOpenAI, mockedPDFLoader as PDFLoader };
