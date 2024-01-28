import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Fade from "@mui/material/Fade";
import {
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuList,
  useTheme,
} from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import InfoIcon from "@mui/icons-material/Info";

const ITEM_HEIGHT = 48;

export default function TopMenu() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon
          sx={{
            height: "32px",
            width: "32px",
            color: theme.palette.common.white,
          }}
        />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              //   width: "20ch",
            },
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuList>
          <MenuItem>
            <ListItemIcon>
              <AutorenewIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText sx={{ mr: 2 }}>Reset list</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <DeleteSweepIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText sx={{ mr: 2 }}>Delete all</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <UndoIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText sx={{ mr: 2 }}>Undo delete</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <InfoIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText sx={{ mr: 2 }}>About</ListItemText>
            {/* <Typography variant="body2" color="text.secondary">
              F1
            </Typography> */}
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}
