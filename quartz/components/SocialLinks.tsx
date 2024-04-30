import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

interface Options {
  links: string[]
}

export default ((opts?: Options) => {

  const SocialLinks: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
    return (
      <div class={classNames(displayClass, "social-links")}>
        {opts?.links.map((link) => (
          <div>
            <a href={link}>
              {determineLinkIcon(link)}
            </a>
          </div>
        ))}
      </div>
    )
  }

  return SocialLinks
}) satisfies QuartzComponentConstructor

const determineLinkIcon = (link: string) => {
  if (link.includes("github")) {
    return <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-github">
      <path
        d="M12 2C6.75 2 2 6.75 2 12c0 5.25 4.75 10 10 10 5.25 0 10-4.75 10-10 0-5.25-4.75-10-10-10zM7.75 17.75a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zM12 17.75a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zM16.25 17.75a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zM12 14.5a5.25 5.25 0 00-5.25 5.25c0 1.25.5 2.25 1.25 3.25.75 1 1.75 1.75 3.25 1.75s2.5-.75 3.25-1.75c.75-1 .75-2 1.25-3.25a5.25 5.25 0 00-5.25-5.25z">
      </path>
    </svg>
  } else if (link.includes("linkedin")) {
    return "linkedin"
  } else if (link.includes("twitter")) {
    return "twitter"
  } else {
    return "link"
  }
}