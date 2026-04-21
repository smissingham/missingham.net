---
created: 2026-04-20T00:00
updated: 2026-04-20T00:00
---

# Summary & Personal Take

AI psychosis continues to push to all-time-highs. "Hands off" / "Black box" coding is not enterprise viable, not yet and not soon.

- Claude _almost_ [built a functional C-compiler](https://github.com/anthropics/claudes-c-compiler)
- Cloudflare _almost_ [built a functioning successor to Wordpress](https://blog.cloudflare.com/emdash-wordpress/)

Key word being **almost**. Black box coding, currently, produces an almost-working, un-debuggable black box.

AI models are trained on public data, most of which is junior-developer Q&A on stack overflow. High quality training data represents a minimal part of the corpus.

Self-review loops can help, but are just as subject to being gamed as the main coding agent loop. Agents are removing/modifying unit tests to make sure tests pass,
benchmarks are being cheated instead of solved.

We have a long way to come before hands-off coding is truly viable. Until then, the best developers are focused on test-driven and spec-driven development.

# Categories

## AI

### Key Updates

- Anthropic announces Claude Mythos model. Apparently the biggest existential/security threat posed by LLM's to date.
  - Deemed too dangerous for public release
  - [Project Glasswing](https://www.anthropic.com/glasswing), a closed door group given access to Mythos, to use and test it before public availability.
  - [Mythos identified thousands of zero-day critical vulnerabilities in popular software](https://www.forbes.com/sites/jonmarkman/2026/04/08/what-is-claude-mythos-and-why-anthropic-wont-let-anyone-use-it/)

- Speech-to-text gaining significant traction, likely the next big workflow game-changer
  - Typing is slow, what if you can talk to your agents and they can talk back? The workflow efficiency boost is significant
  - Historically, these models were restricted / incapable, emerging trend in open source show's them becoming much more generally available & viable
  - [Project to watch: Handy](https://github.com/cjpais/Handy)

- "Managed Agents" service offerings have begun emerging, more to come.
  - TL;DR: Frontier LLM labs offering agent runtimes for their models, where the agent runs on their infra for you
  - [Claude Managed Agents](https://platform.claude.com/docs/en/managed-agents/overview)
  - Significant challenge to any smaller vendors offering agents as a service

- [Google Gemma 4](https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/), the best price:performance:quality ratio LLM to date, fully open source
  - First truly open-source model, Apache license allows truly liberal use without restriction
  - Can be run in full quality on a single Nvidia H200, or less
  - Output quality in both coding & knowledge work rivals frontier models at 1/10th the size
  - Tested this myself, firmly believe these statements

- Coding Agent "Harness" war continues to evolve
  - Claude code still most adopted with first mover advantage
  - Opencode project is strongest alternative without vendor lock
  - [OpenAI Codex CLI](https://github.com/openai/codex), gaining significant traction in light of Anthropic's anti-choice antics
    - Native to OpenAI models, but allows connection to other vendors
    - Adopts Agents.md standard (unlike Claude Code)
  - [Pi](https://pi.dev/), the harness behind OpenClaw, very significant potential for application in commercial space
    - No frills. Really just the bare framework.
    - Best option for enterprises looking to implement agents in software/services, and control how they operate
    - [Very good watch, from creator of Pi](https://youtu.be/RjfbvDXpFls?si=7_l-Ml1O_BYLGcyq)

- G-Stack Audited, embarassing truths
  - [G Stack](https://github.com/garrytan/gstack), effectively a bunch of markdown instructions cobbled together for claude, by Ycombinator CEO Garry Tan
  - 70k stars on Github, sold as revolutionary for agentic development workflows
  - Garry's List (website he builds using Gstack) was audited, [results are strong proof that black-box-AI-coding is not viable any time soon](https://x.com/Gregorein/status/2038953944475472316)
  - LOC's (lines of code) are a terrible metric for measuring productivit, as are git-commits.
  - Despite reality, a promising future is ahead, somewhere in coming years.

## Other Noteworthy Mentions

- [MemPalace, a popular local agent memory solution](https://mempalace.me/)
- [Kimi K2.6, open source heavyweight continues to challenge private frontier models](https://www.kimi.com/blog/kimi-k2-6)
- Fast, high quality true-file-type detection, open sourced [Google Magika](https://github.com/google/magika)

## Projects I'm Watching

- [Burn](https://burn.dev/), a no-compromise AI/ML framework for Rust that challenges the status quo, driven by
  - Performance
  - Portability - THIS, is where python struggles and I think this project will find great success
  - Flexibility
- [Handy](https://github.com/cjpais/Handy), a free open source extensible speech to text application works completely offline
