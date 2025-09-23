import { Address } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  address: Address;

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
