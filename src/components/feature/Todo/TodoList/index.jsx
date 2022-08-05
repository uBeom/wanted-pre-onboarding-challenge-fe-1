import { TodoItem } from "../TodoItem";

export const TodoList = ({ isLoading, isError, data, refetch }) => {
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  const todos = data.map((todo, index) => (
    <TodoItem key={index} {...{ todo }} {...{ refetch }} />
  ));

  return <ul>{todos}</ul>;
};
