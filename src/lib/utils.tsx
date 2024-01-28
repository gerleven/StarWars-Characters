import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";


export const CustomButtonPrimary = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    filter: "brightness(0.97)", //hover effect in custom buttons
  },
  "&:focus": {
    outline: "none",
  },
}));

export const CustomButtonSecondary = styled(Button)<ButtonProps>(
  ({ theme }) => ({
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      filter: "brightness(0.97)", //hover effect in custom buttons
    },
    "&:focus": {
      outline: "none",
    },
  })
);