import { toast } from "react-hot-toast";
import { ICreateListing } from "../../types";
import { privateRequest } from "../requestMethod";
import { saveImageToCloudinary } from "../utils/saveImageToCloudinary";

export const createlisting = async (listing: ICreateListing, resetListing: any, handleCancel: any) => {

    const data = await saveImageToCloudinary(listing.images);
    privateRequest
        .post("/api/v1/listings", { ...listing, images: data })
        .then(() => {
            handleCancel()
            toast.success("Successfully created");
            resetListing()
        })
        .catch((err) => {
            console.log(err);
            toast.error("Failed to create");
            handleCancel()
        });
}


export const updateListing = async (listing: ICreateListing, resetListing: any, handleCancel: any) => {
    const newImageArray = listing.images.filter((img: any) => {
        return img.originFileObj !== undefined
    })
    const oldImageArray = listing.images.filter((img: any) => {
        return img.originFileObj === undefined
    })


    const data = await saveImageToCloudinary(newImageArray);
    let newData = [...data, ...oldImageArray]
    privateRequest
        .put(`/api/v1/listings/${listing.id}`, { ...listing, images: newData })
        .then(() => {
            resetListing()
            handleCancel()
            toast.success("Successfully updated");
        })
        .catch((err) => {
            console.log(err);
            toast.error("Failed to update");

        });
};


// Delete function may be implemented later for cloudinary.

// const deleteImages = async (newImages: any, listing: ICreateListing) => {
//     const response = await privateRequest.get(`/api/v1/listings/${listing.id}`)
//     const data = await response.data
//     const originalImages = data.images as Image[]
//     let deletedImages = []

//     for (let image of originalImages) {
//         let foundInNewImages = false
//         for (let newImage of newImages) {
//             if (image.url === newImage.url) {
//                 foundInNewImages = true
//                 break
//             }
//         }
//         if (!foundInNewImages) {
//             deletedImages.push(image)
//         }
//     }

//     const deletePromises = deletedImages.map(async (img) => {
//         const response = await fetch(
//             `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_APP_CLOUDINARY_NAME}/image/upload/${img}`,
//             {
//                 method: "DELETE",
//                 mode: 'no-cors'
//             }
//         );
//         return response;
//     });
//     const deleteResponses = await Promise.all(deletePromises);
// }