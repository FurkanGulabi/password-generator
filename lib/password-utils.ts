const GUESSES_PER_SECOND = 1_000_000_000; // Assuming 1 billion guesses per second

export function calculateCrackTime(password: string): string {
  if (!password) return "0 seconds";

  let possibleChars = 0;
  if (/[a-z]/.test(password)) possibleChars += 26;
  if (/[A-Z]/.test(password)) possibleChars += 26;
  if (/[0-9]/.test(password)) possibleChars += 10;
  if (/[^A-Za-z0-9]/.test(password)) possibleChars += 33; // Common symbols

  const combinations = Math.pow(possibleChars, password.length);
  const seconds = combinations / GUESSES_PER_SECOND;

  if (seconds < 1) return "instantly";
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
  if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
  if (seconds < 31536000 * 100)
    return `${Math.round(seconds / 31536000)} years`;
  if (seconds < 31536000 * 1000)
    return `${Math.round(seconds / 31536000 / 100)} hundred years`;
  return "over 1000 years";
}
