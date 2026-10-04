import { Context } from '@vega/provider';

export async function getMeta(ctx: Context, url: string) {
    const response = await ctx.fetch(url);
    const html = await response.text();
    const $ = ctx.cheerio.load(html);

    const title = $('h1.entry-title').text().trim();
    const poster = $('.entry-content img').first().attr('src') || '';
    const description = $('.entry-content p').text().trim();

    return {
        id: url,
        title: title,
        poster: poster,
        description: description,
        type: 'movie',
    };
}
