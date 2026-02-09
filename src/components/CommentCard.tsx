import { CommentItem } from "../types";

type Props = {
  comment: CommentItem;
  onEdit: (comment: CommentItem) => void;
  onDelete: (id: number) => void;
};

const CommentCard = ({ comment, onEdit, onDelete }: Props) => {
  return (
    <div className="border rounded-lg p-3 text-sm space-y-2">
      <div className="flex justify-between text-xs text-gray-500">
        <span>{comment.user}</span>
        <span>{comment.time}</span>
      </div>

      <p>{comment.text}</p>

      {comment.file && (
        <div>
          <p className="text-xs text-gray-500 mb-1">
            Supporting document attached
          </p>
          <div className="flex items-center gap-2 border rounded-md p-2 text-xs">
            <span className="bg-red-500 text-white px-2 py-0.5 rounded">
              PDF
            </span>
            <span className="flex-1 truncate">{comment.file.name}</span>
            <span className="text-gray-400">23.5MB</span>
          </div>
        </div>
      )}

      <div className="flex justify-between pt-2">
        <button
          onClick={() => onDelete(comment.id)}
          className="px-4 py-1.5 border border-orange-500 text-orange-500 rounded-full text-sm"
        >
          Delete Comment
        </button>

        <button
          onClick={() => onEdit(comment)}
          className="px-4 py-1.5 bg-red-500 text-white rounded-full text-sm"
        >
          Edit Comment
        </button>
      </div>
    </div>
  );
};

export default CommentCard;
