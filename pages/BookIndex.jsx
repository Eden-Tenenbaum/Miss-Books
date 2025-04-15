
import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { BookDetails } from "./BookDetails.jsx"
import { BookEdit } from "./BookEdit.jsx"

const { useState, useEffect } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [selectedBookId, setSelectedBookId] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        setIsLoading(true)
        bookService.query(filterBy)
            .then(books => setBooks(books))
            .catch(err => console.log('Error loading books:', err))
            .finally(() => setIsLoading(false))
    }

    function onRemoveBook(bookId) {
        setIsLoading(true)
        bookService.remove(bookId)
            .then(() => {
                setBooks((prevBooks) => prevBooks.filter(book => book.id !== bookId))
            })
            .catch(err => console.log('Error removing book:', err))
            .finally(() => setIsLoading(false))
    }

    function onAddBook() {
        setSelectedBookId(null)
        setIsEditing(true)
    }

    function onEditBook(bookId) {
        setSelectedBookId(bookId)
        setIsEditing(true)
    }

    function onSaveBook(bookToSave) {
        bookService.save(bookToSave)
            .then(savedBook => {
                setBooks(prevBooks => {
                    const idx = prevBooks.findIndex(book => book.id === savedBook.id)
                    if (idx !== -1) {
                        const updatedBooks = [...prevBooks]
                        updatedBooks[idx] = savedBook
                        return updatedBooks
                    } else {
                        return [...prevBooks, savedBook]
                    }
                })
                setIsEditing(false)
            })
            .catch(err => console.log('Error saving book:', err))
    }

    function onSelectBookId(bookId) {
        setSelectedBookId(bookId)
    }

    function onSetFilterBy(filterByToEdit) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterByToEdit }))
    }

    const loadingClass = isLoading ? 'loading' : ''

    return (
        <section className="book-index">
            {isEditing &&
                <BookEdit
                    bookId={selectedBookId}
                    onSaveBook={onSaveBook}
                    onBack={() => setIsEditing(false)}
                />
            }
            {!isEditing && selectedBookId &&
                <BookDetails
                    onBack={() => setSelectedBookId(null)}
                    bookId={selectedBookId}
                />
            }
            {!isEditing && !selectedBookId && books && (
                <React.Fragment>
                    <button className="add-book-btn" onClick={onAddBook}>Add Book</button>
                    <BookFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy} />
                    <BookList
                        loadingClass={loadingClass}
                        books={books}
                        onRemoveBook={onRemoveBook}
                        onSelectBookId={onSelectBookId}
                        onEditBook={onEditBook}
                    />
                </React.Fragment>
            )}
        </section>
    )
}
