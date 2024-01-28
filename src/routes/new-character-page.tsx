import { AccountCircle } from "@mui/icons-material";
import {
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useContext } from "react";
import { useForm } from "react-hook-form";
import { CustomButtonPrimary, CustomButtonSecondary } from "../lib/utils";
import HeightIcon from "@mui/icons-material/Height";
import CakeIcon from "@mui/icons-material/Cake";
import WcIcon from "@mui/icons-material/Wc";
import { MyContext } from "./root-page";
import { useNavigate } from "react-router-dom";
import { Character } from "../lib/definitions";

const NewCharacterPage = () => {
  const { register, handleSubmit } = useForm();
  // const [data, setData] = useState({});

  const { addNewCharacter } = useContext(MyContext);

  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    const newCharacter = {
      name: data.name,
      birth_year: data.birth_year,
      gender: data.gender,
      height: data.height,
    } as Character;
    addNewCharacter(newCharacter);
    navigate("/");
  };

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "n/a", label: "Other" },
  ];

  return (
    <Stack padding={2}>
      <Paper elevation={3}>
        <Grid container padding={3} gap={4} direction={"column"}>
          <Grid item>
            <Typography variant="h4">Create a new Character!</Typography>
          </Grid>
          <Grid item>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container padding={1} gap={3} direction={"column"}>
                <Grid item>
                  <TextField
                    defaultValue={"Anakin Skywalker"}
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
                    defaultValue={188}
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
                    defaultValue={"41.9BBY"}
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
                    defaultValue="male"
                    {...register("gender")}
                    fullWidth
                    id="Gender-input"
                    select
                    label="Gender"
                    helperText="Select Gender"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <WcIcon />
                        </InputAdornment>
                      ),
                    }}
                  >
                    {genderOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item container columns={2} spacing={1} direction={"row"}>
                  <Grid item xs={1}>
                    <CustomButtonSecondary fullWidth disabled>
                      Clear
                    </CustomButtonSecondary>
                  </Grid>
                  <Grid item xs={1}>
                    <CustomButtonSecondary fullWidth disabled>
                      Load Random
                    </CustomButtonSecondary>
                  </Grid>

                  <Grid item xs={2}>
                    <CustomButtonPrimary fullWidth type="submit">
                      Create
                    </CustomButtonPrimary>
                  </Grid>
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
