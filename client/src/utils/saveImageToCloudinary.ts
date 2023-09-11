
export const saveImageToCloudinary = async (images: any) => {
  
    const formDataArray = images.map((s: any) => {

        const formData = new FormData();
        formData.append("file", s.originFileObj);
        formData.append("upload_preset", "my_uploads");
        return formData;


    });

    const promises = formDataArray.map(async (formData: any) => {
        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_APP_CLOUDINARY_NAME
                }/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            const data = await response.json();
            return data;
        } catch (err) {
            console.log(err);
        }
    });

    return Promise.all(promises);
};