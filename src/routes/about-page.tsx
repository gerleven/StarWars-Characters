import { Box, Stack, Typography } from "@mui/material";
import { Form } from "react-router-dom";
import { CustomButtonPrimary } from "../lib/utils.tsx";

export default function AboutPage() {
  return (
    <>
      <Stack direction="column" alignItems={"center"} justifyContent={"center"}>
        <Box className="detailsPanel">
          <Stack
            direction="column"
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Typography variant="h2" fontSize={"35px"}>
              About Page
            </Typography>
            <br />
            <br />

            <Typography variant="caption" fontSize={"15px"} textAlign={"left"}>
              <p>Page in construction..</p>
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
