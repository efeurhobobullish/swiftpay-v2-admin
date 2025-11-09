import { Routes, Route } from "react-router-dom";
import { Login, Dashboard, Dataplan, Protect, Users, UserProfile, TransactionDetails } from "./pages";
import { Toaster } from "sonner";
import { ScrollToTop } from "./components";
import { AddDataplan, EditDataplan, UpdatePrices } from "./pages/Dataplans";
import { useEffect } from "react";
import useAuth from "./hooks/useAuth";

const App = () => {
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <ScrollToTop />
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Protect />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:email" element={<UserProfile />} />
          <Route path="/users/:email/tnx/:id" element={<TransactionDetails />} />
          <Route path="/data" element={<Dataplan />} />
          <Route path="/data/add" element={<AddDataplan />} />
          <Route path="/data/edit/:id" element={<EditDataplan />} />
          <Route path="/data/prices" element={<UpdatePrices />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
