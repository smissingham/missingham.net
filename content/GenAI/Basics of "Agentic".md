---
created: 2025-06-09T15:55
updated: 2025-06-09T16:46
---
# What is an "Agent" ?
Put simply, an agent is an LLM with a persona. Usually, it has some specific expertise and a predisposed objective.
An agent is often connected to tools, resources, and other agents, in order to get its task done.

# What is MCP?
[Model Context Protocol](https://modelcontextprotocol.io/introduction), is an evolving standard defined by Anthropic and adopted by many, including Microsoft, Cursor and many others.
It is a standard language which defines what things an agent can utilise to perform its task.

This standard defines:
## Prompts
Common use prompts that can help agents understand and perform tasks
## Resources
Information that the agent can pull from. Such things as files, databases, chat history, email inboxes etc.
## Tools!
The most useful part of the standard.
These are tools that the agent can use in order to action its tasks.

Common examples include a web-scraping, time-telling, note-taking etc.

Tools are how agents get access to more understanding, and get their job done.

## Servers & Clients
The above resources need definition for both server & client.
### Servers
MCP servers are where the tools/resources are hosted. They describe how the tools/resources can be used by a client.
### Clients
MCP clients are software applications that can communicate with MCP servers. They simply need to be told where a tool/resource is, and be given access permission to use it.
# Where do agents live?
Agents exist both on-device, and embedded within systems. 
## On-Device (Local) Agents
Claude Desktop. Cursor. Windsurf. Cline. etc.
These are example of interfaces that allow users to run and interact with an agent on their own system.
Local agents can perform tasks such as reading a codebase, suggesting changes, running code tests and submitting it to github for review.
## In-System (Embedded) Agents
Microsoft 365 Copilot is an example of an agent that lives inside your Microsoft cloud account.
It can traverse resources such as sharepoint, teams recordings & chats etc.
It can perform tasks such as summarising notes, generating an action plan and emailing that out to key stakeholders.
# Tying it together, with a pricing example
Put yourself in the shoes of a jewelry retailer. You're tasked with strategising the next seasonal holiday promotion.

You ask Claude Desktop (your MCP client) to help you strategise and execute on this task.

Claude Desktop in this case is an agent, capable of leveraging tools and resources. An example of that flow might be like so:

![[Example Agentic Workflow in Pricing]]

In this example, the user asks Claude (an agent) for help designing and implementing the task.

Note, claude has access to multiple tools. 
- A simple time-telling tool
- A market analyst tool (which itself is another agent!)
- A task planning tool (also another agent)
- A Pricefx price setting tool (actually 4 tools in the Pricefx toolbox)

This gets a little abstract, allowing agents to talk to other agents as tools, but this is where the power lies. Once you let this idea flow, you will realise that this eventually can become a recursively self-improving chain. Very powerful, and of course, technically difficult to implement and a serious security challenge.

# Closing Thoughts
MCP is in early stages, and is likely to evolve rapidly. It may not be the final standard in the end, but it is indisputably the most adopted one today and a massive step in the right direction.
Many tech orgs are **heavily** invested in it, see for yourself. Microsoft, Google, Anthropic, OpenAI, Shopify, Zapier, Cloudflare, just to name a few.

Definition of "agents" are a little fuzzy, and when you think about it this is just abstracted automation. But that's what makes this cool! Instead of having to configure all the pipes and connectors yourself with programming API layers, you can just have an LLM read the docs and figure out how to bring things together without having to write any of that glue yourself.

In the next few years, I'm confident we will see an evolution of "the agentic web". Essentially, a hidden layer beneath the internet, purpose built for agents to traverse and interact with each other. There will always be the top layer we're used to, where humans interact and share, but beneath that there will be API/MCP layers where LLM agents are given context clues on where things are and how to use them.

Hope this helps clear some things up.