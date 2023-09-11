import { Input } from "antd";
import useListingStore from "../../store/listing";

const Description = () => {
  const { TextArea } = Input;
  const listing = useListingStore((state) => state.listing);
  const setDescription = useListingStore((state) => state.setDescription);
  const setTitle = useListingStore((state) => state.setTitle);
 
  const onChangeDescription = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };
  const onChangeTitle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTitle(e.target.value);
  };

  return (
    <div className="grid gap-4">
      <div>
        <h2 className="text-xl font-bold">How do you describe your place ?</h2>
        <h2>Short and sweet works best</h2>
      </div>
      <div className="grid gap-4 mb-2">
        <Input
          placeholder="title"
          type="text"
          value={listing.title}
          onChange={onChangeTitle}
        />
        <TextArea
          showCount
          maxLength={100}
          value={listing.description}
          onChange={onChangeDescription}
          style={{ resize: "none" }}
        />
      </div>
    </div>
  );
};

export default Description;
