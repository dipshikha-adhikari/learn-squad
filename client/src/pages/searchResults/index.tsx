import CategoryBar from "../../components/CategoryBar";
import ListingsGallery from "../../components/listings/ListingsGallery";

const SearchResults = () => {
  return (
    <div className="">
      <CategoryBar />
      <div className="relative top-[12vh] ">
        <ListingsGallery />
      </div>
    </div>
  );
};

export default SearchResults;
