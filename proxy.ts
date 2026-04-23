// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// const privateRoutes = ["/profile", "/notes"];
// const authRoutes = ["/sign-in", "/sign-up"];

// export function proxy(request: NextRequest) {
//   const token = request.cookies.get("token");
//   const { pathname } = request.nextUrl;

//   const isAuthenticated = Boolean(token);

//   if (
//     !isAuthenticated &&
//     privateRoutes.some((route) => pathname.startsWith(route))
//   ) {
//     return NextResponse.redirect(new URL("/sign-in", request.url));
//   }

//   if (
//     isAuthenticated &&
//     authRoutes.some((route) => pathname.startsWith(route))
//   ) {
//     return NextResponse.redirect(new URL("/profile", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
// };

import { NextRequest, NextResponse } from "next/server";
import { checkSession } from "./lib/api/serverApi";

// Маршруты согласно твоему ТЗ
const privateRoutes = ["/profile", "/notes"];
const authRoutes = ["/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // В твоем проекте кука называется "token"
  const token = request.cookies.get("token")?.value;

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // 1. Если токена нет, но мы пытаемся зайти на приватный роут
  if (!token && isPrivateRoute) {
    const signInUrl = new URL("/sign-in", request.url);
    return NextResponse.redirect(signInUrl);
  }

  // 2. Если токен есть, проверяем его валидность через сервер (SSR проверка)
  // Это заменяет сложную логику друга с Refresh-токенами, так как у тебя их нет
  if (token) {
    try {
      // Пытаемся получить сессию на сервере
      const user = await checkSession();

      // Если мы залогинены и пытаемся зайти на страницы логина/регистрации
      if (user && isAuthRoute) {
        return NextResponse.redirect(new URL("/profile", request.url));
      }
    } catch  {
      // Если сервер ответил ошибкой (токен протух), удаляем куку и кидаем на логин
      if (isPrivateRoute) {
        const response = NextResponse.redirect(
          new URL("/sign-in", request.url),
        );
        response.cookies.delete("token");
        return response;
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  // Маски маршрутов для обработки
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};