import "../styles/BookingDetails.css"
import {React, useEffect,useRef,useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileCircleCheck,faCircleExclamation,faLocationDot,faCircleCheck,faCalendarDays,faClock,faDollar } from '@fortawesome/free-solid-svg-icons'


const BookingDetails = (props) => {
    const [isDateVisible, setisDateVisible] = useState("");
    const [isAddressVisible, setisAdressVisible] = useState(false);
    const [isConfirmVisible, setisConfirmVisible] = useState(false);
    const [showNewAddressInput,setshowNewAddressInput]=useState(false)
    const [duration,setduration]=useState(0)
    const dateRef = useRef(null);
    const addressRef = useRef(null);
    const confirmRef = useRef(null);
    const [alertAnimation,setAlertAnimation]=useState("")
    const [alertText,setAlertText]=useState("")
    const [bookDetails,setBookDetails]=useState({
      startDate:"",
      endDate:"",
      address:""
    })

  let [month, date, year] = new Date().toLocaleDateString("en-US").split("/");
  const today =new Date().getDay()
  const monthsMap = new Map([
    [1, 'January'],
    [2, 'February'],
    [3, 'March'],
    [4, 'April'],
    [5, 'May'],
    [6, 'June'],
    [7, 'July'],
    [8, 'August'],
    [9, 'September'],
    [10, 'October'],
    [11, 'November'],
    [12, 'December']
]);

var daysInMonthMap = new Map([
  ['January', 31],
  ['February', 28], // 29 in leap years
  ['March', 31],
  ['April', 30],
  ['May', 31],
  ['June', 30],
  ['July', 31],
  ['August', 31],
  ['September', 30],
  ['October', 31],
  ['November', 30],
  ['December', 31]
]);

  
  
 useEffect(()=>{
  let e= document.getElementById("monthFrom")
  let e1= document.getElementById("monthTo")

  
  let day=document.getElementById("dayFrom")
  let day1=document.getElementById("dayTo")
  
  day.innerHTML='<option value="" disabled selected >Day</option>'
  day1.innerHTML='<option value="" disabled selected >Day</option>'

  e.innerHTML=""
  e1.innerHTML=""
  e.innerHTML+='<option value="" disabled selected hidden>Month</option>'
  for(let i=parseInt(month);i<=12;i++){
    e.innerHTML+=`<option value="${i}">${monthsMap.get(i)}</option>`
  }
  e1.innerHTML=e.innerHTML
  var valueOfe=0
  var valueOfe1=0
  var valueOfday=0
  var valueOfday1=0

  e.addEventListener('change', function(event) {
    valueOfday=0
    day.innerHTML='<option value="" disabled selected >Day</option>'
    const selectedValue =parseInt( event.target.value);
    let i=selectedValue==month?today:1
    for(i;i<=daysInMonthMap.get(monthsMap.get(selectedValue));i++){
  day.innerHTML+=`<option value="${i}">${i}</option>`
    }
    valueOfe=selectedValue
    checkDateValidity()

  })

  e1.addEventListener('change', function(event) {
    valueOfday1=0

    day1.innerHTML='<option value="" disabled selected >Day</option>'
    const selectedValue =parseInt( event.target.value);
    let i=selectedValue==month?today:1
    for(i;i<=daysInMonthMap.get(monthsMap.get(selectedValue));i++){
  day1.innerHTML+=`<option value="${i}">${i}</option>`
    }
    valueOfe1=selectedValue
    checkDateValidity()

  })

  

  

  // day.innerHTML+='<option value="" disabled selected >Day</option>'
  // day1.innerHTML+='<option value="" disabled selected >Day</option>'

  day.addEventListener('change', function(event) {
    valueOfday=parseInt( event.target.value)
    checkDateValidity()

  })

  day1.addEventListener('change', function(event) {
    valueOfday1=parseInt( event.target.value)

    checkDateValidity()
    
  })

  function checkDateValidity(){
    if(valueOfday!=0&&
      valueOfday1!=0&&
      valueOfe!=0&&
      valueOfe1!=0){

    if(calculateDaysBetweenDates(valueOfe,valueOfday,valueOfe1,valueOfday1)<1){
      setAlertText("Please enter a valid date")
      showDateAlert()
      setduration(0)
    }
    else if(valueOfday!=0&&valueOfday1!=0){
    setduration(calculateDaysBetweenDates(valueOfe,valueOfday,valueOfe1,valueOfday1)
    )
    bookDetails.startDate=monthsMap.get(valueOfe)+","+valueOfday
    bookDetails.endDate=monthsMap.get(valueOfe1)+","+valueOfday1
    setBookDetails(bookDetails)
      
  }
    }
    else if(valueOfday==0||valueOfday1==0){
      setduration(0)

      }
  }

  function calculateDaysBetweenDates(month1, day1, month2, day2) {
    const date1 = new Date(year, month1 - 1, day1); // Months are zero-based
    const date2 = new Date(year, month2 - 1, day2);
    
    const timeDifference = date2 - date1;
    
    const dayDifference = timeDifference / (1000 * 60 * 60 * 24);
    
    return (Math.round(dayDifference));
}


 },[])
  
  
    const checkVisibility = () => {
      if (dateRef.current) {
        const rect = dateRef.current.getBoundingClientRect();
        const isElementVisible = (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
        if(isElementVisible&&props.showDate)
        {
            setisDateVisible("slide-in-date 1s forwards")
        }
      }
    };

    
  
    useEffect(() => {
      window.addEventListener('scroll', checkVisibility);
      window.addEventListener('resize', checkVisibility);
      
      // Initial check
      checkVisibility();
  
      return () => {
        window.removeEventListener('scroll', checkVisibility);
        window.removeEventListener('resize', checkVisibility);
      };
    }, [props.showDate]);

    function showAdress(){
      if(duration>0){
        setisAdressVisible(true)
        setTimeout(function(){
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
          },0)}
        else{
          setAlertText("Please select a date first")
          showDateAlert()
        }
        }
    
          function showNewAddres(){
            setshowNewAddressInput(true)
          }
          function showDateAlert(){
            document.getElementById("alertAdressSaved").style.display="none"
            document.getElementById("alertInvalidDate").style.display="block"
            
            setAlertAnimation("alert-in 1s forwards")
            setTimeout(function(){
              setAlertAnimation("alert-out 1s forwards")
            },4000)
          }

          function showAddressAlert(){
            document.getElementById("alertInvalidDate").style.display="none"
            document.getElementById("alertAdressSaved").style.display="block"
            setAlertAnimation("alert-in 1s forwards")
            setTimeout(function(){
              setAlertAnimation("alert-out 1s forwards")
            },4000)
          }

          function saveNewAddress(){
         setAlertText("New address was saved")
         showAddressAlert()
       
          }


          function showConfirm(){
              setisConfirmVisible(true)
              setTimeout(function(){
                  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                },0)
             
              }

              function showRequestSent(){
                setTimeout(function(){
                document.getElementById("blurBg1").style.display='block'
                document.getElementsByClassName('notify')[0].style.display='block'
              },300)
              }
              function closeBgBlur(){
                document.getElementById("blurBg1").style.display='none'
                document.getElementsByClassName('notify')[0].style.display='none'

              }
    
   
    return(
    <>
     <div id="blurBg1" onClick={closeBgBlur} >
   
     </div>
     <div className="notify">
    <FontAwesomeIcon className='icon' icon={faFileCircleCheck} />

      <p>Your request was successfully sent and will be reviewed 
        shortly.</p>
    <button onClick={closeBgBlur} className='book-btn'>Ok</button>
        </div>
     <div style={{animation:alertAnimation}} id="alertAdressSaved">
    <FontAwesomeIcon className='icon' icon={faCircleCheck} />
    <p>{alertText}</p>
    </div>

    <div style={{animation:alertAnimation}} id="alertInvalidDate">
    <FontAwesomeIcon className='icon' icon={faCircleExclamation} />
    <p>{alertText}</p>
    </div>
    <div style={{animation:isDateVisible,display:props.showDate?"block":"none"}} 
    id="bookDate" ref={dateRef} className="contianer-date">
        <h2 >Booking date</h2>
        <div className="row">

        <div className="column">
            <h3>From</h3>
        <select id="monthFrom">

        </select> 

        <select id="dayFrom">

        </select>
        </div>

        <div className="column">
            <h3>To</h3>
        <select id="monthTo">
    <option value="hide"> Month</option>
        </select> 

        <select id="dayTo">

        </select>
        </div>
        <p>Duration: {duration} days</p>
        <button onClick={showAdress} className='book-btn'>Next</button>
        </div>
    </div>

    <div className="contianer-address" ref={addressRef} 
    style={{animation:isDateVisible,display:isAddressVisible?"block":"none"}}>
        <h2>Your address</h2>
        <p>Your current address is:</p>
{     showNewAddressInput? <input  placeholder='New address...' className='signUp-input' type='text'>

</input>:
        <h3>{localStorage.getItem("userAddress")}</h3>}
        <div className="row">
        <button onClick={showNewAddressInput?saveNewAddress:
             showNewAddres} className='edit-address-btn'>{showNewAddressInput?"Save":"Edit"}</button>

        </div>
        <button onClick={showConfirm} className='book-btn'>Next</button>

    </div>

    <div className="contianer-confirm" ref={confirmRef} 
    style={{animation:isDateVisible,display:isConfirmVisible?"block":"none"}}> 
    <h2>Booking details</h2>
    <div className="column">

      <p style={{opacity:0.6, textAlign:"center"}}>Your are about to send a request to book a </p>
      <h1>{props.color+" "+props.year+" "+ props.model}</h1>
    <p><FontAwesomeIcon className="icon" icon={faCalendarDays} />
    From: {bookDetails.startDate}.
    &nbsp; To:&nbsp;{bookDetails.endDate}.&nbsp;{`(${duration} days)`}
    </p>

    <p><FontAwesomeIcon className="icon" icon={faLocationDot} />
    To be delivered to this address: {localStorage.getItem("userAddress")}
    </p>

    <p><FontAwesomeIcon className="icon" icon={faDollar} />
    For a total cost of: {(props.ppd*duration)}$
    </p>

    <button onClick={showRequestSent} className='book-btn'>Confirm</button>

    </div>

    </div>

    </>
    )
}
export default BookingDetails