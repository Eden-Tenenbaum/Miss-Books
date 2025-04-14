import { CarPreview } from "./CarPreview.jsx";

export function CarList({ loadingClass, cars, onRemoveCar, onSelectCarId }) {

    if (!cars.length) return <div>No Cars To Show...</div>
    return (
        <ul className="car-list container">
            {cars.map(car => (
                <li className={loadingClass} key={car.id}>
                    <CarPreview car={car} />
                    <section>
                        <button onClick={() => onRemoveCar(car.id)}>
                            Remove
                        </button>
                        <button onClick={() => onSelectCarId(car.id)}>
                            Details
                        </button>
                    </section>
                </li>
            ))}
        </ul>
    )

}