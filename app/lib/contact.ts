export const WA_NUMBER = "94758868067";

/** Malinda MotionDev on Instagram (malinda.motiondev). */
export const INSTAGRAM_PROFILE =
  "https://www.instagram.com/malinda.motiondev/";

export function waHref(message: string) {
  const params = new URLSearchParams({ text: message });
  return `https://wa.me/${WA_NUMBER}?${params.toString()}`;
}
