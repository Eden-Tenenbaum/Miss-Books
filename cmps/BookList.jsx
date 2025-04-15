import { BookPreview } from "./BookPreview.jsx"

export function BookList({ books, onRemoveBook, onSelectBookId, loadingClass }) {

    return (
        <ul className={`book-list ${loadingClass}`}>
            {books.map(book =>
                <li key={book.id}>
                    <BookPreview book={book} />
                    <div className="book-action">
                        <button onClick={() => onRemoveBook(book.id)}>Remove</button>
                        <button onClick={() => onSelectBookId(book.id)}>Details</button>
                    </div>
                </li>
            )}
        </ul>
    )
}