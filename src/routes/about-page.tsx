import { Box, Paper, Stack, Typography } from '@mui/material';
import { Form } from 'react-router-dom';
import { CustomButtonPrimary } from '../lib/utils.tsx';

export default function AboutPage() {
  return (
    <>
      <Paper elevation={3}>
        <Stack direction="column" alignItems={'center'} justifyContent={'center'}>
          <Box className="detailsPanel">
            <Stack direction="column" alignItems={'center'} justifyContent={'center'}>
              <Typography  fontSize={'35px'} noWrap textOverflow="ellipsis" >
                About Page
              </Typography>
              <br />
              <br />

              <Typography variant="caption" fontSize={'15px'} textAlign={'center'} noWrap textOverflow="ellipsis" >
                Page in construction.
              </Typography>

              <br/>
              <Form method="get" action="/" replace>
                <CustomButtonPrimary type="submit">Came Back</CustomButtonPrimary>
              </Form>
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </>
  );
}
