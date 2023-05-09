import { Button, Menu, MenuList, MenuItem, ListItemIcon, Typography, Divider } from "@mui/material";
import { useState } from "react";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { useAtom } from "jotai"
import { isFileOpenAtom } from "../../state/fileStore";
import { runAutomaticExtraction } from "../../state/editor/runAutomaticExtraction";
import { isOpenAtom as isResqExportDialogOpenAtom } from "../dialogs/ResqExportDialog";

export function ToolsMenu() {
  const [,setResqExportDialogIsOpen] = useAtom(isResqExportDialogOpenAtom)

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  function onMenuClick(e) {
    setAnchorEl(e.target)
  }
  function closeMenu() {
    setAnchorEl(null)
  }

  // === used state ===

  const [isFileOpen] = useAtom(isFileOpenAtom)

  // === click handlers ===

  function onNlpExtractionClick() {
    runAutomaticExtraction()
    closeMenu()
  }

  function onExportToResqClick() {
    setResqExportDialogIsOpen(true)
    closeMenu()
  }

  return (
    <>
      <Button
        size="small"
        onClick={onMenuClick}
      >Tools</Button>
      <Menu
        id="tools-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
        variant="menu"
      >
        <MenuItem disabled={true} onClick={onNlpExtractionClick}> {/* TODO: temporarily disabled */}
          <ListItemIcon>
            <SmartToyIcon />
          </ListItemIcon>
          <Typography variant="inherit">Fill out form automatically</Typography>
        </MenuItem>
        <MenuItem disabled={!isFileOpen} onClick={onExportToResqClick}>
          <ListItemIcon>
            <LocalShippingIcon />
          </ListItemIcon>
          <Typography variant="inherit">Export to RES-Q registry</Typography>
        </MenuItem>
      </Menu>
    </>
  )
}