"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import TodoInput from "@/components/TodoInput";
import TodoItem from "@/components/TodoItem";

type Todo = { id: string; title: string; completed: boolean };

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTodos() {
      setLoading(true);
      const { data, error } = await supabase
        .from("todos")
        .select("id, title, completed")
        .order("inserted_at", { ascending: true });
      if (!error && data) setTodos(data as Todo[]);
      setLoading(false);
    }
    fetchTodos();
  }, []);

  const addTodo = async (title: string) => {
    if (!title.trim()) return;
    const { data, error } = await supabase
      .from("todos")
      .insert([{ title: title.trim(), completed: false }])
      .select()
      .single();
    if (!error && data) setTodos(todos => [...todos, data]);
  };

  const deleteTodo = async (id: string) => {
    const { error } = await supabase.from("todos").delete().eq("id", id);
    if (!error) setTodos(todos => todos.filter(todo => todo.id !== id));
  };

  const toggleDone = async (id: string, completed: boolean) => {
    const { error } = await supabase.from("todos").update({ completed: !completed }).eq("id", id);
    if (!error) setTodos(todos => todos.map(todo => todo.id === id ? { ...todo, completed: !completed } : todo));
  };

  return (
    <div className="max-w-xs mx-auto w-full">
      <TodoInput onAdd={addTodo} />
      <ul className="space-y-2 mt-4">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          todos.map((todo, idx) => (
            <TodoItem
              key={todo.id}
              index={idx}
              todo={todo.title}
              done={todo.completed}
              onDelete={() => deleteTodo(todo.id)}
              onToggleDone={() => toggleDone(todo.id, todo.completed)}
            />
          ))
        )}
      </ul>
      <div className="mt-4 text-xs text-gray-400">Total todos: {todos.length}</div>
    </div>
  );
}
