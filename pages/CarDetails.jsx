import { carService } from "../services/car.service.js"

const { useState, useEffect } = React

export function CarDetails({ carId, onBack }) {

    const [car, setCar] = useState(null)
    useEffect(() => {
        console.log('Mounting Details')
        loadCar()
    }, [])

    function loadCar() {
        carService.get(carId)
            .then(car => setCar(car))
            .catch(err => console.log('err:', err))
    }
    
    if (!car) return <div>Loading...</div>
    const { vendor, speed } = car
    return (
        <section className="car-details container">
            <h1>Car Vendor: {vendor}</h1>
            <h1>Car Speed: {speed}</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis quae fuga eveniet, quisquam ducimus modi optio in alias accusantium corrupti veritatis commodi tenetur voluptate deserunt nihil quibusdam. Expedita, architecto omnis?</p>
            <img src={`../assets/img/${vendor}.png`} alt="Car Image" />
            <button onClick={onBack}>Back</button>
        </section>
    )
}