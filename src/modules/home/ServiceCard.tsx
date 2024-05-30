import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  styled,
} from '@mui/material';
import Link from 'next/link';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';

const ImageContainer = styled('div')`
  width: 100%;
  height: 250px;
  object-fit: cover;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const ReadMore = styled(Link)`
  text-decoration: none;
  font-size: 14px;
  font-family: 'Poppins', sans-serif;
  color: ${(props) => props.theme.palette.primary.main};
  font-weight: bold;
  transition: all 0.5s ease-in-out;
  display: flex;
  align-items: center;
  :hover {
    color: ${(props) => props.theme.palette.primary.dark};
  }
`;

export default function ServiceCard({
  title,
  description,
  image,
  ...props
}: {
  title: string;
  description: string;
  image: string;
  props?: any;
}) {
  return (
    <Card {...props}>
      <ImageContainer>
        <CardMedia component='img' image={image} alt={title} />
      </ImageContainer>
      <CardContent>
        <Typography variant='h6'>{title}</Typography>
        <Typography variant='body2' color={'GrayText'}>
          {description}
        </Typography>

        <ReadMore href={''}>
          Read More <MdKeyboardDoubleArrowRight />
        </ReadMore>
      </CardContent>
    </Card>
  );
}
