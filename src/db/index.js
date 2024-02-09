const mongoose = require('mongoose');

module.exports = {
  connect: () => {
    //if (this.connection) return this.connection;
    return mongoose.connect('mongodb+srv://camilolindarte1992:camilo123456@cluster0.dzpdjrj.mongodb.net/quizTest')
      .then(connection => {
        this.connection = connection;
        console.log('Conexion a DB exitosa');
      }).catch(err => console.log(err))
  }
}