import { useState } from 'react'

import './App.css'

function App() {
  const [data, setData] = useState([])
  function guardarArchivo(e) {
    
      var file = e.target.files[0] //the file
      var reader = new FileReader() //this for convert to Base64 
      reader.readAsDataURL(e.target.files[0]) //start conversion...
      reader.onload = function (e) { //.. once finished..
        var rawLog = reader.result.split(',')[1]; //extract only thee file data part
        var dataSend = { dataReq: { data: rawLog, name: file.name, type: file.type }, fname: "uploadFilesToGoogleDrive" }; //preapre info to send to API
        fetch('https://script.google.com/macros/s/AKfycbyO6FI5ja7c2ng9ojSbOTZ0bZUxfrgLtYBZUXQ4LqVSzHTD4xyjTOS3SGF0McnvC9U4/exec', //your AppsScript URL
          { method: "POST", body: JSON.stringify(dataSend) }) //send to Api
           .then(res => res.json()).then((a) => {
            setData(a)
            console.log(a) 
           }).catch(e => console.log(e)) 
      }
  }

  return (
    <>
     <div className="App">
      <div className="App-header">
        <p>Just choose the image, it will automatically upload</p>
        <p>Please wait a while depending on the size of the image to upload</p>
        <p>Then copy the <b>id</b> inside the double quotations</p>
        <input type="file" accept="application/pdf" id="customFile" onChange={(e) => guardarArchivo(e)} />
      </div>
      <div>
         <p style={{color:'white'}}>{JSON.stringify(data.id)}</p>
      </div>
    </div>
    </>
  )
}

export default App
