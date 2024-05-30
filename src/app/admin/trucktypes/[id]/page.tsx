import TruckTypeDetails from '@/modules/admin/trucktypes/TruckTypeDetails';

async function SingleTruckType({
  params,
}: {
  params: {
    id: string;
  };
}) {
  return <TruckTypeDetails id={params.id} />;
}
export default SingleTruckType;
