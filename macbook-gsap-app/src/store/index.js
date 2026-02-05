
import { create } from "zustand";

const useMacBookStore = create((set) => ({
    color:'#2e2c4e',
    setColor: (color) => set({ color }),
   
    scale: 0.08,
    setScale: (scale) => set({ scale }),

    reset:() => set({ color: '#2e2c2e' , scale: 0.08 }),
}))

export default useMacBookStore;