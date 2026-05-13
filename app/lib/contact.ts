export const WA_NUMBER = "94758868067";

export function waHref(message: string) {
  const params = new URLSearchParams({ text: message });
  return `https://wa.me/${WA_NUMBER}?${params.toString()}`;
}
