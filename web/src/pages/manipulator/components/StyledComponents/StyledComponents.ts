import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";

export const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export const StyledTitleBox = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    padding: theme.spacing(1),
    border: theme.palette.mode === 'dark' ? "1px solid grey" : "1px solid #dcdee0",
    fontSize: "20px",
    fontWeight: "500",
    minHeight: "10px",
    userSelect: 'none'
}));