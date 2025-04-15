const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { title, maxPrice } = filterByToEdit
    return (
        <section className="book-filter">
            <h2>Filter Books</h2>
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={handleChange}
                    placeholder="Search by title"
                />

                <label htmlFor="maxPrice">Max Price:</label>
                <input
                    type="number"
                    id="maxPrice"
                    name="maxPrice"
                    value={maxPrice || ''}
                    onChange={handleChange}
                    placeholder="Maximum price"
                />

                <button>Filter</button>
            </form>
        </section>
    )
}