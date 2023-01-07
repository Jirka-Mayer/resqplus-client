/*
  Take inspiration here:
  https://github.com/eclipsesource/jsonforms/tree/master/packages/material-renderers/src
*/

import { materialTextControlTester, MaterialTextControl } from "@jsonforms/material-renderers"
import { materialIntegerControlTester, MaterialIntegerControl } from "@jsonforms/material-renderers"
import { materialHorizontalLayoutTester, MaterialHorizontalLayout } from "@jsonforms/material-renderers"
import { materialVerticalLayoutTester, MaterialVerticalLayout } from "@jsonforms/material-renderers"

import { ResqTextControl, resqTextControlTester } from "./ResqTextControl"

export const resqRenderers = [
  // controls
  //{ tester: materialTextControlTester, renderer: MaterialTextControl },
  { tester: materialIntegerControlTester, renderer: MaterialIntegerControl },

  // resq controls
  { tester: resqTextControlTester, renderer: ResqTextControl },

  // layouts
  { tester: materialHorizontalLayoutTester, renderer: MaterialHorizontalLayout },
  { tester: materialVerticalLayoutTester, renderer: MaterialVerticalLayout },
]

export const resqCells = []