import { Context } from '@vega/provider';

export async function getStreams(ctx: Context, url: string) {
    const response = await ctx.fetch(url);
    const html = await response.text();
    const $ = ctx.cheerio.load(html);

    const streams: any[] = [];

    $('a.maxbutton').each((_, el) => {
        const link = $(el).attr('href');
        const qualityText = $(el).text().trim();

        if (link) {
            streams.push({
                name: `HDHub4U - ${qualityText}`,
                url: link,
                type: 'hls',
                headers: {
                    'User-Agent': 'Mozilla/5.0',
                    'Referer': 'https://hdhub4u.ms/'
                }
            });
        }
    });

    return streams;
}
