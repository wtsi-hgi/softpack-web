import { Tooltip } from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export type HelpIconProps = {
    title: string;
}

export const HelpIcon = (props: HelpIconProps) => {
    return <Tooltip title={props.title}>
        <HelpOutlineIcon
            sx={{
                color: 'rgba(34, 51, 84, 0.7)',
                padding: '0 0 0 8px',
                fontSize: '25px'
            }}
        />
    </Tooltip>;
}