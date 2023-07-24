export interface IOfferCommentData {
  userFullName: string;
  comment: string;
  idOffer: string;
}

export interface IOfferCommentReturnData {
  userFullName: string;
  comment: string;
  idOffer: string;
  _ownerId: string;
  _id: string;
  _createdOn: number;
}
