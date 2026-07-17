/**
 * Next's `basePath` config auto-prefixes next/link, next/image, and its own
 * managed assets — but NOT hardcoded strings pointing at files in public/
 * (e.g. a <video src="/videos/hero.mp4">). Those need manual prefixing so
 * they still resolve once the app is served from a subpath like
 * /D-site/cinematic/ instead of /.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string) {
  return `${BASE_PATH}${path}`;
}
