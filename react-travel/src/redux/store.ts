import { createStore, configureStore, combineReducers, applyMiddleware } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk"
import { actionLog } from "./middlewares/actionLog";
import languageReducer from "./languageReducer"
import { productReducer } from "./productReducer";
import { userSlice } from "./userReducer"
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage'
import recommendProductsReducer from "./recommendProducts/recommendProductsReducer";

const rootReducer = combineReducers({
    language: languageReducer,
    recommendProducts: recommendProductsReducer,
    product: productReducer.reducer,
    user: userSlice.reducer
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

//const store = createStore(rootReducer, applyMiddleware(thunk, actionLog));
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), actionLog],
    devTools: true
})

const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>

export default { store, persistor };

