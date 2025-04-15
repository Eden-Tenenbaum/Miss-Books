export function BookPreview({ book }) {
    return (
        <article className="book-preview">
            <h2>{book.title}</h2>
            <h3>{book.subtitle}</h3>
            <p>Price: {book.listPrice.amount} {book.listPrice.currencyCode}</p>

            {book.listPrice.isOnSale && <div className="sale-badge">On Sale!</div>}

            <img src={book.thumbnail} alt={book.title} />
        </article>
    )
}