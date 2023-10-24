import { format } from "timeago.js";
import { AiOutlineDelete } from "react-icons/ai";

export default function MessageCard({ title, date, deleteNote }) {
  return (
    <div className="flex items-center">
      <div className="flex flex-col my-3 justify-start ">
        <div className="bg-slate-400/20 border-2 border-gray-200 rounded-lg max-w-full py-1 px-2">
          <p>{title}</p>
        </div>
        <p className="text-sm font-thin mx-4">{format(date)}</p>
      </div>
      <div>
        <button onClick={deleteNote}>
          <AiOutlineDelete className="text-2xl mx-2 mb-5" />
        </button>
      </div>
    </div>
  );
}
