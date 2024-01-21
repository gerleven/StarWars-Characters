import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import { ButtonBase, ButtonBaseProps } from "@mui/material";

export const CustomBaseButton = styled(ButtonBase)<ButtonBaseProps>(() => ({
  "&:hover": {
    filter: "brightness(0.95)", //hover effect in the operations rows 
  },
  "&:focus": {
    outline: "none", //hide focus border
  },
}));

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
