import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/posts";
import type { GetPostPage } from "../types/index";

export function usePosts(page: number = 1) {
  return useQuery<GetPostPage>({
    queryKey: ["posts", page],
    queryFn: () => fetchPosts(page),
  });
}
