import React, { useState, useEffect, MouseEvent } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { IListing, IUser } from "../../../types";
import { useModal } from "../../hooks/useModal";
import CreatelistingModal from "../../components/modals/CreateListingModal";
import { toast } from "react-hot-toast";
import { privateRequest } from "../../requestMethod";
import { useQueryClient } from "react-query";
import useListingStore from "../../store/listing";

type MenuItem = Required<MenuProps>["items"][number];

const rootSubmenuKeys = ["sub1"];

interface DropdownProps {
  user: IUser | null;
  listings: IListing[] | undefined;
}

const DropdownComponent = ({ user, listings }: DropdownProps) => {
  const [openKeys, setOpenKeys] = useState([""]);
  const [dynamicItems, setDynamicItems] = useState<MenuItem[]>([]);
  const { showModal, modalType, handleCancel, isModalOpen } = useModal();
  const queryClient = useQueryClient();
  const {
    setCategory,
    setLocation,
    setListingId,
    setBathrooms,
    setRooms,
    setGuests,
    setImages,
    setTitle,
    setPrice,
    setDescription,
  } = useListingStore();

  function getItem(
    label: React.ReactNode,
    key: string,
    listing: any,
    showModal: (params: any) => void,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem {
    return {
      key,
      listing,
      children,
      label: (
        <a
          className={`  ${key === "sub1" && "text-xl p-4"} link pb-10`}
          onClick={(e) => handleEdit(e, listing, showModal)}
        >
          {label}
        </a>
      ),

      type,
    } as MenuItem;
  }

  async function handleEdit(e: MouseEvent, listing: IListing, showModal: any) {
    if (e.currentTarget.textContent === "Edit") {
      getPreviousData(listing);
      showModal("updateListing");
    }
    if (e.currentTarget.textContent === "Delete") {
      try {
        toast.loading("Deleting..");
        await privateRequest.delete(`/api/v1/listings/${listing._id}`);
        const updatedListings = listings?.filter(
          (item) => item._id !== listing._id
        );
        updateItemsOnDropdown(updatedListings);
        toast.success("Deleted");
        queryClient.invalidateQueries({ queryKey: ["listingItems", user] });
      } catch (err) {
        console.log(err);
        toast.error("Failed to delete");
      } finally {
        toast.dismiss();
      }
    }
  }

  function getPreviousData(listing: IListing) {
    setCategory(listing.category)
    setListingId(listing._id)
    setRooms(listing.rooms)
    setBathrooms(listing.bathrooms)
    setGuests(listing.guests)
    setPrice(listing.price)
    setTitle(listing.title)
    setDescription(listing.description)
    setImages(listing.images)
    setLocation(listing.location)
  }

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  function updateItemsOnDropdown(listings: any) {
    if (listings !== undefined) {
      const userItems = listings.map((listing: IListing, ind: any) =>
        getItem(listing.title, listing._id, listing, showModal, [
          getItem("Edit", `edit ${ind}`, listing, showModal),
          getItem("Delete", `delete ${ind}`, listing, showModal),
        ])
      );
      const dynamicItems = getItem(
        `Your listings (${listings.length})`,
        "sub1",
        "",
        showModal,
        userItems
      );
      setDynamicItems([dynamicItems]);
    }
  }

  useEffect(() => {
    updateItemsOnDropdown(listings);
  }, [listings]);

  if (!user) return null;

  return (
    <div className="relative  ">
      <Menu
        mode="inline"
        onOpenChange={onOpenChange}
        openKeys={openKeys}
        items={dynamicItems}
        className=" max-w-[300px]  z-40"
      />
      {modalType === "updateListing" && (
        <CreatelistingModal props={{ isModalOpen, handleCancel, modalType }} />
      )}
    </div>
  );
};

export default DropdownComponent;
