import { create } from 'zustand';
import { ICreateListing } from '../../types';

interface AppState {
  listing: ICreateListing;
  setListingId: (id: string) => void;
  setCategory: (text: string) => void;
  setLocation: (text: string) => void;
  setDescription: (text: string) => void;
  setTitle: (text: string) => void;
  setRooms: (num: number) => void;
  setBathrooms: (num: number) => void;
  setGuests: (num: number) => void;
  setPrice: (num: number) => void;
  setImages: (url: any[]) => void;
  resetListing:() => void;
}

const useListingStore = create<AppState>((set) => ({
  listing: {
    id: '',
    category: '',
    location: '',
    rooms: 1,
    bathrooms: 1,
    guests: 1,
    description: '',
    price: 0,
    images: [],
    title: ''
  
  },

  setListingId: (id) => set((state) => ({ listing: { ...state.listing, id } })),
  setCategory: (category) => set((state) => ({ listing: { ...state.listing, category } })),
  setLocation: (location) => set((state) => ({ listing: { ...state.listing, location } })),
  setDescription: (description) => set((state) => ({ listing: { ...state.listing, description } })),
  setTitle: (title) => set((state) => ({ listing: { ...state.listing, title } })),
  setPrice: (price) => set((state) => ({ listing: { ...state.listing, price } })),
  setImages: (images) => set((state) => ({ listing: { ...state.listing, images } })),
  setGuests: (guests) => set((state) => ({ listing: { ...state.listing, guests } })),
  setRooms: (rooms) => set((state) => ({ listing: { ...state.listing, rooms } })),
  setBathrooms: (bathrooms) => set((state) => ({ listing: { ...state.listing, bathrooms } })),
resetListing:() => {set(() => ({listing:{id:'', category: '',
location: '',
rooms: 1,
bathrooms: 1,
guests: 1,
description: '',
price: 0,
images: [],
title: ''}}))}
}));

export default useListingStore;
