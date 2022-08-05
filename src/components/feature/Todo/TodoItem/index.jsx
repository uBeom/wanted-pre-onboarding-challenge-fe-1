import { useRef, useState } from "react";
import { URL } from "../../../../constants/url";

const fetchTodoPut = async (path, title, content) => {
  try {
    await fetch(path, {
      method: "PUT",
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

const fetchTodoDelete = async (path) => {
  try {
    await fetch(path, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("token"),
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const TodoItem = ({ todo, refetch }) => {
  const [modifyMode, setModifyMode] = useState(false);
  const titleRef = useRef();
  const contentRef = useRef();

  const handleClickModifyButton = () => {
    titleRef.current = todo.title;
    contentRef.current = todo.content;
    setModifyMode(true);
  };

  const handleClicRemovekButton = () => {
    fetchTodoDelete(`${URL}/todos/${todo.id}`);
    refetch();
  };

  const handleClickModifySubmitButton = () => {
    fetchTodoPut(
      `${URL}/todos/${todo.id}`,
      titleRef.current,
      contentRef.current
    );
    refetch();
    setModifyMode(false);
  };

  const handleClickModifyCancelButton = () => setModifyMode(false);

  const handleChangeTitle = ({ target }) => (titleRef.current = target.value);

  const handleChangeContent = ({ target }) =>
    (contentRef.current = target.value);

  if (modifyMode) {
    return (
      <>
        <label>
          title
          <input
            type="text"
            defaultValue={titleRef.current}
            onChange={handleChangeTitle}
          />
        </label>
        <label>
          content
          <input
            type="text"
            defaultValue={contentRef.current}
            onChange={handleChangeContent}
          />
        </label>
        <button type="button" onClick={handleClickModifySubmitButton}>
          확인
        </button>
        <button type="button" onClick={handleClickModifyCancelButton}>
          취소
        </button>
      </>
    );
  }

  return (
    <>
      <li>id: {todo.id}</li>
      <li>title: {todo.title}</li>
      <li>content: {todo.content}</li>
      <li>createdAt: {todo.createdAt}</li>
      <li>updatedAt: {todo.updatedAt}</li>
      <button type="button" onClick={handleClickModifyButton}>
        수정
      </button>
      <button type="button" onClick={handleClicRemovekButton}>
        제거
      </button>
    </>
  );
};
