import type { Post, Comment, User } from '../types';

const currentUser: User = {
    id: 1,
    username: '김개발',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1'
};
const users: User[] = [
    currentUser,
    {
        id: 2,
        username: '이코딩',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2'
    },
    {
        id: 3,
        username: '박리액트',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3'
    }
];
let posts: Post[] = [
    {
        id: 1,
        author: users[1],
        content: 'React Query 정말 편하다! 🚀',
        likes: 15,
        likedBy: [],
        commentCount: 3,
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString()
    },
    {
        id: 2,
        author: users[2],
        content: 'MSW로 API 모킹하니까 백엔드 없이도 개발 가능하네',
        likes: 8,
        likedBy: [],
        commentCount: 1,
        createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString()
    },
    {
        id: 3,
        author: users[0],
        content: '오늘 배운 것: useInfiniteQuery 👍',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeayRzeLmGC5wmWdVPRLd_lsCEsdqIDH- 1xQ & s',
        likes: 23,
        likedBy: [],
        commentCount: 5,
        createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString()
    }
];
let comments: Comment[] = [
    {
        id: 1,
        postId: 1,
        author: users[2],
        content: '동의합니다!',
        createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString()
    },
    {
        id: 2,
        postId: 1,
        author: users[0],
        content: '캐싱 기능이 특히 좋음',
        createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString()
    }
];
let nextPostId = 4;
let nextCommentId = 3;
export const db = {
    currentUser,
    users,
    posts,
    comments,
    getNextPostId: () => nextPostId++,
    getNextCommentId: () => nextCommentId++
};