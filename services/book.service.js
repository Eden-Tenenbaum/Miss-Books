import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { getBooksData } from '../books.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    getById,
    save,
    remove,
    getEmptyBook,
    getDefaultFilter,
    // addReview,
    // addGoogleBook,
}

function query(filterBy = getDefaultFilter()) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')
                books = books.filter(book => regExp.test(book.title))
            }
            if (filterBy.maxPrice) {
                books = books.filter(book => book.listPrice.amount <= filterBy.maxPrice)
            }
            return books
        })
}

function getById(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook() {
    return {
        title: '',
        subtitle: '',
        authors: [],
        publishedDate: new Date().getFullYear(),
        description: '',
        pageCount: 0,
        categories: [],
        thumbnail: 'assets/img/1.jpg',
        language: 'en',
        listPrice: {
            amount: 0,
            currencyCode: 'USD',
            isOnSale: false
        }
    }
}

function getDefaultFilter() {
    return { title: '', maxPrice: null }
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = getBooksData()
        utilService.saveToStorage(BOOK_KEY, books)
    }
    return books
}
