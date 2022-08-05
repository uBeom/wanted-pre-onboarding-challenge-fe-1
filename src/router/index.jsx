import { Route, Routes } from "react-router";
import { Auth } from "../pages/Auth";
import { Todo } from "../pages/Todo";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Todo />}></Route>
      <Route path="/auth" element={<Auth />}></Route>
    </Routes>
  );
};
