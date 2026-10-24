# YouTube checklist

Every video should be findable on YouTube **and** on the site. Work through this list per video.
Replace `[SITE]`, `[BOOKING]` and `[CHANNEL]` with the values from `config/site.ts` / `NEXT_PUBLIC_BOOKING_URL`.

## 1. Before you record

- [ ] Pick one series: **Case study walkthroughs**, **Teardowns**, **How-tos** or **Building in public** (these match `videoSeries` in `lib/schemas.ts`).
- [ ] Decide the one outcome a viewer gets. If you can't write it in one sentence, the video isn't ready.
- [ ] Link it to a page on the site (a case study, teardown or how-to) so the video page can show it under "Related".

## 2. Title formulas

Keep titles under ~60 characters so they don't truncate. Lead with the outcome or the product, not "How I".

| Series | Formula | Example shape |
| --- | --- | --- |
| Case study walkthroughs | `[Product]: how I [outcome] (PM case study)` | "Tiaago: how I shipped an AI recruiter (PM case study)" |
| Teardowns | `[Product] teardown: what works, what breaks` | "[Product] teardown: what works, what breaks" |
| How-tos | `How to [do the thing] (for [audience])` | "How to write a PRD for an AI feature (for PMs)" |
| Building in public | `Building [thing] in public: week [N]` | "Building [thing] in public: week 1" |

Only claim numbers you can show on screen. Never put an unverified metric in a title.

## 3. Description template

The first two lines show before "Show more", so put the value and the link there.

```
[One-sentence outcome: what the viewer will learn.]

Full write-up, transcript and templates: [SITE]/videos/[slug]
Want this thinking on your team? Book a call: [BOOKING]

CHAPTERS
0:00 Intro
1:10 [Chapter 2]
...

RELATED
Case study: [SITE]/work/[slug]
How-to: [SITE]/writing/[slug]

ABOUT ME
I'm Justus, an AI Product Manager and Technical PM. I design, build and deploy real products.
Site: [SITE]
LinkedIn: [LINKEDIN]
X: [X]

Subscribe: [CHANNEL]?sub_confirmation=1
```

- Chapters must start at `0:00`, have at least three entries, and be at least 10 seconds each, or YouTube won't create them.
- Copy the chapter list from the video's frontmatter (`chapters:`) so the site and YouTube match.

## 4. Chapters

- Name chapters for the question they answer ("Why we chose RAG"), not the topic ("Architecture").
- Keep the `chapters` array in `content/videos/<slug>.mdx` identical to the description. The site uses it for the chapter list, seek links and `Clip` markup in the VideoObject JSON-LD.

## 5. Pinned comment

Post and pin this right after publishing:

```
Full write-up, templates and transcript: [SITE]/videos/[slug]
If you're hiring for an AI/product role or want a product built: [BOOKING]
What should I tear down next? Tell me below.
```

## 6. Thumbnail guidelines (match the site's look)

- 1280×720, under 2 MB, readable at 160 px wide.
- **Flat colour block background** from the palette: cobalt `#2340E0`, mustard `#F5B50A`, terracotta `#B53A10`, forest `#1D6B43`, lilac `#C9B6F2`. One colour per series so the channel grid reads as a set.
- **Headline in the stamped-label style**: 3 to 5 words max, ultra-bold grotesque (Bricolage Grotesque ExtraBold), tight tracking, each word on its own notched label, slightly rotated. Ink `#16130F` on mustard and lilac, cream `#FFF8E7` on the others.
- One googly-eyed mascot from the site, looking toward the headline. Add a pixel checkerboard corner accent.
- No faces needed, but if you add one, keep it on one side and the text on the other.
- Contrast check: text must pass WCAG AA against its label colour.
- Don't put the duration, logo or a long phrase in the bottom-right corner: YouTube overlays the duration there.

## 7. End screens and cards

- Last 20 seconds: one **end-screen** video slot (next video in the same series) and one **subscribe** element. Say the call to action out loud while they appear.
- Add an **info card** at the first moment the video references a case study, teardown or how-to.
- Add a **link end-screen element** to `[SITE]/videos/[slug]` if your channel is eligible for external links; otherwise rely on the description and pinned comment.

## 8. Playlist strategy

- Create one playlist per series, with the exact series names above, and order each playlist newest-first for "Teardowns" and "Building in public", oldest-first for "How-tos" (a learning path).
- Playlist description: one sentence on who it's for plus `[SITE]/videos`.
- Add every video to its series playlist on upload. Set the series playlist as the channel's featured sections, in the order above.
- Mark the strongest case study walkthrough as the **channel trailer** for non-subscribers.

## 9. Publish on the site

1. Create `content/videos/<slug>.mdx` (copy an existing file).
2. Set `youtubeId` to the real id (the part after `v=`), `durationSeconds`, `publishedAt`, `series`, `chapters`, `related`, and `featured: true` if it should lead the Videos section (only one video should be featured).
3. Put the written summary above `## Transcript` and paste the full transcript below it (export it from YouTube Studio and clean it up).
4. Run `npm run build`. The build validates the frontmatter with Zod, and the video then appears in `/videos`, the video sitemap, the command palette and the VideoObject JSON-LD.
5. Submit `[SITE]/video-sitemap.xml` in Google Search Console, next to `sitemap.xml`.

## 10. Checklist per upload

- [ ] Title follows a formula
- [ ] Description starts with the outcome and the site link
- [ ] Chapters match the MDX file
- [ ] Thumbnail matches the style guide and passes the small-size test
- [ ] Added to the right playlist
- [ ] End screen and cards set
- [ ] Pinned comment posted
- [ ] MDX file added, build passes, page live
- [ ] Shared the video page (not just the YouTube link) on LinkedIn / X
