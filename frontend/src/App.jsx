import React, { useState } from 'react'

const App = () => {
  const [file,setFile]=useState(null)
  const [data,setData]=useState(null)

  const handleFileUpload =(e)=>{
    setFile(e.target.files[0])

  }

  const handleFileSubmit= async ()=>{

    const formdata =new FormData()
    formdata.append('file',file)

    const res =await fetch("http://127.0.0.1:5000/upload",{
      method:"POST",
      body:formdata
    })

    const result = await res.json()
    setData(result.data)

  }
  return (
    <div>
      <input type="file" accept='.csv' onChange={handleFileUpload} />
      <button onClick={handleFileSubmit}>upload</button>
      <pre>{JSON.stringify(data,null,2)}</pre>
    </div>
  )
}

export default App