import api from "@/API/axios";
import { useUsersStore } from "@/stores";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const useUsers = () => {
  const { users, setUsers, transactions, setTransactions } = useUsersStore();
const [isLoading, setIsLoading] = useState(false)
  const getUsers = async () => {
    try {
      const response = await api.get("/admin/users");
      if (response.data.success) {
        return response.data.users;
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Network Error!");
      }
    }
  };

  const getTransactions = async () => {
    try {
      const response = await api.get("/transactions/all");
      if (response.data.success) {
        return response.data.transactions;
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Network Error!");
      }
    }
  };

  const updateBalance = async (amount: number, type: string, userId:string)=>{
    setIsLoading(true)
    try {
      const response = await api.post("/transactions/create", {
        amount,
        userId,
        type
      });
      if (response.data.success) {
          toast.success("Balance updated!")
          await getUsers()
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Network Error!");
      }
    } finally{
      setIsLoading(false)
    }
  }

  const {
    data: allUsers,
    isSuccess: isFetchedUser,
    isFetching: isFetchingUsers,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
  const {
    data: allTransactions,
    isSuccess: isFetchedTransactions,
    isFetching: isFetchingTransactions,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  useEffect(() => {
    if (isFetchedUser) {
      setUsers(allUsers);
    }
  }, [allUsers, isFetchedUser, setUsers]);

  useEffect(() => {
    if (isFetchedTransactions) {
      setTransactions(allTransactions);
    }
  }, [allTransactions, isFetchedTransactions, setTransactions]);

  return {
    getUsers,
    users,
    isFetchingUsers,
    isLoading,
    isFetchingTransactions,
    transactions,
    updateBalance
  };
};

export default useUsers;
