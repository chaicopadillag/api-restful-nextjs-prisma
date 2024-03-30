import { NextResponse } from 'next/server';

export async function GET(request: Request) {

  return new Response(JSON.stringify({
    message: 'Hello World'
  }), { status: 200 });
}


export async function POST(req: Request) {
  const { title } = await req.json();

  return NextResponse.json({ request: { title } }, { status: 201 });
}