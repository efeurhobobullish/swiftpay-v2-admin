import { create } from "zustand";
interface UserStore {
  users: User[];
  transactions: TransactionType[]
  setUsers: (users: User[]) => void;
  setTransactions: (transactions: TransactionType[]) => void;
}

const useUserStore = create<UserStore>((set) => ({
  users: [],
  transactions: [],
  setUsers: (users: User[]) => set({ users }),
  setTransactions: (transactions: TransactionType[]) => set({ transactions }),
}));

export default useUserStore;
