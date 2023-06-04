import React from 'react';
import { Box, List, ListItem, Typography, Grid } from '@mui/material';

export default function UserConnections({followers,following}) {
  const followers = ['User 1', 'User 2', 'User 3'];
  const following = ['User 4', 'User 5', 'User 6'];

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h6">Followers</Typography>
          <List>
            {followers.map((follower, index) => (
              <ListItem key={index}>{follower}</ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">Following</Typography>
          <List>
            {following.map((followed, index) => (
              <ListItem key={index}>{followed}</ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
}