import { NextRequest, NextResponse } from "next/server";
import { checkSessionServer } from "./lib/api/serverApi";

const privateRoutes = ["/profile", "/notes", "/notes/filter"];
const publicRoutes = ["/sign-in", "/sign-up"];

type CookieOptions = {
  path?: string;
  expires?: Date;
  maxAge?: number;
};

function parseSetCookie(cookieStr: string) {
  const parts = cookieStr.split(";").map((p) => p.trim());
  const [nameValue, ...attrs] = parts;
  const [name, value] = nameValue.split("=");
  const options: CookieOptions = {};
  for (const attr of attrs) {
    const [keyRaw, val] = attr.split("=");
    const key = keyRaw.toLowerCase();
    if (key === "path") {
      options.path = val || "/";
    }
    if (key === "expires" && val) {
      const date = new Date(val);
      if (!isNaN(date.getTime())) {
        options.expires = date;
      }
    }
    if (key === "max-age" && val) {
      const maxAge = Number(val);
      if (!isNaN(maxAge)) {
        options.maxAge = maxAge;
      }
    }
  }
  return { name, value, options };
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );
  if (!accessToken && refreshToken) {
    const data = await checkSessionServer();
    const setCookie = data.headers["set-cookie"];
    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
      const response = isPublicRoute
        ? NextResponse.redirect(new URL("/", request.url))
        : NextResponse.next();
      for (const cookieStr of cookieArray) {
        const { name, value, options } = parseSetCookie(cookieStr);
        if (!name || !value) continue;
        response.cookies.set(name, value, {
          path: options.path ?? "/",
          expires: options.expires,
          maxAge: options.maxAge,
        });
      }
      return response;
    }
  }
  if (!accessToken) {
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    return NextResponse.next();
  }
  if (isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/sign-in", "/sign-up", "/notes/:path*"],
};
