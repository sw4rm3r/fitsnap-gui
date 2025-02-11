import {User} from './user';
import {Comment} from './comment';

export interface Post {
  author: User;
  message: string;
  timestamp: string;
  images: string[];
  likes: number;
  comments: Comment[];
  id: number;
}
