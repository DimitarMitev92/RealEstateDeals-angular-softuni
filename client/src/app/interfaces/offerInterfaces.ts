export interface IOfferData {
  title: string;
  location: string;
  imageUrl: string;
  price: string;
  information: string;
}

export interface IOfferReturnData {
  title: string;
  location: string;
  imageUrl: string;
  price: string;
  information: string;
  _ownerId: string;
  _id: string;
  _createdOn: number;
}
