import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Fade from '@mui/material/Fade';
import { Box, Divider, ListItemIcon, ListItemText, MenuList, useTheme } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import InfoIcon from '@mui/icons-material/Info';
import { useLocation, useNavigate } from 'react-router-dom';
import { IMyContext } from '../lib/context';
import { MyContext } from '../routes/root-page';
import { useContext } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import SortIcon from '@mui/icons-material/Sort';

const ITEM_HEIGHT = 48;

export default function TopMenu() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  //This allows you to delete multiple times before the menu closes.
  const debouncedClose = useDebouncedCallback(() => {
    handleClose();
  }, 500);

  const {
    deleteAllFavorites,
    getRandomFavoriteList,
    undoDeleteFavorite,
    favoriteCharactersDeleted,
    sortFavoriteCharacters
  }: IMyContext = useContext(MyContext);

  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGetRandomList = () => {
    getRandomFavoriteList();
    handleClose();
  };
  const handleDeleteAll = () => {
    deleteAllFavorites();
    handleClose();
  };
  const handleUndoDelete = () => {
    undoDeleteFavorite();
    debouncedClose();
  };
  const handleAbout = () => {
    navigate('/about');
    handleClose();
  };
  const handleSortList = () => {
    sortFavoriteCharacters();
    handleClose();
  };

  return (
    <Box sx={{ height: '100%' }}>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        size="large"
        onClick={handleClick}
        sx={{ height: '100%' }}
      >
        <MoreVertIcon
          sx={{
            maxHeight: '100%',
            color: theme.palette.common.white
          }}
          fontSize="inherit"
        />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 5.5
              //   width: "20ch",
            }
          }
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuList>
          <MenuItem disabled={location.pathname != '/favorites'} onClick={handleGetRandomList}>
            <ListItemIcon>
              <AutorenewIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText sx={{ mr: 2 }}>Load 10 random Favs</ListItemText>
          </MenuItem>
          <MenuItem disabled={location.pathname != '/favorites'} onClick={handleDeleteAll}>
            <ListItemIcon>
              <DeleteSweepIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText sx={{ mr: 2 }}>Delete all</ListItemText>
          </MenuItem>
          <MenuItem
            disabled={location.pathname != '/favorites' || favoriteCharactersDeleted.length == 0}
            onClick={handleUndoDelete}
          >
            <ListItemIcon>
              <UndoIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText sx={{ mr: 2 }}>{`Undo delete (${favoriteCharactersDeleted.length})`}</ListItemText>
            {/* <Typography variant="body2" color="text.secondary">
              ⌘+Z
            </Typography> */}
          </MenuItem>
          <Divider />
          <MenuItem disabled={location.pathname != '/favorites'} onClick={handleSortList}>
            <ListItemIcon>
              <SortIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText sx={{ mr: 2 }}>Sort List</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleAbout}>
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
