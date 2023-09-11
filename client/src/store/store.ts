import { create } from 'zustand';

interface Store {
  query:{
    category:string
  },
  setCategory:(category:string) => void
}
 const useStore = create<Store>((set) => ({
  query:{
    category:'All'
  },
  setCategory:(category) => set((state) => ({query:{...state.query, category}}))
}))

export default useStore