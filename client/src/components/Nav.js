import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import StatsModal from './StatsModal';
import HelpModal from './HelpModal';
import Chip from '@mui/material/Chip';
import FaceIcon from '@mui/icons-material/Face';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { Grid } from '@mui/material';
import LeaderModal from './LeaderBoardModal';

const pages = [];

export function ResponsiveAppBar({ displayName, user }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  return (
    <AppBar position="static">
      <Grid container  justifyContent='space-between' alignItems='center' padding>
        <div className='left-nav'>

         <StatsModal user={user}/>
          <LeaderModal />
        </div>
          <div className='app-name'>
              <LibraryMusicIcon />
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                Name That Tune
              </Typography>
          </div>
          <div className='icons'>
            <HelpModal />
            
              <Chip icon={<FaceIcon />} label={displayName} variant="filled" color="secondary" />
          </div>
      </Grid>
    </AppBar>
  );
};
export default ResponsiveAppBar;
