import React from 'react';

const CarCard = ({ model, year, color, img, images, id }) => {
    return (
        <div className="cars-card">
            <div className="img-container">
                <img src={images[img]} alt={`${model}`} className="car-img" />
            </div>
            <p className="car-model">{model}</p>
            <p className="car-year">{year}</p>
            <div
                className="car-color"
                style={{ color: "red", backgroundColor: color }}
            ></div>
            <button onClick={() => { window.location.href = `/CarDetails/?id=${id}` }} className="car-button">Book</button>
        </div>
    );
};

export default CarCard;
