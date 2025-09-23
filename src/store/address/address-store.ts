import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  address: {
    firstName: string;
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
  getAddress: () => State["address"];
}

export const useStateAddress = create<State>()(
  persist(
    (set, get) => ({
      address: {
        address: "",
        city: "",
        country: "",
        firstName: "",
        lastName: "",
        phone: "",
        postalCode: "",
        address2: "",
      },
      setAddress: (address) => {
        set({ address });
      },
      getAddress: () => {
        const { address } = get();
        return address;
      },
    }),
    { name: "address-storage" }
  )
);
