import { useRef } from "react";
import { TodoDetail } from "../../components/feature/Todo/TodoDetail";
import { TodoList } from "../../components/feature/Todo/TodoList";
import { URL } from "../../constants/url";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
const fetchTodoCreate = (title, content) => {
  try {
    fetch(`${URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });
  } catch (error) {
    console.error(error);
  }
};

export const Todo = () => {
  const { isLoading, isError, data, refetch } = useFetch("/todos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: window.localStorage.getItem("token"),
    },
  });

  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const navigate = useNavigate();

  const clearTodoText = () => {
    titleRef.current.value = "";
    contentRef.current.value = "";
  };

  const handleClickButton = () => {
    fetchTodoCreate(titleRef.current.value, contentRef.current.value);
    clearTodoText();
    refetch();
  };

  if (!window.localStorage.getItem("token")) navigate("/auth");

  return (
    <>
      <form>
        <label>
          제목
          <input type="text" ref={titleRef} />
        </label>
        <label>
          내용
          <input type="text" ref={contentRef} />
        </label>
        <button type="button" onClick={handleClickButton}>
          등록
        </button>
      </form>
      <TodoList
        isLoading={isLoading}
        isError={isError}
        data={data}
        refetch={refetch}
      />
      <TodoDetail />
    </>
  );
};
