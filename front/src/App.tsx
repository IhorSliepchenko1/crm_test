import { Navigate, Route, Routes } from "react-router-dom";
import Expenses from "@/pages/expenses";
import CashRegister from "@/pages/cashRegister";
import Auth from "@/pages/auth";
import { useAuth } from "./context/context";

function App() {
  const token = useAuth();


  return (
    <Routes>
      {!token ? (
        <>
          <Route path="*" element={<Navigate to="/cash-register" />} />
          <Route element={<CashRegister />} path="/cash-register" />
          <Route element={<Expenses />} path="/expenses" />
        </>
      ) : (
        <>  <Route element={<Auth />} path="/" />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
}

export default App;
