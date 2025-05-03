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
    defaultDateType: "created",
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
          // Catppuccin Latte
          light: "#EFF1F5",      // Base
          lightgray: "#4C4F69",  // Text
          gray: "#5C5F77",       // Subtext1
          darkgray: "#ACB0BE",   // Surface2
          dark: "#1E1E2E",       // Crust
          secondary: "#FE640B",  // Peach - for page title, menu sections, breadcrumbs
          tertiary: "#DC8A78",   // Rosewater - for link hover/active
          highlight: "rgba(254, 100, 11, 0.15)", // Peach with opacity - for tag/link shading
          textHighlight: "#DF8E1D88", // Yellow with opacity
        },
        darkMode: {
          // Catppuccin Mocha
          light: "#181825",      // Base
          lightgray: "#313244",  // Overlay
          gray: "#6C7086",       // Surface2
          darkgray: "#BAC2DE",   // Subtext
          dark: "#CDD6F4",       // Text
          secondary: "#fab387",  // Peach - for page title, menu sections, breadcrumbs
          tertiary: "#b4befe",   // Lavendar - for link hover/active
          highlight: "rgba(250, 179, 135, 0.15)", // Peach with opacity - for tag/link shading
          textHighlight: "#F9E2AF88", // Yellow with opacity
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
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
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
