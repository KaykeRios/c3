
import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const isAuth = request.cookies.has("user")

  const protectedPaths = ["/dashboard", "/posts/new"]

  const url = request.nextUrl.clone()
  const isProtected = protectedPaths.some((path) => url.pathname.startsWith(path))

  if (isProtected && !isAuth) {
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard", "/posts/new"],
}
