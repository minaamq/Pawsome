import { NextResponse } from 'next/server';

const token = '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';

export async function POST(request) {
    const { inputs } = await request.json();

    try {
        const response = await fetch(
            'https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image',
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({ inputs }),
            }
        );

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Failed to generate image.' },
                { status: response.status }
            );
        }

        const blob = await response.blob();
        return new Response(blob, {
            headers: { 'Content-Type': 'image/png' },
        });
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
