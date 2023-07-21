import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [file, setFile] = useState()
  const [image, setImage] = useState()
  const handleUpload = (e) => {
    const formData = new FormData()
    formData.append('file', file)
    axios
      .post('https://mern-project-api-pi.vercel.app/upload', formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    axios
      .get('https://mern-project-api-pi.vercel.app/getImage')
      .then((res) => setImage(res.data[3].image))
      .catch((err) => console.log(err))
  }, [])
  return (
    <>
      <label htmlFor='imageUpload'>Choose Your Image</label>
      <input type='file' onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      <br />
      <img
        src={`https://mern-project-api-pi.vercel.app/images/` + image}
        alt=''
      />
    </>
  )
}

export default App
