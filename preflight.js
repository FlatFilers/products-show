VARS = [
  "DATABASE_URL",
  "NEXTAUTH_SECRET",
  "FLATFILE_NAMESPACE",
  "FLATFILE_API_KEY",
  "FLATFILE_ENVIRONMENT_ID",
];

function preflight() {
  console.log("[🛫 Preflight checks running]");
  if (process.env.CI === "true") {
    console.log("[🛫 Preflight CI detected... skipping preflight checks");
    return;
  }
  VARS.forEach(function (variable) {
    if (!process.env[variable]) {
      throw new Error(
        `[🔥🛬🔥 Preflight] failed, missing environment variable: ${variable}`
      );
    }
  });
}

module.exports = preflight;
