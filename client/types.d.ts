export interface ICreateListing {
  id:string
  category: string;
  location: string;
  guests: number;
  rooms: number;
  bathrooms: number;
  description: string;
  price: any
  images: any[];
  title: string;
}

export interface IListing {
  _id: string
  title: string
  description: string
  images: Image[]
  category: string
  rooms: number
  bathrooms: number
  guests: number
  location: string
  userId: string
  price: number
  reservations: string[]
}

type Image = {
  url:string ,
  public_id:string
}

export interface SetDataProps {
  setData: (prev) => void,
  data: CreateListProps
}

export interface SetStateProps {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<any>>;
}

export interface IUser {
  email: string
  name: string
  favorites: []
  listings: []
  reservations: string[]
  _id: string
}

export interface UserProps {
  user: IUser | null
}

export interface IReservation {
  userId: string
  listing: IListing 
  startDate: Date
  endDate: Date
  guests: number;
  totalPrice: number;
  createdAt: Date;
  _id: string
}

export interface IAuthModal {
  isModalOpen: boolean
  handleCancel: () => void
  modalType: string
  showModal: any
}
export interface ICreateListModal {
  isModalOpen: boolean,
  modalType: string
  handleCancel: () => void

}