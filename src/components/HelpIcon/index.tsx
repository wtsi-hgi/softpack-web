import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Tooltip } from "../Tooltip";

export type HelpIconProps = {
  title: string;
  style?: React.CSSProperties;
};

export const HelpIcon = (props: HelpIconProps) => {
  return (
    <Tooltip style={props.style ?? {}} title={props.title}>
      <span>
        <HelpOutlineIcon
          sx={{
            color: "rgba(34, 51, 84, 0.7)",
            padding: "0 0 0 8px",
            fontSize: "25px",
          }}
        />
      </span>
    </Tooltip>
  );
};
