export interface IOwnerData {
  fullName: string;
  email: string;
  username: string;
  phone: string;
}

export interface IOfferData {
  title: string;
  location: string;
  quadrature: string;
  floors: string;
  imageUrl: string;
  price: string;
  information: string;
  ownerInfo: IOwnerData;
}

export interface IOfferReturnData {
  idOffer?: string;
  title: string;
  location: string;
  quadrature: string;
  floors: string;
  imageUrl: string;
  price: string;
  information: string;
  ownerInfo: IOwnerData;
  _ownerId: string;
  _id: string;
  _createdOn: number;
}
