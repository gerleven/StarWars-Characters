import { Paper, Stack, Typography, Card, CardActions, CardContent } from '@mui/material';
import { CustomButtonPrimary } from '../lib/utils.tsx';
import { Character, IMyContext } from '../lib/definitions.tsx';
import ContentLoader from 'react-content-loader';
import { useContext } from 'react';
import { MyContext } from '../routes/root-page.tsx';

interface ICharacterCard {
  character: Character;
  deleteCharacter?: (character: Character) => void;
  addCharacter?: (character: Character) => void;
}

export default function CharacterCard({ character, deleteCharacter, addCharacter }: ICharacterCard) {
  const { characters }: IMyContext = useContext(MyContext);
  
  return (
    <>
      <Paper elevation={2}>
        <Card>
          <Stack direction={'row'} justifyContent={'space-between'} padding={1}>
            <CardContent sx={{ width: '70%' }}>
              <Typography fontSize={25} noWrap>
                {character.name}
              </Typography>
              <Typography>Height: {character.height} cm</Typography>
              <Typography>Birth year: {character.birth_year}</Typography>
              <Typography>Gender: {character.gender}</Typography>
            </CardContent>
            {deleteCharacter && (
              <CardActions>
                <CustomButtonPrimary onClick={() => deleteCharacter(character)}>Delete</CustomButtonPrimary>
              </CardActions>
            )}
            {addCharacter && (
              <CardActions>
                <CustomButtonPrimary disabled={characters.find(c=>c.name == character.name)!=undefined} onClick={()=>{addCharacter(character)}}>Add To Favs</CustomButtonPrimary>
              </CardActions>
            )}
          </Stack>
        </Card>
      </Paper>
    </>
  );
}

export const SkeletonLoader = ({amount=5}: {amount?: number}) => {
  const Skeleton = () => (
    <Paper elevation={3}>
      <Card>
        <ContentLoader
          speed={2}
          width={'100%'}
          height={161}
          viewBox="0 0 452 161"
          backgroundColor="#e8e8e8"
          foregroundColor="#f4f4f4"
          style={{ padding: 5 }}
        >
          <rect x="0" y="20" rx="9" ry="9" width="240" height="40" />
          <rect x="0" y="70" rx="5" ry="5" width="150" height="20" />
          <rect x="0" y="100" rx="5" ry="5" width="150" height="20" />
          <rect x="0" y="130" rx="5" ry="5" width="150" height="20" />
          <rect x="350" y="65" rx="9" ry="9" width="72" height="36" />
        </ContentLoader>
      </Card>
    </Paper>
  );

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={1}
      padding={1}
      className={'overFlowYScroll'}
    >
      {Array.from({ length: amount }, (_, index) => (
        <Skeleton key={index} />
      ))}
    </Stack>
  );
};
