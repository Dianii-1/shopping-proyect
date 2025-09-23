import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  address: {
    fistName: string;
    lastName: string;
    address: string;
    address2?: string;
    postalCode: string;
    city: string;
    country: string;
    phone: string;
  };

  //   methods

  setAddress: (address: State["address"]) => void;
}

export const useStateAddress = create<State>()(
  persist(
    (set, get) => ({
      address: {
        address: "",
        city: "",
        country: "",
        fistName: "",
        lastName: "",
        phone: "",
        postalCode: "",
        address2: "",
      },
      setAddress: (address) => {
        set({ address });
      },
    }),
    { name: "address-storage" }
  )
);
