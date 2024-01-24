import { AccountCircle } from "@mui/icons-material";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputAdornment,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CustomButtonPrimary } from "../lib/utils";
import HeightIcon from '@mui/icons-material/Height';
import CakeIcon from '@mui/icons-material/Cake';
import WcIcon from '@mui/icons-material/Wc';

const NewCharacterPage = () => {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState({});
  
  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data)
  }

  return (
    <Stack padding={2}>
      <Paper elevation={3}>
        <Grid container padding={3} gap={4} direction={"column"}>
          <Grid item>
            <Typography variant="h4">Create a new Character!</Typography>
          </Grid>
          <Grid item>
            <form
              onSubmit={handleSubmit(onSubmit)}
            >
              <Grid container padding={1} gap={3} direction={"column"}>
                <Grid item>
                  <TextField
                  defaultValue={"Luke"}
                    {...register("name")}
                    fullWidth
                    label="Name"
                    id="Name-input"
                    type="text"
                    error={false}
                    disabled={false}
                    required={true}
                    helperText="Enter a Name"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                  defaultValue={172}
                    {...register("height")}
                    fullWidth
                    label="Height"
                    id="Height-input"
                    type="number"
                    error={false}
                    disabled={false}
                    required={true}
                    helperText="Enter a height"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">Cm.</InputAdornment>
                      ),
                      startAdornment: (
                        <InputAdornment position="start">
                          <HeightIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                  defaultValue={"172bwa"}
                    {...register("birth_year")}
                    fullWidth
                    label="Birth year"
                    id="Birth-input"
                    type="text"
                    error={false}
                    disabled={false}
                    required={true}
                    helperText="Enter birth year"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CakeIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                  defaultValue={"Male"}
                    {...register("gender")}
                    fullWidth
                    label="Gender"
                    id="Gender-input"
                    type="text"
                    error={false}
                    disabled={true}
                    required={true}
                    helperText="Enter gender"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <WcIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                      <FormControlLabel value="male" control={<Radio />} label="Male" />
                      <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                  </FormControl>

                </Grid>
                <Grid item>
                  <CustomButtonPrimary fullWidth type="submit">
                    Create
                  </CustomButtonPrimary>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </Stack>
  );
};

export default NewCharacterPage;
