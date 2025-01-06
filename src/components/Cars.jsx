import React, { useEffect, useState } from 'react';
import '../styles/mainPage.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faArrowDownWideShort } from '@fortawesome/free-solid-svg-icons';
import { db, storage } from '../firebase';
import { getDownloadURL, ref, listAll } from "firebase/storage";
import { collection, getDocs } from "firebase/firestore";
import CarCard from './CarCard';

function MainPage() {
  const [listOfCars, setListOfCars] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'cars'));
        if (querySnapshot.empty) {
          alert("Access to server is restricted in your region");
        }
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setListOfCars(data);
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, [query]);

  useEffect(() => {
    const fetchImages = async () => {
      const imagesRef = ref(storage, 'cars/');
      try {
        const res = await listAll(imagesRef);
        const urls = await Promise.all(res.items.map(item => getDownloadURL(item)));
        setImages(urls);
      } catch (error) {
        alert(error);
      }
      setLoading(false);
    };
    fetchImages();
  }, []);



  return (
    <>
      <div className='searchBar'>
        <form>
          <input maxLength={25} placeholder='Search...' className='search' type='text'></input>
        </form>
        <FontAwesomeIcon className='filter-icon' icon={faFilter} />
        <FontAwesomeIcon className='order-icon' icon={faArrowDownWideShort} />
      </div>
      <div className='cars-container'>
        {!loading ? (
          listOfCars.map((car, index) => (
            <CarCard
              id={car.id}
              model={car.model}
              year={car.year}
              color={car.color}
              img={car.img_id}
              images={images}
            />
          ))
        ) : (
          <span className="loader"></span>
        )}
      </div>
    </>
  );
}

export default MainPage;
