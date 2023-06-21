import { rankWith, uiTypeIs } from '@jsonforms/core'
import { withJsonFormsLayoutProps } from '@jsonforms/react'
import { Typography } from '@mui/material'
import ResqLinearLayout from "./ResqLinearLayout"

function ResqGroupLayout(props) {
  const {
    label,
    visible
  } = props

  return (
    <>
      <Typography
        variant="h3"
        gutterBottom
        sx={{ display: visible ? "block" : "none" }}
      >
        {label || "[missing group label]"}
      </Typography>
      <ResqLinearLayout {...props} />
    </>
  )
}

export default withJsonFormsLayoutProps(ResqGroupLayout)

export const resqGroupTester = rankWith(1, uiTypeIs("Group"))