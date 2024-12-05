import { randomUUID } from "crypto";

export function verificationGenerateCode() {
  const uuid = randomUUID();
  return uuid.split("-")[0];
}
