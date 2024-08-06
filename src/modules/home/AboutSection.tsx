import FadeInUp from '@/components/ui/FadeInUp';
import {
  Button,
  Container,
  Fade,
  Grid,
  Typography,
  styled,
} from '@mui/material';
import Link from 'next/link';

const MainContainer = styled('div')`
  padding: 80px 0;
`;

const Tagline = styled(Typography)`
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
  @media (max-width: 400px) {
    font-size: 1rem;
  }
`;
const Divider = styled('div')`
  width: 120px;
  height: 5px;
  background: ${(props) => props.theme.palette.primary.main};
  margin-top: 10px;
  border-radius: 20px;
  margin-bottom: 10px;
`;

const ImageContainer = styled('div')`
  width: 100%;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const CustomButton = styled(Button)`
  height: 50px;
  width: 200px;
  margin-top: 20px;
  padding: 0 10px;
  position: relative;
  background: transparent;
  border: 2px solid ${(props) => props.theme.palette.primary.main};
  color: ${(props) => props.theme.palette.primary.main};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  text-transform: uppercase;
  gap: 10px;
  transition: all 0.5s ease-in-out;
  z-index: 1;
  overflow: hidden;
  :before {
    content: '';
    position: absolute;
    background: ${(props) => props.theme.palette.primary.main};
    width: 100%;
    height: 100%;
    z-index: -1;
    transform: translateX(-100%);
    transform-origin: 0 50%;
    transition: transform 0.3s;
  }
  :hover:before {
    transform: translateX(0);
  }
  :hover {
    color: ${(props) => props.theme.palette.common.white};
  }
`;

const Title = styled(Typography)`
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
  @media (max-width: 400px) {
    font-size: 1.2rem;
  }
`;

const Description = styled(Typography)`
  font-size: 1.25rem;
  @media (max-width: 600px) {
    font-size: 1.25rem;
  }
  @media (max-width: 400px) {
    font-size: 1rem;
  }
`;

const UnstyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
export default function AboutSection({
  displayMore,
}: {
  displayMore?: boolean;
}) {
  return (
    <MainContainer>
      <Container>
        <Grid
          container
          spacing={3}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Fade in timeout={1500}>
              <h1 className='text-start w-full heading mb-8'>
                Om
                <span className='text-purple'> oss</span>
              </h1>
            </Fade>
            <Fade in timeout={1600}>
              <Title variant='h3' fontWeight={'bold'}></Title>
            </Fade>

            <div data-aos='fade-right'>
              <Description color={'white'}>
                Välkommen till Repair Plus, din pålitliga partner för reparation
                av elektroniska enheter. Vi är engagerade i att erbjuda
                högkvalitativa reparations tjänster för ett brett spektrum av
                elektroniska enheter, inklusive smartphones, surfplattor,
                PlayStation-konsoler, elsparkcyklar och mer. Vår mission är att
                leverera pålitliga, effektiva och prisvärda reparationstjänster
                för att få dina enheter tillbaka i perfekt skick.
              </Description>

              <Description color={'white'} mt={1}>
                På Repair Plus förstår vi den olägenhet och frustration som
                följer med en trasig enhet. Därför är vårt team av erfarna och
                certifierade tekniker engagerade i att snabbt och noggrant
                diagnostisera och åtgärda dina elektroniska problem. Oavsett om
                det handlar om en sprucken skärm, batteriproblem, mjukvarufel
                eller någon annan teknisk glitch, har vi expertisen att hantera
                det hela.
              </Description>
            </div>
            {displayMore && (
              <FadeInUp>
                <UnstyledLink href='/about'>
                  <CustomButton variant='contained'>LÄS MER</CustomButton>
                </UnstyledLink>
              </FadeInUp>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <ImageContainer data-aos='fade-left'>
              <img
                src='./about.png'
                alt='delivery'
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </ImageContainer>
          </Grid>
        </Grid>
      </Container>
    </MainContainer>
  );
}
