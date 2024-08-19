import {React,useEffect,useState} from 'react';
import '../styles/CarInfo.css'
import {Link} from "react-scroll";
import {db,storage} from '../firebase'
import { getDoc,doc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import BookingDetails from './BookingDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation, faL } from '@fortawesome/free-solid-svg-icons'

function CarInfo() {

  
  const [carInfo, setCarInfo] = useState(
    {model:"",year:0,seats:0,color:"",ppd:"",url:"",type:"" 
  })
  const [loading,setLoading]=useState(true)
  const [img,setImg]=useState("")
  const [alertAnimation,setAlertAnimation]=useState("")
  const [next,setNext]=useState(false)

  var alertText="Please log in or create an account"

useEffect(() => {
    const fetchData = async () => {
        const urlParams = new URLSearchParams(window.location.search)
        const carId= urlParams.get("id")

      try {
        const docRef = doc(db, "cars", carId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setCarInfo(
                docSnap.data()
                // {model:docSnap.data(),year:0,seats:0,color:"",ppd:"",url:""}
            )
            const imageRef = ref(storage, `cars/${docSnap.data().model}.png`);
            getDownloadURL(imageRef)
              .then((url) => {
      setImg(
        url
      )
              })
              .catch((error) => {
                alert("Error getting image URL: "+error);
              });
      setLoading(false)
            
          } else {
            console.log("No such document!");
          }
        
       
      } catch (error) {
       alert(error)
      } 
    };
   fetchData();
  },[]);

  function showDate(){
    if(localStorage.getItem("userName")==null){
      document.getElementById("alert").style.display="block"
      setAlertAnimation("alert-in 1s forwards")
      setTimeout(function(){
        setAlertAnimation("alert-out 1s forwards")
      },4000)
    }

   else if(!next){
    setNext(true)
    setTimeout(function(){
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  },100)}
  }

  return (
    loading?
    <div className='container-loader'>
      <span className="loader"></span></div>:
    <>
    <div style={{animation:alertAnimation}} id="alert">
    <FontAwesomeIcon className='icon' icon={faCircleExclamation} />
    <p>{alertText}</p>
    </div>

    <div className='container'>
    <div className='container-img'>
       {img.length==0? <span className="loader"style={{marginTop:"4rem"}}></span>
       : <img className='car-info-img' src={img}></img>}
        </div>
        <div className='info-container'>
        <h2 className='info-model'>{carInfo.model}</h2>
        <p className='info-p'>Production year: {carInfo.year}</p>
        <p className='info-p'>Type: {carInfo.type}</p>
        <p className='info-p'>Number of seats: {carInfo.seats}</p>
        <p className='info-p'>Color: {carInfo.color}</p>
        <p className='info-p'>Price per day: {carInfo.ppd}$</p>
           <Link   to="bookDate" offset={next? -200:0} smooth={true} spy={true} duration={500} className='navBar-btn'>
            <button onClick={showDate} className='book-btn'>Next</button>
           </Link>
        

        </div>
    </div>

    <BookingDetails showDate={next} model={carInfo.model} year={carInfo.year}
    color={carInfo.color} ppd={carInfo.ppd}/>
    </>
  )
}

export default CarInfo