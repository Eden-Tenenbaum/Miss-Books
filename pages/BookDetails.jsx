import { bookService } from "../services/book.service.js"
import { LongTxt } from "../cmps/LongTxt.jsx"

const { useState, useEffect } = React

export function BookDetails({ bookId, onBack }) {
    const [book, setBook] = useState(null)

    useEffect(() => {
        loadBook()
    }, [bookId])

    function loadBook() {
        bookService.getById(bookId)
            .then(book => setBook(book))
            .catch(err => console.log('Error loading book details:', err))
    }

    if (!book) return <div>Loading book details...</div>

    // Get reading level based on page count
    function getReadingLevel() {
        if (book.pageCount > 500) return 'Serious Reading'
        if (book.pageCount > 200) return 'Descent Reading'
        if (book.pageCount < 100) return 'Light Reading'
        return ''
    }

    // Get book age category based on published date
    function getBookAgeCategory() {
        const currentYear = new Date().getFullYear()
        if (currentYear - book.publishedDate > 10) return 'Vintage'
        if (currentYear - book.publishedDate < 1) return 'New'
        return ''
    }

    // Get price color class
    function getPriceClass() {
        if (book.listPrice.amount > 150) return 'red'
        if (book.listPrice.amount < 20) return 'green'
        return ''
    }

    return (
        <section className="book-details">
            <h2>{book.title}</h2>
            <h3>{book.subtitle}</h3>

            <div className="book-info">
                <img src={book.thumbnail} alt={book.title} />

                <div className="book-details-content">
                    <p><strong>Authors:</strong> {book.authors.join(', ')}</p>
                    <p><strong>Published:</strong> {book.publishedDate}
                        {getBookAgeCategory() && <span className="book-category"> ({getBookAgeCategory()})</span>}
                    </p>
                    <p><strong>Language:</strong> {book.language}</p>
                    <p><strong>Categories:</strong> {book.categories.join(', ')}</p>
                    <p><strong>Page Count:</strong> {book.pageCount}
                        {getReadingLevel() && <span className="reading-level"> ({getReadingLevel()})</span>}
                    </p>

                    <p className={`book-price ${getPriceClass()}`}>
                        <strong>Price:</strong> {book.listPrice.amount} {book.listPrice.currencyCode}
                    </p>

                    {book.listPrice.isOnSale && <div className="on-sale">On Sale!</div>}

                    <h4>Description:</h4>
                    <LongTxt txt={book.description} length={100} />
                </div>
            </div>

            <button onClick={onBack}>Back to Books</button>
        </section>
    )
}