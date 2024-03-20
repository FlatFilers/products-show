/** @type {import('next').NextConfig} */
const nextConfig = {};

import preflight from "./preflight.js";

preflight(["DATABASE_URL", "NEXTAUTH_SECRET"]);

export default nextConfig;
