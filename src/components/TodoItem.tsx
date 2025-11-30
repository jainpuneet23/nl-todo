type Props = {
  index: number;
  todo: string;
  done: boolean;
  onDelete: () => void;
  onToggleDone: () => void;
};

export default function TodoItem({ index, todo, done, onDelete, onToggleDone }: Props) {
  return (
    <li className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded">
      <span className="text-xs w-4 text-gray-400">{index + 1}.</span>
      <input type="checkbox" checked={done} onChange={onToggleDone} className="accent-blue-600" />
      <span className={"flex-1 " + (done ? "line-through text-gray-400" : "")}>{todo}</span>
      <button onClick={onDelete} className="text-red-500 hover:underline text-xs">Delete</button>
    </li>
  );
}
