import api from "@/API/axios";
import { useServicesStore } from "@/stores";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import type { AddDataplanSchema } from "@/pages/Dataplans/AddDataplan";
import type { EditDataplanSchema } from "@/pages/Dataplans/EditDataplan";

const useDataplan = () => {
  const { dataPlans, getDataPlans, setDataProfits, dataProfits } = useServicesStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isGettingProfits, setIsGettingProfits] = useState(false);

  const addDataplan = async (data: AddDataplanSchema) => {
    setIsLoading(true);
    try {
      const response = await api.post("/services/data/plan", data);
      if (response.data.success === true) {
        toast.success(response.data.message);
        getDataPlans();
        navigate("/data");
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };
  const editDataplan = async (data: EditDataplanSchema) => {
    setIsLoading(true);
    try {
      if (!data.planId || !data.days) {
        toast.error("Plan ID and days are required");
        return;
      }
      const payload = {
        planId: data.planId,
        days: data.days,
        network: data.network,
        planType: data.type,
        volume: data.volume,
        extension: data.extension,
        price: data.price,
      };
      const response = await api.put("/services/data/plan", payload);
      if (response.data.success === true) {
        toast.success(response.data.message);
        getDataPlans();
        navigate("/data");
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const deleteDataplan = async (planId: number) => {
    setIsLoading(true);
    try {
      const response = await api.delete(`/services/data/plan/${planId}`);
      if (response.data.success === true) {
        toast.success(response.data.message);
        getDataPlans();
      }
      const isSuccess = response.data.success;
      return isSuccess;
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updateDataPlanPriceByNetwork = async (network: string, percentage: number) => {
    setIsLoading(true);
    try {
      const response = await api.put("/services/data/plans/prices", { network, topupPercent: percentage });
      if (response.data.success === true) {
        toast.success(response.data.message);
        getDataPlans();
        getDataplanProfits();
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getDataplanProfits = useCallback(async () => {
    setIsGettingProfits(true);
    try {
      const response = await api.get("/services/data/profits");
      if (response.data.success === true) {
        setDataProfits(response.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsGettingProfits(false);
    }
  }, [setDataProfits])

  return {
    dataPlans,
    getDataPlans,
    addDataplan,
    isLoading,
    editDataplan,
    deleteDataplan,
    updateDataPlanPriceByNetwork,
    getDataplanProfits,
    isGettingProfits,
    dataProfits,
  };
};

export default useDataplan;
