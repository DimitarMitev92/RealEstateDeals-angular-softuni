import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from 'src/app/auth/auth.service';
import { UserCRUDService } from '../user-crud.service';
import { GlobalLoaderService } from 'src/app/core/global-loader/global-loader.service';

import { IOfferReturnData } from 'src/app/interfaces/offerInterfaces';
import { IPopupDelete } from 'src/app/interfaces/popupDeleteInterfaces';
import {
  IOfferCommentData,
  IOfferCommentReturnData,
} from 'src/app/interfaces/commentInterfaces';
import { FormBuilder, Validators } from '@angular/forms';
import { ILoginData, IRegisterData } from 'src/app/interfaces/authInterfaces';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  offer!: IOfferReturnData;
  userData!: IRegisterData;
  comments: IOfferCommentReturnData[] = [];

  comment!: IOfferCommentData;

  isLoggedIn: boolean = false;
  isOwner: boolean = false;

  errorServer: boolean = false;
  errorMsg: string = '';

  isShowDeletePopup: boolean = false;

  isHideContact: boolean = true;

  isFollowed: boolean = false;

  isHideFullScreenImage: boolean = true;

  isSubmitted = false;

  commentForm = this.fb.group({
    comment: ['', [Validators.required, Validators.minLength(10)]],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userCRUD: UserCRUDService,
    private authService: AuthService,
    private globalLoaderService: GlobalLoaderService
  ) {}

  onFetchComments() {
    if (this.offer._id) {
      this.userCRUD.getCommentByOfferId(this.offer._id).subscribe({
        next: (response) => {
          this.comments = response;
        },
        error: (msg) => {
          console.log(msg);
        },
      });
    }
  }

  ngOnInit() {
    this.globalLoaderService.showLoader();
    this.route.paramMap.subscribe((params) => {
      const idOffer = params.get('id');
      this.userCRUD.getOfferById(idOffer).subscribe({
        next: (response) => {
          this.globalLoaderService.hideLoader();
          this.offer = response;
          this.onFetchComments();
          let userDataJSON = this.authService.getUserData();
          if (userDataJSON !== null) {
            let userId = JSON.parse(userDataJSON)._id;
            let ownerId = this.offer._ownerId;
            userId === ownerId ? (this.isOwner = true) : (this.isOwner = false);

            // Follow check
            this.userCRUD.getOffersByFollowerId(userId).subscribe({
              next: (response) => {
                if (response.length !== 0) {
                  let currentFollowOffer = response.filter(
                    (followed) => followed.idOffer === this.offer._id
                  );
                  if (currentFollowOffer.length !== 0) {
                    this.isFollowed = true;
                  }
                }
              },
              error: (msg) => {
                console.log(msg);
                this.isFollowed = false;
              },
            });
          }
        },
        error: (msg) => {
          console.log(msg);
          this.errorServer = true;
          this.globalLoaderService.hideLoader();
          if (msg.status === 0) {
            this.errorMsg =
              'Тhe server is down. We are working on fixing the problem.';
          }
        },
      });
    });

    this.isLoggedIn = this.authService.getIsLoggedIn();
  }

  onShowDeletePopup() {
    this.isShowDeletePopup = !this.isShowDeletePopup;
  }

  onToggleShowFullScreenImage() {
    this.isHideFullScreenImage = !this.isHideFullScreenImage;
  }

  onNewEventShowDeleteHandler(value: IPopupDelete) {
    this.isShowDeletePopup = value.isShowDeletePopup;
    if (value.isWantToDeleteOffer) {
      let userDataJSON = this.authService.getUserData();
      if (userDataJSON !== null) {
        let userAccessToken = JSON.parse(userDataJSON).accessToken;
        this.userCRUD.deleteOffer(this.offer._id, userAccessToken).subscribe({
          next: (response) => {
            this.router.navigate(['/profile']);
          },
          error: (msg) => {
            console.log(msg);
          },
        });
      }
    }
  }

  onToggleShowContact() {
    this.isHideContact = !this.isHideContact;
  }

  onFollowOffer() {
    let userDataJSON = this.authService.getUserData();
    if (userDataJSON !== null) {
      if (this.isFollowed === false) {
        this.isFollowed = true;
        let userAccessToken = JSON.parse(userDataJSON).accessToken;
        let offerFollowerData = { ...this.offer, idOffer: this.offer._id };
        this.userCRUD
          .createOfferFollower(offerFollowerData, userAccessToken)
          .subscribe({
            next: (response) => {},
            error: (msg) => {
              console.log(msg);
            },
          });
      } else {
        this.isFollowed = false;
        let userDataJSON = this.authService.getUserData();
        if (userDataJSON !== null) {
          let userId = JSON.parse(userDataJSON)._id;
          let userAccessToken = JSON.parse(userDataJSON).accessToken;
          let idOfferFollower = '';
          this.userCRUD.getOffersByFollowerId(userId).subscribe({
            next: (response) => {
              idOfferFollower = response[0]._id;
              let currentFollowOffer = response.filter(
                (followed) => followed.idOffer === this.offer._id
              );
              this.userCRUD
                .deleteOfferFollowerByOfferId(
                  currentFollowOffer[0]._id,
                  userAccessToken
                )
                .subscribe({
                  next: (response: any) => {
                    console.log(response);
                  },
                  error: (msg: any) => {
                    console.log(msg);
                  },
                });
            },
            error: (msg) => {
              console.log(msg);
            },
          });
        }
      }
    }
  }

  osSubmitComment(): void {
    this.isSubmitted = true;

    const userDataJSON = this.authService.getUserData();
    if (userDataJSON) {
      this.userData = JSON.parse(userDataJSON);
    }

    const commentData: IOfferCommentData = {
      userFullName: this.userData.fullName || '',
      comment: this.commentForm.value.comment || '',
      idOffer: this.offer._id || '',
    };
    const accessToken = this.authService.getUserAccessToken();

    this.userCRUD.createOfferComment(commentData, accessToken).subscribe({
      next: (response) => {
        this.onFetchComments();
        this.isSubmitted = false;
        this.commentForm.reset();
      },
      error: (msg) => {
        console.log(msg);
      },
    });
  }
}
