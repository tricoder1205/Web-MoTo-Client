import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { combineReducers } from "redux";
import storage from 'redux-persist/lib/storage';
import CartSlice from 'stateslice/CartSlice.js'
import UserSlice from 'stateslice/UserSlice.js'
import CheckOutDataSlice from 'stateslice/CheckOutData.js'
import {
  FLUSH,
  PAUSE,
  PERSIST, persistReducer, persistStore, PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducers = combineReducers({
  cartList: CartSlice,
  userInfo: UserSlice,
  formData: CheckOutDataSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
})

export const persistor = persistStore(store);
export default store;
