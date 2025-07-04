import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });
    
    if (!token) {
      const url = new URL(`/`, req.url);
      return NextResponse.redirect(url);
    }
  } catch (error) {
    const url = new URL(`/`, req.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!^$|$|api|_next|favicon.ico|sitemap.xml|robots.txt|entrar|registro|termos-e-condicoes|esqueceu-senha|privacidade|images|fonts|videos|logo|icons|assets|static).*)",
  ],
};
  
  // "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|entrar|registro|termos-e-condicoes|esqueceu-senha|privacidade|images|fonts|videos|logo|icons|assets|static|$).*)",





