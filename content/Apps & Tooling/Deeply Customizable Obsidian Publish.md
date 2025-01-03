---
tags:
  - obsidian
  - publishing
  - github
  - google-drive
---
> [!update] Update Jan 2025
> In recent times, I've moved away from Google services. The remainder of this article remains true, but instead of using Google Drive via Github workflows I use a cron job on my NixOS server.


I've been a paying subscriber of Obsidian Sync for about a year at this point, so I can sync notes between my phone, laptop and pc.

I test-drove Obsidian Publish, but it was sorely lacking what I wanted in a publishing utility. 
Namely, I wanted more control over layout, visual effects, publishing, automation etc.

So, despite loving Obsidian, and being an advocate of paying for the things that bring you productivity - I've gone a new path and figured out how to achieve everything I wanted and more, and purely as a bonus: ***all for free***. 

I've landed on the following stack
- [Obsidian.md](https://obsidian.md/) for content authoring
- [Webstorm](https://www.jetbrains.com/webstorm/) for working on the website
- [Google Drive](https://drive.google.com/) for synchronizing between devices
- [Quartz](https://quartz.jzhao.xyz/) for publishing to a static site
- [Github](https://github.com/) for git repository
- [Github Pages](https://pages.github.com/) for site hosting

![[My Obsidian Quartz Setup Diagram.svg|700]]
*Note: I also use Cloudflare for DNS & CDN, but that's optional so doesn't get a place on the diagram*

### My Keystone Requirements
- I want to be able to publish to my [Digital Garden](index.md) from any device. Phone, Laptop or Desktop.
- I want to be able to deeply customise the appearance of it, with technologies I know
- I want to use [Excalidraw in Obsidian](https://github.com/zsviczian/obsidian-excalidraw-plugin)!!!
- I want it publicly hosted, for free, and I want it to be speedy

### Acceptable Tradeoffs
- The site will be static. It won't be a rich web-application with state 
- How it looks to me in Obsidian isn't how it necessarily looks on the public site. 
	- I'll have to keep an eye on that
- Publishing doesn't need to be immediate, it can run on a schedule in the background
- Obsidian plugins are not thoroughly supported, but the essentials already work and others can be built with enough know-how

> [!tip] As a Bonus, It's Totally free!


I'll spare the details on getting it all set up, that's been covered by [Nicole Vanderhoeven, here](https://notes.nicolevanderhoeven.com/How+to+publish+Obsidian+notes+with+Quartz+on+GitHub+Pages). 
What I'll cover here are the extras.

# Setting Up Excalidraw

After installing the Excalidraw Obsidian plugin, we need to update some settings to get it playing nice with the publishing stack.

- Default Obsidian attachments folder:
	- `Settings > Files and Links > Default Location for New Attachments`
		- Change to `In the Folder Specified Below` and then specify `_attachments`
- Default save folder for drawings:
	- `Settings > Excalidraw > Basic > Excalidraw folder`
		- Change to `_excalidraw`
>[!note]
>We're using underscores to prefix the folder name so that in Obsidian, they stay at the top of the file browser and we're about to use that pattern to prevent them in the Quartz Explorer


- Default default publishing as SVG
	- `Settings > Excalidraw > Embedding ... and Exporting > Export Settings > Auto Export Settings`
	- Turn on the following ![[excalidraw-svg-settings.png]]

>[!note]
>From now on, when embedding an Excalidraw-ing into a note, we can use the wikilinks syntax but must reference the ".svg" version of our drawing. For example `[[MyDrawing.svg]]`

#### Last thing, filtering out `_` prefixed folders

This has to be done in the Quartz `quartz.layout.ts` file.  Find the following piece of code:
```typescript
Component.Explorer()
```

Update it to be as follows:
```typescript
Component.Explorer({
  filterFn: (node) => !node.name.startsWith("_")  
})
```

# Auto-Publishing from Google Drive

Alright this one was a big effort, and I'm still testing its robustness. 
Long story short, I'm using a scheduled Github Action to download the contents of a publicly accessible Google Drive folder link, then if there's updates it will commit to the Github repo.

[To skip ahead (you know what you're doing), here's the Github action](https://github.com/smissingham/blog/blob/v4/.github/workflows/drive-sync.yml)

- Create `blog-content` folder in Google drive.
- Share it as "Accessibly to Anyone with the Link"
- Copy that link, go to the Github Repo `Settings > Secrets & Variables > Actions
	- Create a new secret called `GOOGLE_DRIVE_FOLDER_ID` and paste only the portion of the google URL after the /folder/ section and before any question-marks. For example:
		 - `https://drive.google.com/drive/folders/SoM3cR4zY-L3tters?usp=sharing`
		 - Becomes: `SoM3cR4zY-L3tters`

After that, create a file called `drive-sync.yml` inside your `.github/workflows` and paste the content from the [yml linked above](https://github.com/smissingham/blog/blob/v4/.github/workflows/drive-sync.yml)


## Some extra notes
- I had to add `workflow_dispatch` to `deploy.yml` in order to be able to trigger it from another script. I've opened a PR to see if this can be added to the core repo:
	- PR1251: https://github.com/jackyzha0/quartz/pull/1251
- I had to create a personal access token to be able to dispatch the deploy action from another github action.
	- Docs here: https://docs.github.com/en/actions/using-workflows/manually-running-a-workflow

### Preventing `.obsidian` folder download in Google Drive sync 

I noticed that the `.obsidian` folder in the root directory of my Obsidian notebook was growing larger with new plugins, and this caused the drive-sync action to take a few minutes to download unnecessary data.

Now, I have moved my Quartz content into a `@Public` folder inside my Obsidian notebook. This allows me to achieve two things:
- Notes that are published must be explicitly, manually moved into the @Public folder. 
	- This ensures I'll never accidentally publish something private
- Ensures that the contents downloaded by the Github action are only that which is necessary for Quartz to publish, nothing more.