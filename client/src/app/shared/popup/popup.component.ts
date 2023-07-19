import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPopupDelete } from 'src/app/interfaces/popupDeleteInterfaces';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent {
  @Input() isShowDeletePopup!: boolean;
  @Output() newShowDeletePopup = new EventEmitter<IPopupDelete>();

  closeDeletePopupHandler() {
    this.newShowDeletePopup.emit({
      isShowDeletePopup: !this.isShowDeletePopup,
      isWantToDeleteOffer: false,
    });
  }

  onDeleteClickHandler() {
    this.newShowDeletePopup.emit({
      isShowDeletePopup: !this.isShowDeletePopup,
      isWantToDeleteOffer: true,
    });
  }
}
