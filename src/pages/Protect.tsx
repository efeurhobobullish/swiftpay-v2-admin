import { useAuth } from "@/hooks";
import { Navigate, Outlet } from "react-router-dom";

const Protect = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default Protect;
