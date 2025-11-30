import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Welcome to nl-todo!</h1>
      <Link href="/todos" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        Go to Todos
      </Link>
    </main>
  );
}
