import HotelDetails from "@/components/all-hotels/HotelDetails";

const ViewHotelPage = ({ params }: { params: { id: string } }) => {
  return <HotelDetails id={params.id} />;
};

export default ViewHotelPage;
