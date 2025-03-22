import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  // This is a simplified middleware for demo purposes
  // In a production app, you would use Supabase Auth properly

  // For now, we'll just check if the path starts with /admin/dashboard
  // and redirect to login if not authenticated
  if (request.nextUrl.pathname.startsWith("/admin/dashboard")) {
    // In a real app, you would check the session here
    // For demo purposes, we'll just allow access
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}

