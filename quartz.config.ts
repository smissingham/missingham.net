import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

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
          light: "white",
          lightgray: "#8c8fa1", // SEARCH BOX
          gray: "#5C5F77",
          darkgray: "#4c4f69", // TEXT
          dark: "#181825",
          secondary: "#8839ef", // PAGE TITLE
          tertiary: "#7287fd",
          highlight: "rgba(114, 135, 253, 0.15)",
          textHighlight: "#DF8E1D88",
        },
        darkMode: {
          light: "black", // BASE
          lightgray: "#313244", // OVERLAY
          gray: "#6C7086", // SURFACE2
          darkgray: "#BAC2DE", // SUBTEXT
          dark: "white", // TEXT
          secondary: "#8E4EC6", // FOR PAGE TITLE, MENU SECTIONS, BREADCRUMBS
          tertiary: "#ca9ee6", // FOR LINK HOVER/ACTIVE
          highlight: "rgba(191, 122, 240, 0.15)", // WITH OPACITY - FOR TAG/LINK SHADING
          textHighlight: "#F9E2AF88", // YELLOW WITH OPACITY
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
