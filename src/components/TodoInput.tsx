import { useState } from "react";

type Props = {
  onAdd: (todo: string) => void;
};

export default function TodoInput({ onAdd }: Props) {
  const [value, setValue] = useState("");
  const submit = () => {
    if (value.trim()) onAdd(value);
    setValue("");
  };
  return (
    <div className="flex gap-2">
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') submit(); }}
        className="border rounded px-2 py-1 flex-1"
        placeholder="Add a todo"
      />
      <button
        onClick={submit}
        className="bg-blue-600 text-white px-3 py-1 rounded"
      >
        Add
      </button>
    </div>
  );
}
