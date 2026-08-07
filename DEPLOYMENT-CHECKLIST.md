# OmniTools deployment checklist

## Before deployment

1. Run `python3 generate_static_pages.py`.
2. Run `python3 validate_site.py`.
3. Run `node --check app.js`.
4. Preview the site through a local HTTP server, not by opening HTML files directly.
5. Test all upload, download, copy, formatting and calculator actions on desktop and mobile.

## Google Search Console

1. Add `https://www.omnitechtools.com/` as a Domain property using the DNS method.
2. Submit `https://www.omnitechtools.com/sitemap.xml`.
3. Inspect the homepage and the main tool URLs, then request indexing.
4. Review Page indexing, Core Web Vitals and HTTPS reports weekly.
5. Do not add a verification meta tag until Google provides the exact token.

## Google Analytics

- The existing GA4 measurement ID is `G-T0HG80BJQ2`.
- Confirm real-time events only after visitors accept analytics.
- Exclude internal traffic before interpreting reports.

## Google AdSense

- `ads.txt` uses publisher ID `pub-1668581059091583`.
- The generated pages do not automatically load AdSense ads.
- Before enabling ads for UK/EEA/Swiss visitors, configure a Google-certified consent management platform in AdSense Privacy & messaging.
- Add ad code only after the account/site status and consent configuration are confirmed.
- Keep ads away from upload, download, copy and primary tool-action buttons.

## Content and growth

- Publish useful updates consistently; do not mass-publish generic AI articles.
- Add original examples, screenshots and tested instructions to thin tool pages.
- Earn relevant links through genuinely useful niche resources and outreach.
- Search rankings and AdSense approval are not guaranteed or controlled by the codebase.
