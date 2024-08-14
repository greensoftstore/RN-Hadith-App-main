import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    lastRead: {},
    listOfBooksFilters: null
};

export const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        updateLastRead: (state, action) => {
            const { payload } = action
            let lastReadNew = { ...state.lastRead }

            if (!lastReadNew?.[payload.bookId] || lastReadNew[payload.bookId].hadithNumber < payload.hadith.hadithNumber) {
                lastReadNew[payload.bookId] = payload.hadith
                state.lastRead = lastReadNew;
            }
        },
        updateLocalListBooks: (state, action) => {
            const { payload } = action

            let currentBooks = state?.listOfBooksFilters ? [...state.listOfBooksFilters] : null
            let newBooks = [...payload]

            if (currentBooks != null)
                currentBooks.map((book, index) => {
                    let indexOfBook = newBooks.findIndex(val => val.bookId == book.bookId)

                    if (indexOfBook == -1) finalList.splice(index, 1)
                })


            let finalList = currentBooks == null ? newBooks : currentBooks


            if (currentBooks != null)
                newBooks.map(book => {
                    let indexOfBook = finalList.findIndex(val => val.bookId == book.bookId)

                    if (indexOfBook == -1) finalList.push(book)
                })

            state.listOfBooksFilters = finalList;
        },

        updateLocalListBooksFilter: (state, action) => {
            const { payload } = action

            let newBooks = [...state.listOfBooksFilters]

            let selectedBook = newBooks[payload.index]

            selectedBook.active = payload.val

            newBooks[payload.index] = selectedBook;

            state.listOfBooksFilters = newBooks;
        },
    },
});

export const { updateLastRead, updateLocalListBooks, updateLocalListBooksFilter } = booksSlice.actions;

export const selectLastRead = (state) => state.books.lastRead;
export const selectListOfBooksFilters = (state) => state.books.listOfBooksFilters;

export default booksSlice.reducer;