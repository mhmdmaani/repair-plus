import { Container, Grid, styled, Typography } from '@mui/material';
import {
  FaCertificate,
  FaDollarSign,
  FaFastForward,
  FaLeaf,
  FaMedal,
  FaRegThumbsUp,
  FaShippingFast,
  FaSmile,
  FaWrench,
} from 'react-icons/fa';
import { RiTeamFill } from 'react-icons/ri';
import ChooseUsCard from './ChooseUsCard';

const MainContainer = styled('div')`
  padding: 60px 0;
`;

const TitleContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
const Tagline = styled(Typography)`
  text-align: center;
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
const Title = styled(Typography)`
  text-align: center;
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

export default function ChooseUs() {
  return (
    <MainContainer>
      <Container>
        <TitleContainer>
          <Tagline
            data-aos='fade-up'
            variant='h5'
            color={'primary'}
            fontWeight={'bold'}
          >
            VARFÖR VÄLJA OSS
          </Tagline>
          <Title data-aos='fade-up' variant='h3' fontWeight={'bold'}>
            Varför våra kunder väljer oss!
          </Title>
          <Divider data-aos='fade-up' />
          <Typography data-aos='fade-up' variant='body1' color={'GrayText'}>
            Vi är ett team av engagerade yrkespersoner, redo att göra vad som
            krävs för att hjälpa ditt företag att växa.
          </Typography>
        </TitleContainer>
        <Grid
          container
          justifyContent={'center'}
          alignItems={'center'}
          spacing={3}
          marginY={4}
        >
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
            <ChooseUsCard
              data-aos='fade-up'
              Icon={
                <div data-aos='zoom-in' data-aos-delay='500'>
                  <FaFastForward size={50} color='#FFC107' />
                </div>
              }
              title='Snabb leverans'
              description={`
               Vi vet hur viktigt din enhet är för dig, och därför prioriterar vi snabba och effektiva reparationer. De flesta problem åtgärdas inom 24 till 48 timmar, så att du kan återgå till din vardag utan långa förseningar.
            `}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
            <ChooseUsCard
              data-aos='fade-up'
              Icon={
                <div data-aos='zoom-in' data-aos-delay='500'>
                  <FaMedal
                    data-aos='zoom-in'
                    data-aos-delay='300'
                    size={50}
                    color='#FFC107'
                  />
                </div>
              }
              title='Erfarenhet'
              description={`
               Med över ett decennium av praktisk erfarenhet har vårt team sett och reparerat allt. Oavsett om det handlar om en enkel skärmbyte eller en komplex moderkortsreparation, säkerställer vår omfattande kunskap att din enhet är i trygga händer.
            `}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
            <ChooseUsCard
              data-aos='fade-up'
              Icon={
                <div data-aos='zoom-in' data-aos-delay='500'>
                  <FaCertificate
                    data-aos='zoom-in'
                    data-aos-delay='300'
                    size={50}
                    color='#FFC107'
                  />
                </div>
              }
              title='Certifierade tekniker'
              description={`
               Våra tekniker är inte bara erfarna, utan även certifierade inom olika reparationsområden. Detta säkerställer att varje reparation uppfyller de högsta kvalitets- och tillförlitlighetsstandarderna.
            `}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
            <ChooseUsCard
              data-aos='fade-up'
              Icon={
                <div data-aos='zoom-in' data-aos-delay='500'>
                  <FaDollarSign
                    data-aos='zoom-in'
                    data-aos-delay='300'
                    size={50}
                    color='#FFC107'
                  />
                </div>
              }
              title='Prisvärd prissättning'
              description={`
             Högkvalitativa reparationer behöver inte vara dyra. Vi erbjuder konkurrenskraftiga priser på alla våra tjänster, vilket ger dig bästa möjliga värde för pengarna.
            `}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
            <ChooseUsCard
              data-aos='fade-up'
              Icon={
                <div data-aos='zoom-in' data-aos-delay='500'>
                  <FaRegThumbsUp
                    data-aos='zoom-in'
                    data-aos-delay='300'
                    size={50}
                    color='#FFC107'
                  />
                </div>
              }
              title='Kvalitetsdelar'
              description={`
              Vi använder endast delar av högsta kvalitet för alla reparationer, vilket säkerställer att din enhet fungerar som ny. Vår kompromisslösa inställning till kvalitet betyder att din enhet kommer att hålla längre och prestera bättre.
            `}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
            <ChooseUsCard
              data-aos='fade-up'
              Icon={
                <div data-aos='zoom-in' data-aos-delay='500'>
                  <FaSmile
                    data-aos='zoom-in'
                    data-aos-delay='300'
                    size={50}
                    color='#FFC107'
                  />
                </div>
              }
              title='Kundnöjdhetsgaranti'
              description={`
            Din tillfredsställelse är vår högsta prioritet. Vi står bakom kvaliteten på vårt arbete med en nöjdhetsgaranti, så du kan vara säker på att din enhet är i goda händer.
            `}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
            <ChooseUsCard
              data-aos='fade-up'
              Icon={
                <div data-aos='zoom-in' data-aos-delay='500'>
                  <FaWrench
                    data-aos='zoom-in'
                    data-aos-delay='300'
                    size={50}
                    color='#FFC107'
                  />
                </div>
              }
              title='Brett utbud av tjänster'
              description={`
         Från smartphones och surfplattor till spelkonsoler och elsparkcyklar, vi hanterar reparationer av ett brett spektrum av elektroniska enheter. Oavsett problemet, har vi en lösning för dig.
            `}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
            <ChooseUsCard
              data-aos='fade-up'
              Icon={
                <div data-aos='zoom-in' data-aos-delay='500'>
                  <FaLeaf
                    data-aos='zoom-in'
                    data-aos-delay='300'
                    size={50}
                    color='#FFC107'
                  />
                </div>
              }
              title='Miljövänligt förhållningssätt'
              description={`
       Vi är engagerade i att minska elektroniskt avfall genom att förlänga livslängden på dina enheter. Genom att välja oss, sparar du inte bara pengar utan bidrar också till en grönare planet.
            `}
            />
          </Grid>
        </Grid>
      </Container>
    </MainContainer>
  );
}
