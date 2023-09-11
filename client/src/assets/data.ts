import { TbBeach, TbMountain,TbArrowsRandom, TbPool } from "react-icons/tb";
import {
  GiBoatFishing,
  GiCactus,
  GiForestCamp,
  GiVillage,
} from "react-icons/gi";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineForest } from "react-icons/md";

export const categories = [
  {
    label: "All",
    icon: TbArrowsRandom,
    description: "This property is random!",
  },
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach!",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is in the countryside!",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This is property has a beautiful pool!",
  },

  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is near a lake!",
  },

  {
    label: "Forest",
    icon: MdOutlineForest,
    description: "This property is near forest!",
  },

  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property offers camping activities!",
  },
  {
    label: "Village",
    icon: GiVillage,
    description: "This property is in arctic environment!",
  },
  {
    label: "Resort",
    icon: GiCactus,
    description: "This property is a resort!",
  },
  {
    label: "Luxury",
    icon: IoDiamond,
    description: "This property is brand new and luxurious!",
  },
];
