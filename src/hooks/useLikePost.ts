import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likePost } from '../api/posts';
import type { Post } from '../types';

export function useLikePost() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: likePost,

        onMutate: async (postId) => {
            await queryClient.cancelQueries({queryKey: ['posts']});

            const previousData = queryClient.getQueryData(['posts']);

            queryClient.setQueryData(['posts'], (old: any) => {
                if (!old) return old;

                return {
                    ...old,
                    pages: old.pages.map((page: any) => ({
                        ...page,
                        posts:page.posts.map((post: Post) => {
                            if(post.id === postId) {
                                const isLiked = post.likedBy.includes(1);
                                return {
                                    ...post,
                                    likes: isLiked ? post.likes - 1 : post.likes + 1,
                                    likedBy: isLiked
                                        ? post.likedBy.filter(id => id !== 1)
                                        : [...post.likedBy, 1]
                                };
                            }
                            return post;
                        })
                    }))
                };
            });

            return {previousData};
        },

        onError: (err, postId, context) => {
            if(context?.previousData){
                queryClient.setQueryData(['posts'], context.previousData);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ['posts']});
        }
    });
}