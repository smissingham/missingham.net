import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

interface Options {
  parentClass?: string
  childClass?: string
  children?: QuartzComponent[]
}

export default ((opts?: Options) => {
  const ComponentGroup = (props: QuartzComponentProps) => {
    return (
      <div className={`component-group ${opts?.parentClass}`}>
        {opts?.children?.map((component, index) => {
          const Component = component
          return (
            <div key={index} className={`mb-1 ${opts?.childClass}`}>
              <Component {...props} />
            </div>
          )
        })}
      </div>
    )
  }

  return ComponentGroup
}) satisfies QuartzComponentConstructor
