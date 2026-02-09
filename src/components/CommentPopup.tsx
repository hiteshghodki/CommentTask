import { CommentItem } from "../types";

type Props = {
  comments: CommentItem[];
  commentText: string;
  onTextChange: (value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
};

const CommentPopup = ({
  comments,
  commentText,
  onTextChange,
  onSubmit,
  onClose,
}: Props) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="w-[380px] bg-[#2f3347] rounded-xl p-4 text-white">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold">Comment</h2>
          <button onClick={onClose}>✖</button>
        </div>

        <div className="space-y-3 max-h-[260px] overflow-y-auto">
          {comments.map((c) => (
            <div key={c.id} className="bg-[#3a3f55] p-3 rounded-lg text-sm">
              <div className="flex justify-between text-xs opacity-70 mb-1">
                <span>{c.user}</span>
                <span>{c.time}</span>
              </div>
              <p>{c.text}</p>
            </div>
          ))}
        </div>

        <textarea
          value={commentText}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Enter comment"
          className="w-full mt-3 p-2 rounded text-black resize-none"
        />

        <div className="flex justify-between mt-3">
          <button
            onClick={() => onTextChange("")}
            className="px-4 py-1.5 bg-gray-600 rounded"
          >
            Discard
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-1.5 bg-purple-600 rounded"
          >
            Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentPopup;
