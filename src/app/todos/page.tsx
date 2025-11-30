"use client";
import TodoList from "@/features/todo/TodoList";

export default function TodosPage() {
  return (
    <main className="min-h-screen flex flex-col items-center p-8 bg-white">
      <h1 className="text-2xl font-bold mb-6">Todos</h1>
      <TodoList />
    </main>
  );
}
