import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookEdit({ bookId, onSaveBook, onBack }) {
    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())

    useEffect(() => {
        if (bookId) loadBook()
    }, [bookId])

    function loadBook() {
        bookService.getById(bookId)
            .then(setBookToEdit)
            .catch(err => console.log('Error loading book to edit:', err))
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        if (target.type === 'number') value = +value
        if (field.includes('.')) {
            const [main, sub] = field.split('.')
            setBookToEdit(prev => ({
                ...prev,
                [main]: { ...prev[main], [sub]: value }
            }))
        } else {
            setBookToEdit(prev => ({ ...prev, [field]: value }))
        }
    }

    function handleArrayChange(ev) {
        const { name, value } = ev.target
        setBookToEdit(prev => ({ ...prev, [name]: value.split(',') }))
    }

    function onSubmitForm(ev) {
        ev.preventDefault()
        onSaveBook(bookToEdit)
    }

    const book = bookToEdit

    return (
        <section className="book-edit">
            <h2>{bookId ? 'Edit Book' : 'Add Book'}</h2>

            <form onSubmit={onSubmitForm}>
                <label>Title:
                    <input name="title" value={book.title} onChange={handleChange} required />
                </label>

                <label>Subtitle:
                    <input name="subtitle" value={book.subtitle} onChange={handleChange} />
                </label>

                <label>Authors (comma-separated):
                    <input name="authors" value={book.authors.join(',')} onChange={handleArrayChange} />
                </label>

                <label>Published Year:
                    <input type="number" name="publishedDate" value={book.publishedDate} onChange={handleChange} />
                </label>

                <label>Description:
                    <textarea name="description" value={book.description} onChange={handleChange} />
                </label>

                <label>Page Count:
                    <input type="number" name="pageCount" value={book.pageCount} onChange={handleChange} />
                </label>

                <label>Categories (comma-separated):
                    <input name="categories" value={book.categories.join(',')} onChange={handleArrayChange} />
                </label>

                <label>Thumbnail URL:
                    <input name="thumbnail" value={book.thumbnail} onChange={handleChange} />
                </label>

                <label>Language:
                    <input name="language" value={book.language} onChange={handleChange} />
                </label>

                <label>Price:
                    <input type="number" name="listPrice.amount" value={book.listPrice.amount} onChange={handleChange} />
                </label>

                <label>Currency Code:
                    <input name="listPrice.currencyCode" value={book.listPrice.currencyCode} onChange={handleChange} />
                </label>

                <label>On Sale:
                    <input type="checkbox" name="listPrice.isOnSale" checked={book.listPrice.isOnSale} onChange={handleChange} />
                </label>

                <button type="submit">Save Book</button>
                <button type="button" onClick={onBack}>Cancel</button>
            </form>
        </section>
    )
}
