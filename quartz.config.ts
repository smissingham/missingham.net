import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"
import { COLORS } from "./const"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Sean's Notes",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "missingham.notes",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Cabin",
        body: "Ubuntu",
        code: "Jetbrains Mono",
      },
      colors: {
        lightMode: {
          light: COLORS.gruvbox.light0_hard, // BASE
          lightgray: COLORS.gruvbox.light3, // SEARCH BOX
          gray: COLORS.gruvbox.light4,
          darkgray: COLORS.gruvbox.dark2, // TEXT
          dark: COLORS.gruvbox.dark0,
          secondary: COLORS.gruvbox.neutral_blue, // PAGE TITLE
          tertiary: COLORS.gruvbox.bright_blue,
          highlight: COLORS.gruvbox.bright_blue + "26", // WITH OPACITY - FOR TAG/LINK SHADING
          textHighlight: COLORS.gruvbox.bright_yellow + "88", // YELLOW WITH OPACITY
        },
        darkMode: {
          light: COLORS.gruvbox.dark0, // BASE
          lightgray: COLORS.gruvbox.dark2, // OVERLAY
          gray: COLORS.gruvbox.dark4, // SURFACE2
          darkgray: COLORS.gruvbox.light3, // TEXT
          dark: COLORS.gruvbox.light0_soft, // HEADER TEXT
          secondary: COLORS.gruvbox.faded_yellow, // FOR PAGE TITLE, MENU SECTIONS, BREADCRUMBS
          tertiary: COLORS.gruvbox.bright_purple, // FOR LINK HOVER/ACTIVE
          highlight: COLORS.gruvbox.bright_orange + "26", // WITH OPACITY - FOR TAG/LINK SHADING
          textHighlight: COLORS.gruvbox.bright_yellow + "88", // YELLOW WITH OPACITY
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
