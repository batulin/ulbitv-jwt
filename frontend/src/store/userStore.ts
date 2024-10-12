import { create } from "zustand";
import {User} from "../types/AuthResponse.ts";
import AuthService from "../services/AuthService.ts";

type UserStore = {
    user: User | undefined;
    isAuth: boolean;
    login: (email:string, password:string) => void;
    register: (email:string, password:string) => void;
}
export const useUserStore = create<UserStore>((set) => ({
    user: undefined,
    isAuth: false,
    login: async (email, password) => {
        try {
            const response = await AuthService.login(email, password);
            console.log(response)
            localStorage.setItem('accessToken', response.data.accessToken);
            set({isAuth: true})
            set({user: response.data.user})
        } catch (error) {
        }
    },
    register: async (email, password) => {
        try {
            const response = await AuthService.registration(email, password);
            console.log(response)
        } catch (error) {
        }
    }
}))

// import { create } from 'zustand'
//
// interface BearState {
//     bears: number
//     increasePopulation: () => void
//     removeAllBears: () => void
//     updateBears: (newBears: number) => void
// }
//
// const useBearStore = create<BearState>((set) => ({
//     bears: 0,
//     increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//     removeAllBears: () => set({ bears: 0 }),
//     updateBears: (newBears) => set({ bears: newBears }),
// }))
