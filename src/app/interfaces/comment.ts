import {User} from './user';

export interface Comment {
  author: User;
  message: string;
  timestamp: string;
  likes: number;
  id: number;
  postId: number;
  replies: Comment[];
}
