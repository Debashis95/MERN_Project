const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const multer = require('multer')
const cors = require('cors')
const userModel = require('./model/model')

const app = express()
app.use(
  cors({
    origin: ['https://mern-project-client-three.vercel.app'],
    methods: ['POST', 'GET'],
    credentials: true,
  })
)
const port = 7000

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/images')
  },
  filename(req, file, cb) {
   
    cb(null, file.fieldname + '-' +path.extname(file.originalname))
  },
})

const upload = multer({ storage: storage })

app.post('/upload', upload.single('file'), (req, res) => {
  userModel
    .create({ image: req.file.filename })
    .then((result) => res.json(result))
    .catch((error) => console.log(error))
})

app.get('/getImage', (req, res) => {
  userModel
    .find()
    .then((result) => res.json(result))
    .catch((error) => console.log(error))
})

const dbDriver =
  'mongodb+srv://debashis:R7KmV58sN3smMeN@cluster0.eihs8.mongodb.net/imageUpload'

mongoose
  .connect(dbDriver, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    app.listen(port, () => {
      console.log('DB is connected')
      console.log(`Server is Running @ http://localhost:${port}`)
    })
  })
  .catch((err) => {
    console.log('Error')
  })
