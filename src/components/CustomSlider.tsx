import { CardContent, CardMedia, styled } from '@mui/material';
import Link from 'next/link';
import Slider from 'react-slick';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

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

// Custom arrow components
const ArrowButton = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  color: white;
  cursor: pointer;
  position: absolute;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
`;

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <ArrowButton style={{ right: '-20px' }} onClick={onClick}>
      <FiChevronRight size={50} />
    </ArrowButton>
  );
};

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <ArrowButton className='' style={{ left: '-20px' }} onClick={onClick}>
      <FiChevronLeft size={50} />
    </ArrowButton>
  );
};

const CardSlider = ({ items }: { items: any }) => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <SliderContainer>
      <Slider {...settings}>
        {items?.map((card: any) => (
          <UnstyledLink key={card.id} href={`/fix/model/${card.id}`}>
            <CardContainer>
              <CustomCard>
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
