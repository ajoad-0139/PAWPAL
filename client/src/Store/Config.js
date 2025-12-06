import { configureStore } from '@reduxjs/toolkit';
import auth from './Auth';
import util from './Utils';
import adoptionPostReducer from './AdoptionPostSlice';
import adoptionCommentReducer from './AdoptionCommentSlice';
import blog from './Blog';
import transport from './Transport';
import chatReducer from './Chat'

const store = configureStore({
  reducer: {
    auth,
    util,
    adoptionPost: adoptionPostReducer,
    adoptionComment: adoptionCommentReducer,
    blog,
    transport,
    transportChats: chatReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: [
          'transport.transportForm.document.vacFront',
          'transport.transportForm.document.vacBack',
          'transport.transportForm.document.standing',
          'transport.transportForm.document.sitting',
        ],
      },
    }),
});

export default store;
