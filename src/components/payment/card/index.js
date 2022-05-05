/* eslint-disable no-unused-expressions */
import React,{useState,useEffect} from 'react'
import './style.css'
import axios from 'axios'
const initialstate ={
    "amount":99.00,
    "payment_method":"card",
    "card":{
    "number":"",
    "expiry_month":"",
    "expiry_year":"",
    "cvd":"",
    "name":""
      
    }
}
function Card() {
    const [cardPayment,setCardPayment]=useState(initialstate)
    const [profileToken,setProfileToken]=useState("")
    useEffect(() => {
   const cleaner=()=>{

   }
   return cleaner()
    }, [profileToken])
    
    const changeHandler=(e)=>{
        const name=e.target.name
        const value=e.target.value
        
        setCardPayment({...cardPayment,card:{...cardPayment.card,[name]:value}})
        

    }
    const handelSubmit=async()=>{
    
        const config = {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `${process.env.REACT_APP_PAYMENT_TOKEN}`
            }
          };
        
      await  axios.post('https://api.na.bambora.com/v1/payments',cardPayment, config).then((response)=>{
            alert("Hurrah your payment is sucessfully paid!!!")
            const confirm=window.confirm("Want to create your Payment profile to save your card details for future payment")
            
            if(confirm===true){
              const body={
                "create_from_id":response?.data?.id
              } 
              const configs={

                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${process.env.REACT_APP_PROFILE_TOKEN}`    
                }
                
              }
             axios.post('https://api.na.bambora.com/v1/profiles',body,configs).then(response => {
            alert("Hurrah your payment profile is created sucessfully sucessfully paid!!!, Please check the console for logs or for the customer id")
            console.log(response.data)
        })
              .catch(error => {console.log(error)})
            
            } 
            }
            
        )
        .catch((error)=>{console.log(error)})
    }
    const createProfile=async()=>{
      alert("Generating Token,please wait...")

     const {card}=cardPayment
     await  axios.post('http://localhost:8001/token',card )
      .then(async(response)=>{
        const config = {
          headers:{
              'Content-Type': 'application/json',
              'Authorization': `${process.env.REACT_APP_PROFILE_TOKEN}`
          }
        };
       const {name}=card
       const code=response?.data?.token
        const profile={
          "token":{  
            "name":name,
            "code":code
          }
      }
      console.log(profile)
       await axios.post('https://api.na.bambora.com/v1/profiles',profile,config )
            .then(res=>{
              res?.data?.customer_code && setProfileToken(res?.data?.customer_code)
              console.log(res.data,"line123")
            
            })
            .catch(err=>console.log(err))

    }).catch((error)=>{
        alert("It is blocked by CORS Policy. You can use postman collection for this call.You will get this link on console")
        console.log(error)
    })
    
    }
    const makePayment=async()=>{
      alert("Transaction is being processing please wait...")
      const payment={
        "amount":99.00,
        "payment_method":"payment_profile",
        "payment_profile":{
        "customer_code":profileToken,
        "card_id":1       
        }
        
   }
   const config = {
    headers:{
        'Content-Type': 'application/json',
        'Authorization': `${process.env.REACT_APP_PAYMENT_TOKEN}`
    }
  };
      await axios.post('https://api.na.bambora.com/v1/payments',payment,config)
            .then(res=>res.data.message==="Approved"?(alert("Transaction is sucessfully")):console.log("something went wrong"),setProfileToken(""))
            .catch(err=>{alert("transaction is declined!!!");console.log(err);setProfileToken("");window.location.reload()})

    
    
    }

  return (
   <div >
 <div className="pcard">
  <div className="top">
    <div >
    <div className="payment">Payment Details</div>
     <div className="payment-amount" > Amount to be paid $99.0</div>   
        </div>  
    <div className="visa">
      <svg xmlns="http://www.w3.org/2000/svg" version={1.0} width="1000.000000pt" height="380.000000pt" viewBox="0 0 1000.000000 380.000000" preserveAspectRatio="xMidYMid meet">
        <g transform="translate(0.000000,380.000000) scale(0.100000,-0.100000)" fill="#FFF" stroke="none">
          <path d="M5960 3289 c-241 -23 -478 -105 -645 -224 -83 -58 -195 -179 -243 -261 -102 -172 -135 -390 -86 -564 40 -141 155 -290 310 -402 44 -31 163 -101 266 -157 220 -117 262 -145 316 -206 89 -101 70 -232 -46 -315 -187 -136 -611 -111 -969 55 l-92 43 -11 -67 c-6 -36 -28 -171 -49 -299 l-38 -233 28 -14 c47 -25 230 -74 355 -95 834 -143 1482 153 1589 725 35 184 8 361 -77 502 -75 127 -252 270 -463 375 -241 121 -362 204 -397 271 -25 49 -27 112 -4 155 23 44 92 99 153 122 178 67 498 41 735 -60 39 -17 73 -29 75 -26 4 4 93 539 93 562 0 16 -157 67 -275 88 -187 35 -347 42 -525 25z" />
          <path d="M2778 2778 c-97 -260 -249 -672 -339 -915 -90 -244 -166 -443 -169 -443 -3 0 -21 78 -39 173 -41 207 -62 271 -135 414 -171 334 -445 630 -783 847 -40 25 -73 41 -73 36 0 -5 132 -510 294 -1122 162 -612 300 -1134 306 -1161 l12 -47 371 2 371 3 463 1135 c254 624 500 1228 547 1343 l85 207 -368 0 -368 0 -175 -472z" />
          <path d="M3761 1928 c-117 -728 -216 -1335 -218 -1350 l-5 -28 346 0 346 0 5 23 c3 12 100 609 215 1327 116 718 212 1315 215 1328 l5 22 -348 0 -348 0 -213 -1322z" />
          <path d="M7892 3235 c-71 -16 -147 -59 -179 -103 -11 -15 -32 -50 -46 -77 -24 -50 -1047 -2490 -1047 -2500 0 -3 163 -5 363 -5 l362 0 74 205 73 205 448 0 448 0 10 -47 c6 -27 25 -119 43 -205 l33 -158 321 0 322 0 -44 213 c-24 116 -151 723 -281 1347 l-238 1135 -299 2 c-224 1 -316 -2 -363 -12z m278 -1215 c55 -266 100 -490 100 -497 0 -10 -59 -13 -289 -13 l-289 0 70 188 c38 103 121 331 185 506 65 175 118 315 120 310 1 -5 48 -227 103 -494z" />
          <path d="M9285 856 c-111 -49 -121 -200 -18 -267 39 -26 118 -25 161 1 43 27 76 99 68 149 -16 97 -122 156 -211 117z m116 -21 c87 -45 92 -179 9 -229 -78 -45 -177 5 -187 95 -12 106 87 180 178 134z" />
        </g>
      </svg>
    </div>
  </div>
  <div className="card-body">
    {
      profileToken===""?
      <form>
      <div className="one">
        <label htmlFor>Name on card</label>
        <input placeholder="Johny Relative" type="text" name="name" value={cardPayment.card.name} onChange={(e)=>{changeHandler(e)}}/>
      </div>
      <div className="two">
        <label htmlFor>Card Number</label>
        <input maxLength={16} placeholder="4478 6632 9923 8890" type="text" name="number" value={cardPayment.card.number} onChange={(e)=>{changeHandler(e)}} />
      </div>
      <div className="three">
        <label htmlFor>Expiry Date</label>
        <select defaultValue={cardPayment.card.expiry_month!==''? cardPayment.card.expiry_month:'January' } name="expiry_month" onChange={(e)=>{changeHandler(e)}}>
        <option value="01">January</option>
        <option value="02">February</option>
        <option value="03">March</option>
        <option value="04">April</option><option value="05">May</option>
        <option value="06">June</option>
        <option value="07">July</option>
        <option value="08">August</option>
        <option value="09">September</option><option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>
      </div>
      <div className="four">
        {/* blank character */}
        <label htmlFor>​</label>
        <select defaultValue={cardPayment.card.expiry_year!==''? cardPayment.card.expiry_year:'2022' } name="expiry_year" onChange={(e)=>{changeHandler(e)}} >
          <option value="22">2022</option>
          <option value="23">2023</option>
          <option value="24">2024</option>
          <option value="25">2025</option>
          <option value="26">2026</option>
          <option value="27">2027</option>
        </select>
      </div>
      <div className="five" >
        <label htmlFor>CVV</label>
        <input name="cvd" value={cardPayment.card.cvd} onChange={(e)=>{changeHandler(e)}} maxLength={4} placeholder={633} type="number" />
      </div>
    </form>
    :
    <form>
      <div className="one">
        <label htmlFor>Profile Token</label>
        <input placeholder="" type="text" name="name" value={profileToken} disabled/>
      </div>
      
    
    </form>
    }
   
  </div>
  
  {
    profileToken===""?
    <>
    <button className="Buttons" onClick={handelSubmit}>
    Proceed to pay
</button>
<button className="Buttons2" onClick={createProfile}>
    Create Payment Profile
</button>
</>:
<button className="Buttons2" style={{position:"relative", top:65}} onClick={makePayment}>
    Make Payment
</button>
  }
 

 
</div>



   </div> 



  )
}

export default Card