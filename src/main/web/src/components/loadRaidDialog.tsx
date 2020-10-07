import React, { useState } from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"

interface LoadRaidDialogProps {
  open: boolean
  errorMsg: string | undefined
  handleClose: () => void
  handleLoadClick: (raidId: string) => void
}

const LoadRaidDialog: React.FC<LoadRaidDialogProps> = ({
  open,
  errorMsg,
  handleClose,
  handleLoadClick,
}) => {
  const [inputValue, setInputValue] = useState<string>("")
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Load Raid</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the raid ID (UUID) that you want to load.
          </DialogContentText>
          <TextField
            error={errorMsg !== undefined}
            onChange={event => setInputValue(event.target.value)}
            autoFocus
            margin="dense"
            id="raidId"
            label="Raid ID"
            type="text"
            fullWidth
            helperText={errorMsg}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleLoadClick(inputValue)} color="primary">
            Load
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default LoadRaidDialog
