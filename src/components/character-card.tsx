import { Paper, Stack, Typography, Card, CardActions, CardContent, Box, ButtonBase } from '@mui/material';
import { CustomButtonPrimary } from '../lib/utils.tsx';
import { Character } from '../lib/definitions.tsx';
import ContentLoader from 'react-content-loader';
import { useContext } from 'react';
import { MyContext } from '../routes/root-page.tsx';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { IMyContext } from '../context/context.tsx';

interface ICharacterCard {
  character: Character;
  deleteFavoriteCharacter?: (character: Character) => void;
  addCharacter?: (character: Character) => void;
  isFavorite: boolean;
}

export default function CharacterCard({ character, isFavorite }: ICharacterCard) {
  const { favoriteCharacters, deleteFavoriteCharacter, addNewFavoriteCharacter }: IMyContext = useContext(MyContext);

  const isAdded = favoriteCharacters.find((c) => c.name == character.name) != undefined;

  return (
    <Box>
      <Card elevation={2} sx={{ margin: '3px' }}>
        <Stack direction={'row'} justifyContent={'space-between'} padding={1}>
          <CardContent sx={{ width: '60%' }}>
            <Typography fontSize={25} noWrap>
              {character.name}
            </Typography>
            <Typography>Height: {character.height} cm</Typography>
            <Typography>Birth year: {character.birth_year}</Typography>
            <Typography>Gender: {character.gender}</Typography>
          </CardContent>

          <CardActions>
            {isFavorite ? (
              <CustomButtonPrimary onClick={() => deleteFavoriteCharacter(character)}>Delete</CustomButtonPrimary>
            ) : (
              <ButtonBase
                disableRipple
                onClick={() => {
                  addNewFavoriteCharacter(character);
                }}
                disabled={isAdded}
              >
                <CustomButtonPrimary>
                  <StarRoundedIcon color={isAdded ? 'disabled' : 'secondary'} />
                </CustomButtonPrimary>
              </ButtonBase>
            )}
          </CardActions>
        </Stack>
      </Card>
    </Box>
  );
}

export const SkeletonLoader = ({ amount = 5 }: { amount?: number }) => {
  const Skeleton = () => (
    <Paper elevation={2} sx={{ margin: '3px' }}>
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
    </Paper>
  );

  return (
    <Stack direction="column" justifyContent="flex-start" alignItems="stretch" spacing={1} padding={1} className={'overFlowYScroll'}>
      {Array.from({ length: amount }, (_, index) => (
        <Skeleton key={index} />
      ))}
    </Stack>
  );
};
