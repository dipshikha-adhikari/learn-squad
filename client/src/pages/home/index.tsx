import CategoryBar from "../../components/CategoryBar";
import ListingsGallery from "../../components/listings/ListingsGallery";

const Home = () => {

  return (
    <>
      <CategoryBar />
      <div className="pt-[12vh] ">
       <ListingsGallery/>
      </div>
    </>
  );
};

export default Home;
