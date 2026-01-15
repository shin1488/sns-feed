import { useLikePost } from '../../hooks/useLikePost';
import styles from './LikeButton.module.css';

interface LikeButtonProps {
    postId: number;
    likes: number;
    isLiked: boolean;
}

function LikeButton({postId, likes, isLiked} : LikeButtonProps) {
    const likeMutation = useLikePost();

    const handleLike = () => {
        likeMutation.mutate(postId);
    };

    return (
        <button
            onClick={handleLike}
            className={`${styles.button} ${isLiked ? styles.liked: ''}`}
            disabled={likeMutation.isPending}
        >
            {isLiked ? '❤️' : '🤍'} {likes}
        </button>
    );
}

export default LikeButton;