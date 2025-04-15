const { useState } = React

import { AppHeader } from "./cmps/AppHeader.jsx"
import { HomePage } from "./pages/HomePage.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { AboutUs } from "./pages/AboutUs.jsx"


export function RootCmp() {

    const [page, setPage] = useState('book')

    return (
        <section className="app">
            <AppHeader onSetPage={(page) => setPage(page)} />

            <main>
                {page === 'home' && <HomePage />}
                {page === 'about' && <AboutUs />}
                {page === 'book' && <BookIndex />}
            </main>
        </section>
    )
}