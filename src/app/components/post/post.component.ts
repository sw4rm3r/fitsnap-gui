import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../interfaces/post';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  imports: [
    NgOptimizedImage
  ]
})
export class PostComponent  implements OnInit {

  @Input() post: Post | undefined;

  constructor() { }

  ngOnInit() {}

}
