function preflight(vars) {
  console.log("[🛫 Preflight checks running]");
  if (process.env.CI === "true") {
    console.log("[🛫 Preflight CI detected... skipping preflight checks");
    return;
  }
  vars.forEach(function (variable) {
    if (!process.env[variable]) {
      throw new Error(
        `[🔥🛬🔥 Preflight] failed, missing environment variable: ${variable}`
      );
    }
  });
}

module.exports = preflight;
