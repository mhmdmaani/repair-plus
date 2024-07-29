import { Card, CardContent, CardMedia, styled } from '@mui/material';
import Link from 'next/link';
import Slider from 'react-slick';

const SliderContainer = styled('div')`
  width: 80%;
  margin: 0 auto;
`;

const CustomCard = styled('div')`
  transition: all 0.5s ease-in-out;
  perspective: 1000px;
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  :hover img {
    transform: scale(1.1);
    opacity: 1;
  }
`;

const CustomImage = styled('img')`
  transform-style: preserve-3d;
  transition: all 0.5s ease-in-out;
  height: 200px;
  width: auto;
  opacity: 0.8;
`;

const CustomCardMedia = styled(CardMedia)`
  background-size: contain;
  background-position: center;
`;

const Title = styled('h2')`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
`;
const CardContainer = styled('div')`
  padding: 20px;
`;

const Description = styled('p')`
  font-size: 16px;
`;

const UnstyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const CardSlider = ({ items }: { items: any }) => {
  const settings = {
    dots: false,
    infinite: false,
    autoPlay: true,
    speed: 500,
    slidesToShow: 3, // Number of cards per slide
    slidesToScroll: 1,
  };

  return (
    <SliderContainer>
      <Slider {...settings}>
        {items?.map((card: any, index: number) => (
          <UnstyledLink key={card.id} href={`/fix/model/${card.id}`}>
            <CardContainer>
              <CustomCard key={index}>
                <CustomCardMedia>
                  <CustomImage src={card.image} alt={card.title} />
                </CustomCardMedia>
                <CardContent>
                  <Title>{card.name}</Title>
                </CardContent>
              </CustomCard>
            </CardContainer>
          </UnstyledLink>
        ))}
      </Slider>
    </SliderContainer>
  );
};

export default CardSlider;
