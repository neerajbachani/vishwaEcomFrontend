
// store.jsx
import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
// const thunk = require('redux-thunk').default; 
// Use require syntax
import { thunk } from 'redux-thunk';

import { authReducer } from './Auth/Reducer';
// import { customerProductReducer } from './Product/Reducer';
import { cartReducer } from './Cart/Reducer';
import { orderReducer } from './Order/Reducer';
import customerProductReducer from './Product/Reducer';
import adminOrderReducer from './Admin/Order/Reducer';
import heroSectionReducer from './HeroSection/Reducer';
import ReviewReducer from './RateAndReview/Reducer';
import galleryPhotoReducer from './Gallery/Reducer';
import contactReducer from './Contact/Reducer';
import ourBestSellerProductReducer from './OurBestSeller/Reducer';
import ourFeaturedProductReducer from './OurFeaturedProduct/Reducer';
import ourProductReducer from './OurProduct/Reducer';


const rootReducers = combineReducers({
  auth: authReducer,
  product: customerProductReducer,
  cart: cartReducer,
  order: orderReducer,
  adminOrder: adminOrderReducer,
  heroSection: heroSectionReducer,
  review: ReviewReducer,
  gallery: galleryPhotoReducer,
  contact: contactReducer,
  ourBestSellerProduct: ourBestSellerProductReducer,
  ourFeaturedProduct: ourFeaturedProductReducer,
  ourProduct: ourProductReducer,

});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));



// import { configureStore } from '@reduxjs/toolkit';
// import cartReducer from './slice/CartSlice';


// const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//   },
// });

// export default store;
