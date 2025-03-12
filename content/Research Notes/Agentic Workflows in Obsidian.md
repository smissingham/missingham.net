---
created: 2025-02-14T15:44
updated: 2025-02-14T16:37
tags:
  - gen-ai
  - obsidian
---
I recently discovered the [[Fabric]] project on [[Github]]. The gist of that project is to collect an open-source set of LLM prompts, share them among the public and integrate them with other tools.

This week, I gave it a go within my [[Obsidian.md]] vault, with the help of a plugin called [MeshAI](https://github.com/chasebank87/mesh-ai).
Suffice it to say, my workflow has been significantly impacted by GenAI once again.

It works in four steps:
- Configure an LLM provider
	- I like [[LMStudio]], I run it locally on my computer and use whichever latest model I'm enjoying
	- As of this week, my local LLM workhorse is [Microsoft Phi 4](https://huggingface.co/microsoft/phi-4)
- Set your input context
	- Input can come from an existing Obsidian Note
	- Or, the really cool option, from a [[Tavily]] Search
- Select which "patterns" to apply to the given input
	- Extra cool note, these patterns can be stitched together to work like an agentic system!
- Write the output document

Putting that all together, I have built myself a mixture of LLM agents, that have access to web research and can provide me with exactly the results I want based on my "patterns".

Check out this example, this is insane:
![[Pasted image 20250214161514.png]]

In this example, I've emulated a deep-research style feature, and built it into my Obsidian vault.
- Local phi4 LLM ensures data doesn't leave my machine
- Tavily search provider gives my local LLM access to gather data from the internet
	- I just type the subject of interest that I want to research
- 3 custom "patterns" work together like an agentic system to provide me desired output
	- [[research_foundational]]
	- [[code_snippets]]
	- [[cite_sources]]

That all took a few minutes to run, cost me nothing, and produced the rather outstanding research note below. 

![[Agentic Phi4 Summary - Logarithmic Regressions]]