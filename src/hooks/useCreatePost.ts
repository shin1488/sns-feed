import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '../api/posts';

import type { CreatePostInput } from '../types';
export function useCreatePost() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (input: CreatePostInput) =>
            createPost(input.content, input.image),
        onSuccess: () => {
            // 포스트 목록 캐시 무효화 → 자동 리패칭
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        }
    });
}