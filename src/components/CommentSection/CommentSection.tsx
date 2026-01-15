import { useState } from "react";
import { useComments, useCreateComment } from "../../hooks/useComments";
import styles from "./CommentSection.module.css";
import type { Comment } from "../../types";

interface CommentSectionProps {
  postId: number;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");

  const { data: comments, isLoading } = useComments(postId);
  const createCommentMutation = useCreateComment();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) return;

    createCommentMutation.mutate(
      {
        postId,
        content,
      },
      {
        onSuccess: () => {
          setContent("");
        },
      }
    );
  };

  const timeAgo = (date: string) => {
    // eslint-disable-next-line react-hooks/purity
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);

    if (seconds < 60) return `${seconds}초 전`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}분 전`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}시간 전`;

    return `${Math.floor(seconds / 86400)}일 전`;
  };

  return (
    <div className={styles.section}>
      <button onClick={() => setIsOpen(!isOpen)} className={styles.toggleBtn}>
        💬 댓글 {comments?.length || 0}개
      </button>
      {isOpen && (
        <div className={styles.content}>
          {isLoading ? (
            <p className={styles.loading}>로딩 중...</p>
          ) : (
            <div className={styles.comments}>
              {comments?.map((comment: Comment) => (
                <div key={comment.id} className={styles.comment}>
                  <img
                    src={comment.author.avatar}
                    alt={comment.author.username}
                    className={styles.avatar}
                  />
                  <div className={styles.commentBody}>
                    <div className={styles.commentHeader}>
                      React Day 6 - 실습 가이드북 70
                      <span className={styles.username}>
                        {comment.author.username}
                      </span>
                      <span className={styles.time}>
                        {timeAgo(comment.createdAt)}
                      </span>
                    </div>
                    <p className={styles.commentContent}>{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="댓글을 입력하세요..."
              className={styles.input}
            />
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={createCommentMutation.isPending || !content.trim()}
            >
              {createCommentMutation.isPending ? "작성 중..." : "작성"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
