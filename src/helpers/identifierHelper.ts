export default function simplify(identifier: string): string {
  const parts = identifier.split(".");
  return parts[parts.length - 1];
}
