import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/posts";

export function usePosts(page: number = 1) {
  return useQuery({
    queryKey: ["posts", page],
    queryFn: () => fetchPosts(page),
  });
}
