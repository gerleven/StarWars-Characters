import { Box, Stack, Typography } from '@mui/material';
import { Form, useRouteError } from 'react-router-dom';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { IError } from '../lib/definitions.tsx';
import { CustomButtonPrimary } from '../lib/utils.tsx';

export default function RootErrorPage() {
  const error: IError = useRouteError() as IError;
  return (
    <>
      <Stack direction="column" alignItems={'center'} justifyContent={'center'} sx={{ width: '100vw' }}>
        <Box className="detailsPanel">
          <Stack direction="column" alignItems={'center'} justifyContent={'center'}>
            <Typography variant="h2" fontSize={'35px'}>
              Routing Error
            </Typography>
            <br />
            <br />

            <HighlightOffIcon style={{ scale: '3', color: '#a80000' }}></HighlightOffIcon>
            <br />
            <br />

            <Typography variant="caption" fontSize={'15px'} textAlign={'left'}>
              <p>The path does not exist...</p>
              <p>
                Error message: <i>{error.statusText || error.message}</i>
              </p>
            </Typography>

            <Form method="get" action="/" replace>
              <CustomButtonPrimary type="submit">Came Back</CustomButtonPrimary>
            </Form>
          </Stack>
        </Box>
      </Stack>
    </>
  );
}
