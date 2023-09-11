import CategoryBar from "../../components/CategoryBar";
import ListingsGallery from "../../components/listings/ListingsGallery";

const Home = () => {

  return (
    <>
      <CategoryBar />
      <div className="pt-[15vh] ">
       <ListingsGallery/>
      </div>
    </>
  );
};

export default Home;
