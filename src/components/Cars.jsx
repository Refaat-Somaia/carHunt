import { createElement,useEffect,useState } from 'react'
import '../styles/mainPage.css'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter,faArrowDownWideShort } from '@fortawesome/free-solid-svg-icons'
import {db,storage} from '../firebase'
import { getDownloadURL, ref,listAll } from "firebase/storage";
import { collection,getDocs } from "firebase/firestore";



function MainPage() {


    const [listOfCars, setlistOfCars] = useState([]);
    const [images,setImages]=useState([]);
    const [loading,setLoading]=useState(true);
    const [query,setQuery]=useState()
    

    useEffect(() => {
        const fetchData = async () => {
          try {
            // const q = query(collection(db, "cars"), where("capital", "==", true));
            const querySnapshot = await getDocs(collection(db, 'cars'));
            if(querySnapshot.empty){
                alert("Access to server is restricted in your region")
            }
            const data =  querySnapshot.docs.map(doc => 

                ({ id: doc.id, ...doc.data() }));
            setlistOfCars(data);
            
          } catch (error) {
           alert(error)
          } 
        };
       fetchData();
      }, [query]);

      useEffect(() => {
        const fetchImages = async () => {
          const imagesRef = ref(storage, 'cars/'); // Adjust the path for your image folder
          
          try {
            const res = await listAll(imagesRef);
            const urls = await Promise.all(
              res.items.map(item => getDownloadURL(item))
            );
            setImages(urls);
          } catch (error) {
           alert(error)
          }
    
          setLoading(false)
        };
    
        fetchImages();
      }, []);

      useEffect(() => {

        if(images.length>0)
        {
          setTimeout(function(){
        const items = document.querySelectorAll('.car-button');

          items.forEach((item, index) => {
            item.addEventListener('click', () => {
              window.location.href=`/CarDetails/?id=${listOfCars[index].id}`
            });
        });
      },300)
        }
      }, [images]);


    const createCar= (model,year,color,img)=>{
        return createElement(
            'div',
            { className: 'cars-card' },
            createElement('div',{className:'img-container'},
            createElement(
             'img',
             {src: images[img],className:'car-img'},
            ),),
            createElement(
                'p',
                {className:"car-model"},
                model
               ),
               createElement(
                'p',
                {className:"car-year"},
                year
               ),
               createElement(
                'div',
                {className:"car-color",style: {color: "red", backgroundColor: color}},
               ),
            createElement(
                'button',
                {className:"car-button"},
                'Book'
               )
          );

     
        
     }
  return (
    
    <>
    <div className='searchBar'>
        <form >
        <input maxLength={25} placeholder='Search...' className='search' type='text'></input>
        </form>
        <FontAwesomeIcon  className='filter-icon' icon={faFilter} />
        <FontAwesomeIcon className='order-icon' icon={faArrowDownWideShort} />
    </div>
    <div className='cars-container'>

        {!loading? listOfCars.map(car=>(
            createCar(car.model,car.year,car.color,car.img_id)
        )):
        
        <span class="loader"></span>
        }
          
      </div>
      </>

  )
}
export default MainPage