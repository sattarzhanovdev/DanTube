import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));


export default function Progress() {
  let [ value, setValue ] = React.useState(0)

  if(value !== 100){
    setInterval(() => {
      setValue(value += 6)
    }, [2000])
  }else{
    alert('Добавлено!')
  }

  return (
    <Box 
      sx={{ flexGrow: 1 }}
      style={{ 
        height: '100vh',
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
      }}
    >
      <br />
      <BorderLinearProgress style={{width: '300px'}} variant="determinate" value={value} />
    </Box>
  );
}