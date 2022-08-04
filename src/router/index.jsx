import { Route, Routes } from "react-router";
import { Auth } from "../pages/auth";

export const Router = () => {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />}></Route>
    </Routes>
  );
};
