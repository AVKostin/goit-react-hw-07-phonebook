import { configureStore } from '@reduxjs/toolkit';
import { contactsSlice } from './contactsSlice';
import { contactsApi } from './contactsApi';

const store = configureStore({
    reducer: {
        contacts: contactsSlice.reducer,
        [contactsApi.reducerPath]: contactsApi.reducer,
    },

    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(contactsApi.middleware),
});

export default store;