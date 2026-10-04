import { Context } from '@vega/provider';

export async function getCatalog(ctx: Context, page: number = 1) {
    const baseUrl = `https://hdhub4u.ms/page/${page}/`;
    const response = await ctx.fetch(baseUrl);
    const html = await response.text();
    const $ = ctx.cheerio.load(html);

    const items: any[] = [];

    $('.post-cards article').each((_, el) => {
        const title = $(el).find('.entry-title').text().trim();
        const link = $(el).find('a').attr('href');
        const poster = $(el).find('img').attr('src');

        if (link) {
            items.push({
                id: link,
                title: title,
                poster: poster,
                url: link
            });
        }
    });

    return items;
}
