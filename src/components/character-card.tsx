import { Paper, Stack, Typography, Card, CardActions, CardContent } from "@mui/material";
import { CustomButtonPrimary } from "../lib/utils.tsx";
import { Character } from "../lib/definitions.tsx";
import ContentLoader from "react-content-loader";

export default function CharacterCard({ character, deleteCharacter }: { character: Character, deleteCharacter: any }) {
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
            <CustomButtonPrimary onClick={()=>deleteCharacter(character)}>Delete</CustomButtonPrimary>
          </CardActions>
        </Stack>
      </Card>
      
    </Paper>
    </>
  );
}

export const SkeletonLoader = () => {
  const Skeleton =()=>(<Paper elevation={3}>
    <Card>
      <ContentLoader
        speed={2}
        width={"100%"}
        height={161}
        viewBox="0 0 452 161"
        backgroundColor="#e8e8e8"
        foregroundColor="#f4f4f4"
        style={{padding: 5}}
      >
        <rect x="0" y="20" rx="9" ry="9" width="240" height="40" />
        <rect x="0" y="70" rx="5" ry="5" width="150" height="20" />
        <rect x="0" y="100" rx="5" ry="5" width="150" height="20" />
        <rect x="0" y="130" rx="5" ry="5" width="150" height="20" />
        <rect x="350" y="65" rx="9" ry="9" width="72" height="36" />
      </ContentLoader>
    </Card>
  </Paper>);

  return <Stack
    direction="column"
    justifyContent="flex-start"
    alignItems="stretch"
    spacing={1}
    padding={1}
    className={"overFlowYScroll"}
  >
   <Skeleton/> 
   <Skeleton/> 
   <Skeleton/> 
   <Skeleton/> 
   <Skeleton/> 
  </Stack>
};
