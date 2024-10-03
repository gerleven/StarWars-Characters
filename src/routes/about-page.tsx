import { Box, Link, Paper, Stack, Typography } from '@mui/material';
import { Form } from 'react-router-dom';
import { CustomButtonPrimary } from '../lib/utils.tsx';
import LinkedinLink from '../components/linkedin-link.tsx';

export default function AboutPage() {
  return (
    <>
      <Paper elevation={3}>
        <Stack direction="column" alignItems={'center'} justifyContent={'center'}>
          <Box className="detailsPanel">
            <Stack direction="column" alignItems={'center'} justifyContent={'center'}>
              <Typography fontSize={'35px'} noWrap textOverflow="ellipsis">
                About me:
              </Typography>
              <LinkedinLink dataTheme="light" dataSize="large" dataType="HORIZONTAL" />
              <br />
              <Typography textAlign={'left'}>Check out my LinkedIn clicking the "Ver Perfil" button!</Typography>
              <br />
              <br />
              

              <Typography textAlign={'left'}>
                Repository: <Link href="https://github.com/gerleven/StarWars-Characters">github.com/gerleven/StarWars-Characters</Link>
              </Typography>
              <br />
              <Typography textAlign={'left'}>
                Deployed Site: <Link href="https://gerleven.github.io/StarWars-Characters">gerleven.github.io/StarWars-Characters</Link>
              </Typography>
              <br />

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
