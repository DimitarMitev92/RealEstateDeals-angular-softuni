export const serverUrl = {
  base: 'http://localhost:3030',
  login: 'http://localhost:3030/users/login',
  register: 'http://localhost:3030/users/register',
  logout: 'http://localhost:3030/users/logout',
  offers: 'http://localhost:3030/data/offers',
  offersFollowers: 'http://localhost:3030/data/offersFollowers',
  offersFollowersGet:
    'http://localhost:3030/data/offersFollowers?where=_ownerId',
  contactUs: 'http://localhost:3030/jsonstore/contact-us',
  offerComments: 'http://localhost:3030/data/offerComments',
  offerCommentsGet: 'http://localhost:3030/data/offerComments?where=idOffer',
};
