import { NextRequest, NextResponse } from 'next/server';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const limiter = new RateLimiterMemory({ points: 20, duration: 60 });

export async function middleware(req: NextRequest) {
  try {
    await limiter.consume(req.ip || 'anonymous');
    return NextResponse.next();
  } catch {
    return new NextResponse('Too Many Requests', { status: 429 });
  }
}

export const config = {
  matcher: ['/api/:path*'],
};