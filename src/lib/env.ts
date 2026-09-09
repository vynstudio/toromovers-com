/** Request-time env. Bracket access so Next does not bake empty values into the function. */
export function runtimeEnv(...names: string[]): string {
  for (const name of names) {
    const value = process.env[name];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
}
