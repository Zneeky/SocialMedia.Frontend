import { theme } from "@cloudinary/url-gen/actions/effect"
import {Box} from "@mui/material"
import {styled} from "@mui/system"

const WidgetWrapper = styled(Box) (({theme}) =>({
    padding:"1.5rem 1.5rem 0.75rem 1.5rem",
    color: theme.palette.background.main,
    border: `solid 1px ${theme.palette.neutral.border}`,
    borderRadius:"4px",
    backgroundColor:theme.palette.background.default
}));

export default WidgetWrapper;