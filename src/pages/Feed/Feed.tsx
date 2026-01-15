import { usePosts } from "../../hooks/usePosts";
import PostCard from "../../components/PostCard/PostCard";
import PostForm from "../../components/PostForm/PostForm";
import { useEffect, useRef } from "react";
import type { Post } from "../../types";
import styles from "./Feed.module.css";

function Feed() {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePosts();

  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>포스트를 불러오는데 실패했습니다</p>
        <p className={styles.errorMessage}>{error.message}</p>
      </div>
    );
  }

  return (
    <div className={styles.feed}>
      <div className={styles.header}>
        <h1>피드</h1>
      </div>

      <PostForm />

      <div className={styles.posts}>
        {data?.pages.map((page, pageIndex) => (
          <div key={pageIndex}>
            {page.posts.map((post: Post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ))}
      </div>

      {hasNextPage && (
        <div ref={observerRef} className={styles.observer}>
          {isFetchingNextPage ? (
            <div className={styles.loadingMore}>
              <div className={styles.spinner}></div>
              <p>더 불러오는 중...</p>
            </div>
          ) : (
            <button
              onClick={() => fetchNextPage()}
              className={styles.loadMoreBtn}
            >
              더보기
            </button>
          )}
        </div>
      )}
    </div>
  );
}


export default Feed;