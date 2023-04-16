import * as styles from "./renderers.module.scss"
import { rankWith, uiTypeIs } from '@jsonforms/core'
import { JsonFormsDispatch, withJsonFormsLayoutProps } from '@jsonforms/react'

function renderLayoutElements(props, elements) {
  const {
    schema,
    path,
    enabled,
    renderers,
    cells,
    visible
  } = props

  return elements.map((child, index) => (
    <div
      key={`${path}-${index}`}  
      className={styles["vertical-layout__row"]}
      style={{ display: visible ? "block" : "none" }}
    >
      <JsonFormsDispatch
        uischema={child}
        schema={schema}
        path={path}
        enabled={enabled}
        renderers={renderers}
        cells={cells}
      />
    </div>
  ))
}

function ResqVerticalLayout(props) {
  const {
    uischema
  } = props

  const elements = uischema.elements

  if (elements.length === 0)
    return null

  return (
     <>
      {renderLayoutElements(props, elements)}
     </>
  )
}

export default withJsonFormsLayoutProps(ResqVerticalLayout)

export const resqVerticalLayoutTester = rankWith(1, uiTypeIs("VerticalLayout"))