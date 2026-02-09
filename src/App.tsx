
import { useState, ChangeEvent } from "react";
import { CommentItem } from "./types";
import CommentCard from "./components/CommentCard";
import CommentForm from "./components/CommentForm";
import CommentPopup from "./components/CommentPopup";

const App = () => {
  const mockUser = "You";

  const [comments, setComments] = useState<CommentItem[]>([]);
  const [commentText, setCommentText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [openComments, setOpenComments] = useState(false);

  const getTime = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const handleSubmit = () => {
    if (!commentText.trim()) return;

    if (editingId !== null) {
      setComments((prev) =>
        prev.map((c) =>
          c.id === editingId ? { ...c, text: commentText } : c
        )
      );
      setEditingId(null);
    } else {
      setComments((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: commentText,
          user: mockUser,
          time: getTime(),
          file: file || undefined,
        },
      ]);
    }

    setCommentText("");
    setFile(null);
  };

  const handleEdit = (comment: CommentItem) => {
    setCommentText(comment.text);
    setEditingId(comment.id);
    setOpenComments(false);
  };

  const handleDelete = (id: number) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
    }
  };

  const selectedComment =
    editingId !== null
      ? comments.find((c) => c.id === editingId)
      : comments[comments.length - 1];

  return (
    
    // <div className="min-h-screen bg-[#3f3f3f] flex justify-center p-10">
    <div className="min-h-screen bg-[#3f3f3f] flex justify-center items-start p-10">
    <div className="w-[360px] bg-white rounded-xl shadow-lg p-4 space-y-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">Current value</p>
          <p className="text-sm">
            The quick brown fox jumps over the lazy dog
          </p>
        </div>

        {selectedComment && !openComments && (
          <CommentCard
            comment={selectedComment}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

        <CommentForm
          commentText={commentText}
          file={file}
          onTextChange={setCommentText}
          onFileChange={handleFileChange}
          onSubmit={handleSubmit}
          onDiscard={() => {
            setCommentText("");
            setFile(null);
            setEditingId(null);
          }}
        />

        <button
          onClick={() => setOpenComments(true)}
          className="w-full border rounded-md py-2 text-sm font-medium"
        >
          Comments {comments.length > 0 && `(${comments.length})`}
        </button>
      </div>

      {openComments && (
        <CommentPopup
          comments={comments}
          commentText={commentText}
          onTextChange={setCommentText}
          onSubmit={handleSubmit}
          onClose={() => setOpenComments(false)}
        />
      )}
    </div>
  );
};

export default App;
