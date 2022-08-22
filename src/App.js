import React,{useState} from 'react';
import './App.css';
// import axios from 'axios';

function loadRazorpay(src){
  return new Promise(resolve => {
  const script = document.createElement('script');
  script.src = src
  script.onload = () => {
    resolve(true)
  }
  script.onerror = () => {
    resolve(false)
  }
  document.body.appendChild(script);
})
  }

function App() {
  const [amount,setamount,loading] = useState('');
  async function displayRazorpay(){
    const res = await loadRazorpay('https://checkout.razorpay.com/v1/checkout.js')
    // const handleSubmit = (e)=>{
    // e.preventDefault();
    if(!res){
    alert("please enter amount");
    return
    }
    const data = await fetch('http://localhost:3000/razorpay', {method: 'POST'}).then((t) =>
    t.json()
    )
    console.log(data)
    const options = {
    key: process.env.RAZORPAY_KEY_ID, 
    key_secret: process.env.RAZORPAY_SECRET_KEY,
    amount: data.amount, 
    currency: data.currency,
    name: "Acme Corp",
    description: "Test Transaction",
    order_id: data.id, 
    handler: function (response){
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature)
    },
    prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999"
    },
    notes: {
        address: "Razorpay Corporate Office"
    },
    theme: {
        color: "#3399cc"
    }
};
const pay = new window.Razorpay(options);
      pay.open();
  }
  
  return (
    <div className="App">
      <h2><b>Razorpay Payment Integration Using React</b></h2>
     
       {/* <form onSubmit={displayRazorpay}>    */}
   <div class="mb-3">
     <label for="exampleInputEmail1" class="form-label">Email address</label>
     <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='xyz@gmail.com' />
     <br />
   </div>
   <div class="mb-3">
     <label for="exampleInputPassword1" class="form-label">Password</label>
     <input type="password" class="form-control" id="exampleInputPassword1" placeholder='******' />
     <br /><br />
      Amount: {"  "}
         <input placeholder="INR"
        type="number" value={amount} onChange={(e)=>setamount(e.target.value)} />
      <br /><br />
      <button disabled={loading} onClick={displayRazorpay}>
         Submit and Pay
        </button>
        {loading && <div>Loading...</div>}
      </div>
      {/* </form> */}
    </div>
  );
// }
}

// function login(e){
//     e.preventDefault();
//     let request = {
//     email: document.getElementById('exampleInputEmail1').value,
//     password: document.getElementById('exampleInputPassword1').value, 
//   }
//     axios.post('http://localhost:3000/login', request)
//   .then(resp => {
//     alert(resp.data.message);
//   })
//   .catch(err => {
//     console.log(err);
//   })
// }

export default App;
