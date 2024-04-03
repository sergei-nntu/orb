import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Item = styled(Box)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : '#fff',
    textAlign: 'center',
    padding: theme.spacing(1),
    border: theme.palette.mode === 'dark' ? '1px solid grey' : '1px solid #dcdee0',
    borderRadius: '3px',
    fontSize: '20px',
    fontWeight: '500',
    minHeight: '10px',
    userSelect: 'none',
}));
