import { usePosts } from '../../hooks/usePosts';
import PostCard from '../../components/PostCard/PostCard';
import styles from './Feed.module.css';

function Feed() {
    const { data, isLoading, error } = usePosts(1);
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
            <div className={styles.posts}>
                {data?.posts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
}
export default Feed;