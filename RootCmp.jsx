const { useState } = React

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./pages/About.jsx"
import { Home } from "./pages/Home.jsx"
import { CarIndex } from "./pages/CarIndex.jsx"

export function RootCmp() {

    const [page, setPage] = useState('car')

    return (
        <section className="app">
            <AppHeader onSetPage={(page) => setPage(page)} />

            <main>
                {page === 'home' && <Home />}
                {page === 'about' && <About />}
                {page === 'car' && <CarIndex />}
            </main>
        </section>
    )
} 