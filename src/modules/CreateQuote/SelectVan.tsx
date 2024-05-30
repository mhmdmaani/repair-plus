import { styled } from '@mui/material';
import { Settings, TruckType } from 'prisma/prisma-client';
import VanItem from './VanItem';

const Container = styled('div')`
  height: calc(100vh - 160px);
  width: 100%;
  padding: 15px 20px;
  overflow-y: auto;
  @media (max-width: 768px) {
    padding: 0 10px 10px 10px;
    height: 100%;
  }
  :after {
    content: '';
    display: block;
    height: 20px;
  }
`;

export default function SelectVan({
  selectedItem,
  setSelectedItem,
  vans = [],
  period,
  settings,
}: {
  selectedItem: any;
  setSelectedItem: (item: any) => void;
  vans: TruckType[];
  period?: any;
  settings: Settings;
}) {
  return (
    <Container>
      {vans.map((van, index) => (
        <VanItem
          key={index}
          name={van.name}
          length={van.length}
          width={van.width}
          height={van.height}
          maxLoad={van.maxWeight}
          carries={van.carries}
          price={
            period
              ? `${van.standardPricePerMin * period} ${settings.currencySymbol}`
              : ''
          }
          image={van.image}
          selected={selectedItem?.name === van.name}
          onClick={() => setSelectedItem(van)}
        />
      ))}
    </Container>
  );
}
