import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get language from cookie or default to 'en'
  const language = request.cookies.get('language')?.value || 'en';
  
  // Ensure language is valid
  const validLanguage = language === 'am' ? 'am' : 'en';
  
  // Set language cookie if not present or invalid
  if (language !== validLanguage) {
    const response = NextResponse.next();
    response.cookies.set('language', validLanguage, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax',
    });
    return response;
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

