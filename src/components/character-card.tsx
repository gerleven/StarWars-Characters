import { Paper, Stack, Typography, Card, CardActions, CardContent } from "@mui/material";
import { CustomButtonPrimary } from "../lib/utils.tsx";
import { Character } from "../lib/definitions.tsx";

export default function CharacterCard({ character }: { character: Character }) {
  return (
    <>
    <Paper elevation={3}>
      <Card>
      
        <Stack direction={"row"} justifyContent={"space-between"} padding={1}>
        <CardContent>
          
          <Typography variant="h4">{character.name}</Typography>
          <Typography>Height: {character.height} cm</Typography>
          <Typography>Birth year: {character.birth_year}</Typography>
          <Typography>Gender: {character.gender}</Typography>
        </CardContent>
        <CardActions>
          <CustomButtonPrimary>Delete</CustomButtonPrimary>
        </CardActions>
          
        </Stack>
      </Card>
      
    </Paper>
    </>
  );
}
