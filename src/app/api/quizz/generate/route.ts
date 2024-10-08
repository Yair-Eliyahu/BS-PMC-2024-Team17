import { NextRequest, NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";
import saveQuizz from "./saveToDb";
import { auth } from "@/auth";
import { getUser } from "@/auth/server";


export async function POST(req: NextRequest) {
    const body = await req.formData();
    const document = body.get("pdf");

    if (!document || !(document instanceof Blob)) {
        return NextResponse.json({ error: "Invalid document upload" }, { status: 400 });
    }

    try {
        const pdfLoader = new PDFLoader(document, {
            parsedItemSeparator: " "
        });
        const docs = await pdfLoader.load();

        const selectedDocuments = docs.filter((doc) => doc.pageContent !== undefined);
        const texts = selectedDocuments.map((doc) => doc.pageContent);

        const prompt = `Given the text which is a summary of the document, generate a quiz (with at least 10 questions and 4 possible answer) based on the text, also mix the answers that they wont be at the same place each answer should have a different placement and cannot be the same as the previous one for example if question 1 had the correct answer on the first placement, question 2 cannot have the right answer on the first placement it must me at the second third or fourth and so on. 
        Return JSON only that contains a quiz object with fields: name, description, and questions. 
        The questions is an array of objects with fields: questionText, answers. 
        The answers is an array of objects with fields: answerText, isCorrect.`;

        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json({ error: "OpenAI API key not provided" }, { status: 500 });
        }

        const model = new ChatOpenAI({
            openAIApiKey: process.env.OPENAI_API_KEY,
            modelName: "gpt-4"
        });

        const parser = new JsonOutputFunctionsParser();
        const extractionFunctionSchema = {
            name: "extractor",
            description: "Extracts fields from the output",
            parameters: {
                type: "object",
                properties: {
                    quizz: {
                        type: "object",
                        properties: {
                            name: { type: "string" },
                            description: { type: "string" },
                            questions: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        questionText: { type: "string" },
                                        answers: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    answerText: { type: "string" },
                                                    isCorrect: { type: "boolean" },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        };

        const runnable = model.bind({
            functions: [extractionFunctionSchema],
            function_call: { name: "extractor" },
        }).pipe(parser);

        const message = new HumanMessage({
            content: [
              {
                type: "text",
                text: prompt + "\n" + texts.join("\n"),
              },
            ],
          });

        const result: any = await runnable.invoke([message]);
        console.log(JSON.stringify(result, null, 2));
        
        const session = await auth();
        const regsession = await getUser();
        if(session) {
            if (!session || !session.user) {
                return NextResponse.json({ error: "User is not authenticated" }, { status: 401 });
            }
            const userId:any = session.user.id;
            const { quizzId } = await saveQuizz(result.quizz, userId);
    
            return NextResponse.json(
                { quizzId }, 
                { status: 200 });
        } else if(regsession) {
            if (!regsession) {
                return NextResponse.json({ error: "User is not authenticated" }, { status: 401 });
            }
            const regUserId:any = regsession.id;
            const { quizzId } = await saveQuizz(result.quizz, regUserId);
    
            return NextResponse.json(
                { quizzId }, 
                { status: 200 });
        }

    } catch (e: any) {
        console.error(e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
