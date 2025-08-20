---
created: 2025-02-14T15:52
updated: 2025-02-14T16:03
tags:
  - gen-ai
---
# Quick Overview
[Fabric](https://github.com/danielmiessler/fabric?tab=readme-ov-file#whatandwhy) itself is actually a command line tool. 
You typically use it from within a terminal tool. You give it an input (like the contents of a web page via `curl`), and pipe that to a pre-written prompt, which Fabric calls "patterns".
It then runs that prompt against that input, on any LLM provider of your choosing.
# My Thoughts
- The most important part of the project is the open-source collection of LLM prompts (called "Patterns")
- The "patterns" as they stand today, could do with some review & polish, but are overall still useful
- The methodology of defining these patterns, and piping inputs/outputs into each other is where the gold lies
	- As such, I now maintain my own small set of *patterns* for use in this fashion
# According to the Fabric Project
Since the start of 2023 and GenAI we've seen a massive number of AI applications for accomplishing tasks. It's powerful, but _it's not easy to integrate this functionality into our lives._

> In other words, AI doesn't have a capabilities problem—it has an _integration_ problem.

Fabric was created to address this by enabling everyone to granularly apply AI to everyday challenges.


