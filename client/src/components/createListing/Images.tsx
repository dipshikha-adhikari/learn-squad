import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import type { UploadProps } from "antd/es/upload";
import type { RcFile, UploadFile } from "antd/es/upload/interface";
import useListingStore from "../../store/listing";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const App = (props: any) => {
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const listing = useListingStore((state) => state.listing);
  const setImages = useListingStore((state) => state.setImages);

  useEffect(() => {
    if (props.modalType === "updateListing") {
      const files = listing.images.map((image, index) => {
        return { url: image.url, uid: `-${index}`, name: `image-${index}.jpg` , publicId:image.public_id};
      });
      setFileList(files);
    }
  }, [listing.images]);

  const handleChange: UploadProps["onChange"] = async ({
    fileList: newFileList,
  }) => {
    const updatedFileList = await Promise.all(
      newFileList.map(async (file) => {
        if (!file.url && file.originFileObj) {
          file.url = await getBase64(file.originFileObj as RcFile);
        }
        return file;
      })
    );

    setFileList(updatedFileList);
    setImages(updatedFileList);
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onChange={handleChange}
      >
        {fileList.length >= 5 ? null : uploadButton}
      </Upload>
    </>
  );
};

export default App;
