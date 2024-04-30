import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

interface Options {
  link: string
}

export default ((opts?: Options) => {

  const ProfilePicture: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
    return (
      <div class={classNames(displayClass, "profile-picture")}>
       <img src={opts?.link} alt="Profile Picture" />
      </div>
    )
  }

  return ProfilePicture
}) satisfies QuartzComponentConstructor