const mongoose= require('mongoose')

require('dotenv').config({path:'variable.env'})

const DBConnection = async () => {
   try {
      await mongoose.connect(process.env.DB_MONGO,{
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useFindAndModify: false
     })
     console.log('BD Conectada');
   } catch (error) {
      console.log(error)
      throw new Error('Failed to initialize database')
   }

   

}

module.exports = DBConnection