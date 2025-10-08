import React, { useState } from 'react'

export default function Imagepath() {
  const [Imagepath,setImagePath] = useState(null);
  const GetData = (event) =>{
    const file = event.target.files[0];
    const path = URL.createObjectURL(file);
    setImagePath(path)
  }
    return (
        <>
        <input type="file" onChange={(event)=>GetData(event)} />
        {
            Imagepath ? <img src={Imagepath} alt="imagecrashed" /> : <></>
        }</>
  )
}
