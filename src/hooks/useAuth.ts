import { useAuthStore } from "@/stores";
import { AxiosError } from "axios";
import { toast } from "sonner";
import api from "@/API/axios";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";

const useAuth = () => {
  const { token, user, setToken, setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const navigate = useNavigate();

  const login = async (email: string) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/login", { email });
      if(response.data.user.isAdmin){
        toast.error("You are not authorized to access this page");
        navigate("/");
        return;
      }
      toast.success(response.data.message);
      setToken(response.data.token);
      setUser(response.data.user);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else if (error instanceof Error) {
        toast.error("Network Error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setToken(null);
      setUser(null);
      setIsLoading(false);
    }, 3000);
  };

  const checkAuth = useCallback(async () => {
    setIsCheckingAuth(true);
    try {
      const response = await api.get("/auth/check");
      if (response.data.success) {
        setUser(response.data.user);
        setToken(response.data.token);
      } else {
        setUser(null)
        setToken(null)
      }
    } catch (error) {
      console.error(error);
      setToken(null);
      setUser(null);
    } finally {
      setIsCheckingAuth(false);
    }
  }, [setUser, setToken]);

  return {
    token,
    user,
    isCheckingAuth,
    checkAuth,
    isLoading,
    login,
    logout,
  };
};

export default useAuth;
