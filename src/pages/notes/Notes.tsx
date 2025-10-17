import { useState } from 'react';
import { useLocal } from '../../store/local';
import type { NotePriority } from '../../types';

const priorities: NotePriority[] = ['important', 'normal', 'delayed'];

export default function Notes() {
  const { notes, addNote, deleteNote, updateNotePriority } = useLocal();
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<NotePriority>('normal');

  function submit() {
    if (!text.trim()) return;
    addNote(text.trim(), priority);
    setText('');
    setPriority('normal');
  }

  return (
    <div className="grid md:grid-cols-3 gap-5">
      <div className="md:col-span-3 bg-white rounded-2xl shadow p-5 border">
        <h1 className="text-xl font-semibold mb-4">Note Manager</h1>
        <div className="flex flex-col md:flex-row gap-2">
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Write a note…" className="border rounded px-3 py-2 w-full" />
          <select value={priority} onChange={(e) => setPriority(e.target.value as NotePriority)} className="border rounded px-3 py-2">
            {priorities.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          <button onClick={submit} className="px-4 py-2 rounded bg-blue-600 text-white">Add note</button>
        </div>
      </div>

      {priorities.map((p) => (
        <div key={p} className="bg-white rounded-2xl shadow p-5 border">
          <h2 className="font-semibold mb-3 capitalize">{p}</h2>
          <ul className="space-y-2 min-h-24">
            {notes.filter((n) => n.priority == p).map((n) => (
              <li key={n.id} className="p-3 border rounded">
                <div className="flex justify-between items-center gap-3">
                  <span className="text-sm">{n.text}</span>
                  <div className="flex gap-2">
                    <select
                      value={n.priority}
                      onChange={(e) => updateNotePriority(n.id, e.target.value as NotePriority)}
                      className="border rounded px-2 py-1 text-sm"
                    >
                      {priorities.map((x) => <option key={x} value={x}>{x}</option>)}
                    </select>
                    <button onClick={() => deleteNote(n.id)} className="text-red-600 text-sm">Delete</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
