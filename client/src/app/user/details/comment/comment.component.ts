import { Component, Input } from '@angular/core';
import { IOfferCommentReturnData } from 'src/app/interfaces/commentInterfaces';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent {
  @Input() comment!: IOfferCommentReturnData;
}
