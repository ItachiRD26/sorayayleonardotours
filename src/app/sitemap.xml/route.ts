
export async function GET() {
  const baseUrl = "https://sorayayleonardotours.com";
  const locales = ["es", "en"];
  const now = new Date().toISOString();

  const urls = [
    {
      loc: `${baseUrl}/`,
      lastmod: now,
      changefreq: "weekly",
      priority: 1.0,
    },
    ...locales.map((locale) => ({
      loc: `${baseUrl}/${locale}`,
      lastmod: now,
      changefreq: "weekly",
      priority: 0.8,
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ loc, lastmod, changefreq, priority }) => `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join("")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
