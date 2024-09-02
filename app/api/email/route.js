import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
// import Mail from 'nodemailer/lib/mailer';

export async function POST(request) {
    const { email, name, message } = await request.json();

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        cc: process.env.EMAIL2,
        subject: `Website message from ${name} (${email})`,
        text: message,
    };

    const sendMailPromise = () =>
        new Promise((resolve, reject) => {
            transport.sendMail(mailOptions, function (err) {
                if (!err) {
                    resolve('Email sent');
                } else {
                    reject(err.message);
                }
            });
        });

    try {
        await sendMailPromise();
        return NextResponse.json({ message: 'Email sent' }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 });
    }
}