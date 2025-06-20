import { create } from 'zustand'

// como se va a ver nuestro state

interface State {
    isSideMenuOpen:boolean
    openSideMenu:()=> void
    closeSideMenu:()=> void
}

export const useUiStore = create<State>()((set) => ({
  isSideMenuOpen:false,
  openSideMenu:()=> set({isSideMenuOpen:true}),
closeSideMenu:()=> set({isSideMenuOpen:false})
}))