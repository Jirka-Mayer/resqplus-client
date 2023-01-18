import { FormContext } from "./FormContext"
import { FieldState } from "./FieldState"
import { useContext } from "react"

export function useFieldState(fieldId, isFieldActive) {
  const {
    getFieldState: getFieldStateGlobal,
    setFieldState: setFieldStateGlobal
  } = useContext(FormContext)

  const fieldState = getFieldStateGlobal(fieldId)

  function setFieldState(state) {
    setFieldStateGlobal(fieldId, state)
  }

  const hasRobotValue = (
    fieldState === FieldState.ROBOT_VALUE
    || fieldState === FieldState.ROBOT_VALUE_VERIFIED
  )

  const isVerified = (
    fieldState === FieldState.ROBOT_VALUE_VERIFIED
    || fieldState === FieldState.HUMAN_VALUE
  )

  const hasVerifiedAppearance = isVerified && !isFieldActive

  function toggleRobotVerified() {
    if (fieldState === FieldState.ROBOT_VALUE_VERIFIED)
      setFieldState(FieldState.ROBOT_VALUE)
    else if (fieldState === FieldState.ROBOT_VALUE)
      setFieldState(FieldState.ROBOT_VALUE_VERIFIED)
  }

  function updateFieldStateWithChange(newData) {
    if (newData === undefined)
      setFieldState(FieldState.EMPTY)
    else
      setFieldState(FieldState.HUMAN_VALUE)
  }
  
  return {
    fieldState, setFieldState,
    hasRobotValue,
    isVerified,
    hasVerifiedAppearance,
    toggleRobotVerified,
    updateFieldStateWithChange
  }
}