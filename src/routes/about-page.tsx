import { Box, Paper, Stack, Typography } from '@mui/material';
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
              <Typography  fontSize={'35px'} noWrap textOverflow="ellipsis" >
                About me
              </Typography>
              <Typography textAlign={"left"}>
                Hi! I'm Germán Levental and I'm a <span style={{fontFamily: "monospace", color: "#dd9d00"}}><i>Semi Senior (Advanced) React Frontend Developer</i></span> with <b>4+</b> years of experience and <b>B2+</b> English proficiency.
                <br/>
                <br/>
                Check out my LinkedIn clicking the "Ver Perfil" button!
                <br/>
                <br/>
              </Typography>
              
              <LinkedinLink dataTheme='dark'/>
              
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
