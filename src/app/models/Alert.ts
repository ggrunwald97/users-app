import { AlertColor } from "@mui/material/Alert";

export interface AlertShape {
  severity: AlertColor | undefined,
  text: string,
  isOpen: boolean
}
