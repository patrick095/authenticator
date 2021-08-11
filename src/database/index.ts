import mongoose from 'mongoose'
require('dotenv').config()

mongoose.connect(`${process.env.MONGODB_URL}`,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then(() => console.log("mongodb successfuly connected"))

export default mongoose