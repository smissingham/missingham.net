import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  footer: Component.Footer({
    links: {
      //GitHub: "https://github.com/jackyzha0/quartz",
      //"Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.ComponentGroup({
      parentClass: "title-search",
      children: [
        Component.PageTitle(),
        Component.Search(),
      ],
    }),
    Component.Spacer(),
    Component.MobileOnly(Component.Spacer()),
    Component.DesktopOnly(Component.Darkmode()),
    Component.ProfilePicture({
      profileImage: "https://avatars.githubusercontent.com/u/9065495?v=4",
      socialLinks: [
        "https://www.linkedin.com/in/sean-missingham/",
        "https://github.com/smissingham",
        "https://twitter.com/smissingham",
      ],
    }),
    Component.DesktopOnly(Component.Explorer({
      title: "Explore",
      useSavedState: true,
      filterFn: (node) => !node.name.startsWith("_")
    })),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    //Component.Backlinks(),
    Component.MobileOnly(Component.Explorer({
      title: "Explore",
      useSavedState: true,
      filterFn: (node) => !node.name.startsWith("_")
    })),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.DesktopOnly(Component.Darkmode()),
    Component.ProfilePicture({
      profileImage: "https://avatars.githubusercontent.com/u/9065495?v=4",
      socialLinks: [
        "https://www.linkedin.com/in/sean-missingham/",
        "https://github.com/smissingham",
        "https://twitter.com/smissingham",
      ],
    }),
    Component.DesktopOnly(Component.Explorer({
      title: "Explore",
      useSavedState: true,
      filterFn: (node) => !node.name.startsWith("_")
    })),
  ],
  right: [],
}
