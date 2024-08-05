// src/app/api/mail/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sendMail } from '@/lib/mail';

export async function POST(request: NextRequest, p0: any) {
    const { name, email } = await request.json();

    try {
        await sendMail({
            to: email,
            name: name,
            subject: "You're Invited to Sami Quizzer AI!",
            body: generateEmailBody(name),
        });
        return NextResponse.json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}

const generateEmailBody = (name: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invitation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            background-image: url('cid:background');
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: rgba(255, 255, 255, 0.8);
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
        }
        .header img {
            max-width: 150px;
        }
        .header h1 {
            font-size: 24px;
            color: #333333;
        }
        .content {
            margin-top: 20px;
            text-align: center;
        }
        .content h2 {
            font-size: 20px;
            color: #333333;
        }
        .content p {
            font-size: 16px;
            color: #666666;
            line-height: 1.5;
        }
        .button {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
        }
        .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 14px;
            color: #999999;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <img src="https://github.com/Yair-Eliyahu/BS-PMC-2024-Team17/blob/GuyE/public/images/owl-icon-logo.png?raw=true" alt="Sami Quizzer AI Logo">
            <h1>Sami Quizzer AI</h1>
        </div>
        <div class="content">
            <h2>You're Invited!</h2>
            <p>Dear ${name},</p>
            <p>
                We are excited to invite you to explore Sami Quizzer AI, your new destination for generating and taking quizzes on any topic you desire. Our platform leverages advanced AI technology to provide an interactive and engaging learning experience.
            </p>
            <p>
                Click the button below to get started and create your first quiz today!
            </p>
            <a href="[Invitation Link]" class="button">Get Started</a>
        </div>
        <div class="footer">
            <p>&copy; 2024 Sami Quizzer AI. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
