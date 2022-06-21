import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        items: [
            { id: 'id-1', name: 'Rosie Simpson', number: '+38 095 459 1256' },
            { id: 'id-2', name: 'Hermione Kline', number: '+38 095 443 8912' },
            { id: 'id-3', name: 'Eden Clements', number: '+38 095 645 1779' },
            { id: 'id-4', name: 'Annie Copeland', number: '+38 095 227 9126' },
        ],
        filter: '',
    },
    reducers: {
        addContacts(state, action) {
            state.items.push(action.payload);
        },
        deleteContacts(state, action) {
            return {
                ...state,
                items: state.items.filter(
                    contact => contact.id !== action.payload
                ),
            };
        },
        setFilter(state, action) {
            return { ...state, filter: action.payload };
        },
    },
});

const persistConfig = {
    key: 'root',
    storage,
};

export const persistedContactsReducer = persistReducer(
    persistConfig,
    contactsSlice.reducer
);

export const { addContacts, deleteContacts, setFilter } = contactsSlice.actions;

export const getItems = state => state.contacts.items;

export const getFilter = state => state.contacts.filter;
