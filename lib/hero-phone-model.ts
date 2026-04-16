/**
 * Online GLB used in the hero (iPhone-style scene).
 * Override with `NEXT_PUBLIC_HERO_PHONE_MODEL_URL` (any HTTPS .glb URL).
 * Default: public tutorial asset — replace for production if you prefer self-hosted.
 */
export const HERO_PHONE_MODEL_URL =
  process.env.NEXT_PUBLIC_HERO_PHONE_MODEL_URL?.trim() ||
  "https://raw.githubusercontent.com/satyazzz123/3-d-website-for-iphone14/main/public/scene.glb";
