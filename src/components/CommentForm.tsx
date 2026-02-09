import { ChangeEvent } from "react";

type Props = {
  commentText: string;
  file: File | null;
  onTextChange: (value: string) => void;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onDiscard: () => void;
};

const CommentForm = ({
  commentText,
  file,
  onTextChange,
  onFileChange,
  onSubmit,
  onDiscard,
}: Props) => {
  return (
    <>
      <div>
        <label className="text-xs text-gray-500 mb-1 block">Comment</label>
        <textarea
          value={commentText}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Please provide a reason for the change"
          className="w-full border rounded-md px-3 py-2 text-sm resize-none"
        />
      </div>

      <div>
        <label className="text-xs text-gray-500 mb-1 block">
          Upload support document
        </label>

        <label className="flex items-center justify-between border rounded-md px-3 py-2 text-sm cursor-pointer">
          <span className={file ? "text-gray-700" : "text-gray-400"}>
            {file ? file.name : "Select a file to upload"}
          </span>
          <span className="text-gray-500">⬆</span>
          <input type="file" onChange={onFileChange} className="hidden" />
        </label>
      </div>

      <div className="flex justify-between pt-2">
        <button
          onClick={onDiscard}
          className="px-4 py-1.5 border border-orange-500 text-orange-500 rounded-full text-sm"
        >
          Discard
        </button>

        <button
          onClick={onSubmit}
          className="px-4 py-1.5 bg-red-500 text-white rounded-full text-sm"
        >
          Submit Suggestion
        </button>
      </div>
    </>
  );
};

export default CommentForm;
