import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
}));

const LoadingScreen = ({ isLoading }) => {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={isLoading} style={{display: 'flex', flexDirection: 'column'}}>
      <CircularProgress color="inherit" />
      <p>Loading...</p>
    </Backdrop>
  );
};

export default LoadingScreen;