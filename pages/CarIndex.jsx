import { CarFilter } from "../cmps/CarFilter.jsx"
import { CarList } from "../cmps/CarList.jsx"
import { carService } from "../services/car.service.js"
import { CarDetails } from "./CarDetails.jsx"

const { useState, useEffect } = React

export function CarIndex() {

    const [cars, setCars] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [selectedCarId, setSelectedCarId] = useState(null)
    const [filterBy, setFilterBy] = useState(carService.getDefaultFilter())
    // console.log('filterBy:', filterBy)

    useEffect(() => {
        loadCars()
    }, [filterBy])

    function loadCars() {
        carService.query(filterBy)
            .then(cars => setCars(cars))
            .catch(err => console.log('err:', err))
    }

    function onRemoveCar(carId) {
        setIsLoading(true)
        carService.remove(carId)
            .then(() => {
                setCars((prevCars) => prevCars.filter(car => car.id !== carId))
            })
            .catch(err => console.log('err:', err))
            .finally(() => setIsLoading(false))
    }

    function onSelectCarId(carId) {
        setSelectedCarId(carId)
    }

    function onSetFilterBy(filterByToEdit) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterByToEdit }))
    }


    const loadingClass = isLoading ? 'loading' : ''
    // console.log('selectedCarId:', selectedCarId)
    return (
        <section className="car-index">
            {selectedCarId &&
                <CarDetails
                    onBack={() => onSelectCarId(null)}
                    carId={selectedCarId}
                />
            }
            {!selectedCarId && (
                cars
                    ? <React.Fragment>
                        <CarFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy} />
                        <CarList
                            loadingClass={loadingClass}
                            cars={cars}
                            onRemoveCar={onRemoveCar}
                            onSelectCarId={onSelectCarId}
                        />
                    </React.Fragment>
                    : <div>Loading...</div>
            )}
        </section>
    )

}