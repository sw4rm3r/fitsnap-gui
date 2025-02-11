import {Component} from '@angular/core';
import {Post} from '../../interfaces/post';
import {PostComponent} from '../../components/post/post.component';
import {StoryComponent} from '../../components/story/story.component';
import {IonIcon} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  imports: [
    PostComponent,
    StoryComponent,
    IonIcon
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  posts: Post[] = [
    {
      id: 1,
      author: { username: 'user1', userId: 0, propic: 'https://placekittens.com/200/200' },
      timestamp: new Date().toISOString(),
      message: 'This is a sample post',
      images: ['https://www.placekittens.com/200/300'],
      comments: [
        {
          id: 1,
          author: { username: 'commenter1', userId: 1, propic: 'https://www.placekittens.com/200/200' },
          message: 'This is a comment',
          replies: [
            {
              id: 1,
              timestamp: new Date().toISOString(),
              likes: 0,
              replies: [],
              postId: 1,
              author: { username: 'replier1', userId: 2, propic: 'https://placekittens.com/200/200' },
              message: 'This is a reply'
            }
          ],
          timestamp: '',
          likes: 0,
          postId: 0
        }
      ],
      likes: 0
    },
    {
      id: 2,
      author: { username: 'user2', userId: 3, propic: 'https://placekittens.com/200/200' },
      timestamp: new Date().toISOString(),
      message: 'Enjoying a healthy breakfast!',
      images: ['https://placekittens.com/200/200'],
      comments: [
        {
          id: 2,
          author: { username: 'commenter2', userId: 4, propic: 'https://placekittens.com/200/200' },
          message: 'Looks delicious!',
          replies: [],
          timestamp: '',
          likes: 0,
          postId: 2
        }
      ],
      likes: 10
    },
    {
      id: 3,
      author: { username: 'user3', userId: 5, propic: 'https://placekittens.com/200/200' },
      timestamp: new Date().toISOString(),
      message: 'Just finished a great workout!',
      images: ['https://placekittens.com/300/200'],
      comments: [
        {
          id: 3,
          author: { username: 'commenter3', userId: 6, propic: 'https://placekittens.com/200/200' },
          message: 'Great job!',
          replies: [
            {
              id: 2,
              timestamp: new Date().toISOString(),
              likes: 0,
              replies: [],
              postId: 3,
              author: { username: 'replier2', userId: 7, propic: 'https://placekittens.com/200/200' },
              message: 'Keep it up!'
            }
          ],
          timestamp: '',
          likes: 0,
          postId: 3
        }
      ],
      likes: 20
    }
  ];
  constructor() { }

  ngOnInit() {}

}
