# Hosting

The site moved from Vercel to Cloudflare on 24 October 2026.

- Production: <https://rymi.dev>
- Alias: <https://www.rymi.dev>, redirected with HTTP 301 to the same path and query on `rymi.dev`.
- Worker: `rymi-dev`, in Cloudflare account `1186c5d9a74b232e0cbcb344452bafb7`.
- Zone: `rymi.dev`, ID `6c98fc8ed6af77d2fb502eaeb9e8412f`.
- Preview: <https://rymi-dev.ryanmiville.workers.dev>.
- Version activated at migration completion: `40ce6171-7d3b-4e77-b758-ae548ce787e8` (100% traffic).

Both production hostnames are Cloudflare Workers Custom Domains. Cloudflare manages their proxied `AAAA 100::` records and certificates. The former Vercel A/CNAME records have been removed. No temporary Worker routes remain. Other subdomain applications and the existing CAA record were retained.

`void.config.ts` declares account ownership, visibility, domains, and the canonical-host redirect. `void.lock.json` retains the provisioned `ISR_CACHE` namespace. Preserve that lock file for future deployments.

## Updating the site

Run `npm run verify`, then `npm run deploy`. The deploy script selects Cloudflare explicitly. It uploads and checks a candidate before activation, then synchronizes the declared domain configuration. Keep Cloudflare credentials outside the repository.

## Migration checks

The build, typecheck, and eight automated checks passed before deployment. Live checks confirmed the homepage, six project pages, archives, About, work history, RSS, sitemap, font, share image, and the designed 404. The `www` redirect preserved paths and query strings. Project filtering, empty-result reset, and the Markdown diagram were exercised in the public site’s browser session.

## Rollback reference

The old Vercel project was retained. A hosting rollback would remove the two Custom Domain attachments and restore these proxied records:

| Name           | Type  | Target                 | TTL  |
| -------------- | ----- | ---------------------- | ---- |
| `rymi.dev`     | A     | `76.76.21.21`          | Auto |
| `www.rymi.dev` | CNAME | `cname.vercel-dns.com` | Auto |

Do not remove the CAA record or alter other subdomains. Code-only Cloudflare rollback is a separate operation and does not require moving DNS back to Vercel.

Local migration evidence is saved in the ignored `.void/hosting-dns-backup.json`, `.void/hosting-domain-cutover.json`, and `.void/hosting-live-state.json` files. The DNS backup contains the exact pre-migration records; the live-state file records the final deployment and domain inventory.
