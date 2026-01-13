export const SUPPORTED = ['en', 'es'] as const
export type Lang = typeof SUPPORTED[number]

export function isLang(value: string | undefined | null): value is Lang {
  return !!value && (SUPPORTED as readonly string[]).includes(value)
}

// Helpers to build Astro getStaticPaths results
export function staticPathsForLang(): { params: { lang: Lang } }[] {
  return SUPPORTED.map((lang) => ({ params: { lang } }))
}

export async function staticPathsForSlugs<T extends { slug: string }>(
  fetchByLang: (lang: Lang) => Promise<T[]>
): Promise<{ params: { lang: Lang; slug: string } }[]> {
  const out: { params: { lang: Lang; slug: string } }[] = []
  for (const lang of SUPPORTED) {
    const items = await fetchByLang(lang)
    for (const it of items) out.push({ params: { lang, slug: it.slug } })
  }
  return out
}
