import api from "@/API/axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DataProfit {
  network: string;
  profit: number;
}

interface ServicesStore {
  airtimeProfitData: AirtimeProfitType[];
  dataPlans: DataPlan[];
  dataProfits: DataProfit[];
  setDataProfits: (dataProfits: DataProfit[]) => void;
  getAirtimeProfitData: () => Promise<void>;
  getDataPlans: () => Promise<DataPlan[]>;
}

const useServicesStore = create<ServicesStore>()(
  persist(
    (set) => ({
      airtimeProfitData: [],
      dataPlans: [],
      dataProfits: [],
      setDataProfits: (dataProfits: DataProfit[]) => {
        set({ dataProfits });
      },
      getAirtimeProfitData: async () => {
        try {
          const response = await api.get("/services/airtime/profits");
          set({ airtimeProfitData: response.data.data });
        } catch (error) {
          console.log(error);
        }
      },
      getDataPlans: async () => {
        try {
            const response = await api.get("/services/data/plans")
            return response.data.data
        } catch (error) {
            console.log(error)
        }
      },
    }),
    {
      name: "services-store",
      partialize: (state) => ({
        airtimeProfitData: state.airtimeProfitData,
        dataPlans: state.dataPlans,
        dataProfits: state.dataProfits,
      }),
    }
  )
);

export default useServicesStore;