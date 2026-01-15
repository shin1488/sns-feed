import { useForm } from 'react-hook-form';
import { useCreatePost } from '../../hooks/useCreatePost';
import styles from './PostForm.module.css';
interface PostFormData {
    content: string;
}
function PostForm() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<PostFormData>();
    const createPostMutation = useCreatePost();
    const onSubmit = (data: PostFormData) => {
        createPostMutation.mutate(
            { content: data.content },
            {
                onSuccess: () => {
                    reset();
                },
                onError: (error) => {
                    alert(`게시 실패: ${error.message}`);
                }
            }
        );
    };
    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <textarea
                    {...register('content', {
                        required: '내용을 입력하세요',
                        minLength: {
                            value: 1,
                            message: '최소 1자 이상 입력하세요'
                        },
                        maxLength: {
                            value: 500,
                            message: '최대 500자까지 입력 가능합니다'
                        }
                    })}
                    placeholder="무슨 생각을 하고 계신가요?"
                    className={styles.textarea}
                    rows={3}
                />
                {errors.content && (
                    <p className={styles.error}>{errors.content.message}</p>
                )}
                <div className={styles.actions}>
                    <button
                        type="submit"
                        className={styles.submitBtn}
                        disabled={createPostMutation.isPending}
                    >
                        {createPostMutation.isPending ? '게시 중...' : '게시'}
                    </button>
                </div>
                {createPostMutation.isError && (
                    <p className={styles.error}>
                        게시에 실패했습니다
                    </p>
                )}
            </form>
        </div>
    );
}
export default PostForm;