export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/user/dashboard_user/:path*",
    // "/admin/dashboard_admin/:path*",
  ],
};
