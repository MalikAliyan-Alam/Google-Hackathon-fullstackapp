const https = require('https');
const http = require('http');
const cheerio = require('cheerio');

const fetchUrl = (url) => {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      timeout: 10000
    };
    client.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject).on('timeout', () => reject(new Error('Request timeout')));
  });
};

const agent0_fetcher = async (url) => {
  console.log('[Agent 0 - Fetcher] ✓ URL received:', url);
  console.log('[Agent 0 - Fetcher] ✓ Fetching article content...');

  try {
    const html = await fetchUrl(url);
    const $ = cheerio.load(html);

    $('script, style, nav, footer, header, iframe, img, video, form, button, aside').remove();
    $('[class*="ad"], [class*="banner"], [class*="popup"]').remove();

    const title = $('h1').first().text().trim() || $('title').text().trim() || 'Article';

    let content = '';
    const selectors = ['article', '[class*="article-body"]', '[class*="story-body"]', '[class*="post-content"]', '[class*="entry-content"]', 'main', '.content', '#content'];

    for (const selector of selectors) {
      const el = $(selector);
      if (el.length && el.text().trim().length > 200) {
        content = el.text().trim();
        break;
      }
    }

    if (!content || content.length < 100) {
      content = $('body').text().trim();
    }

    content = content.replace(/\s+/g, ' ').replace(/\n+/g, ' ').trim();
    if (content.length > 2000) content = content.substring(0, 2000) + '...';

    const domain = new URL(url).hostname.replace('www.', '');

    console.log('[Agent 0 - Fetcher] ✓ Article fetched successfully');
    console.log(`[Agent 0 - Fetcher] ✓ Title: ${title}`);

    return {
      success: true,
      title: title,
      content: content,
      source_url: url,
      source_domain: domain,
      fetched_at: new Date().toISOString()
    };

  } catch (error) {
    console.error('[Agent 0 - Fetcher] ✗ Error:', error.message);
    return { success: false, error: error.message, content: null };
  }
};

module.exports = agent0_fetcher;
