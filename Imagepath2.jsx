import React from 'react'

export default function Imagepath2() {
    const [Imagepath2,setImagePath2] = React.useState(null);
    const GetData = (event) =>{
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () =>{
            setImagePath2(reader.result)
        }
    }
    return (
    <>
        <input type="file" onChange={(event)=>GetData(event)} />
        {
            Imagepath2 ? <img src={Imagepath2} alt="imagecrashed" /> : <></>
        }
    </>
  )
}
