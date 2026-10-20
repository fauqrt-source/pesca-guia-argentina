<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Wind data is fetched from Open-Meteo in the browser (src/lib/viento.ts), not a server function: the shared server IP hits the free daily quota (HTTP 429).
- Auth uses Lovable Cloud via useSession (src/hooks/use-session.ts); sign-in lives at /auth and the header shows UserMenu.
