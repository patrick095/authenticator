import app from './app'
require('dotenv').config()

const { PORT } = process.env

app.listen(PORT || 3000)