import CircularProgress from '@mui/material/CircularProgress';
import { Grid, Typography } from '@mui/material';

export default function Loading() {
  return (
    <Grid data-testid={'loading'} container sx={{ display: 'flex', padding: 1 }}>
      <Grid sx={{marginLeft: 'auto', marginRight: 'auto', color:'#6e5f55' }}>
        <CircularProgress sx={{color:'#6e5f55', marginLeft: '20px'}} />
        <Typography variant="button" display="block" gutterBottom>Loading...</Typography> 
      </Grid>
    </Grid>
  );
}