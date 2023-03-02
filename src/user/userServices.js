var userModel = require('./userModel');
var key = 'somekey234567884456753456';
var encryptor = require('simple-encryptor')(key);
const ObjectId = require('mongodb').ObjectId;

module.exports.createUserDBService = (userDetails) => {

   return new Promise(function myFn(resolve, reject) {
      var userModelData = new userModel();

      userModelData.firstname = userDetails.firstname;
      userModelData.lastname = userDetails.lastname;
      userModelData.email = userDetails.email;
      userModelData.password = userDetails.password;
      var encrypted = encryptor.encrypt(userDetails.password);
      userModelData.password = encrypted;


      userModelData.save(function resultHandle(error, result) {
         if (error) {
            if (11000 === error.code || 11001 === error.code) {
               reject({ status: false, msg: "Usuario ya existe" });
            } else {
               reject({ status: false, msg: error });
            }
         }
         else {
            resolve({ status: true, msg: "Usuario creado" });
         }
      });
   });
}

module.exports.loginuserDBService = (userDetails) => {
   return new Promise(function myFn(resolve, reject) {
      userModel.findOne({ email: userDetails.email }, function getresult(errorvalue, result) {
         if (errorvalue) {
            reject({ status: false, msg: "Datos Invalidos" });
         }
         else {
            if (result != undefined && result != null) {
               var decrypted = encryptor.decrypt(result.password);

               if (decrypted == userDetails.password) {
                  resolve({ status: true, msg: "Usuario Validado" });
               }
               else {
                  reject({ status: false, msg: "Falla en validacion de usuario" });
               }
            }
            else {
               reject({ status: false, msg: "Detalles de usuario invalido" });
            }
         }
      });
   });
}

module.exports.listUsersDBService = () => {
   return new Promise((resolve, reject) => {
      userModel.find({}, (errorvalue, result) => {
         if(errorvalue){
            reject({ status: false, msg: errorvalue });
         }

         resolve({ status: true, msg: result });
         
      })
   })
}

module.exports.updateUserDBService = (userDetails, id) => {
   return new Promise((resolve, reject) => {
      userModel.findByIdAndUpdate({ _id: ObjectId(id) }, userDetails, (errorvalue, result) => {

         if (errorvalue) {
            reject({ status: false, msg: errorvalue });
         }

         if (result) {
            result.password = encryptor.encrypt(userDetails.password);

            result.save((error, result) => {
               if (error) {
                  if (11000 === error.code || 11001 === error.code) {
                     reject({ status: false, msg: "Correo en uso" });
                  } else {
                     reject({ status: false, msg: error });
                  }
                  reject({ status: false, msg: error });
               }
               resolve({ status: true, msg: "Usuario actualizado" });
            }
            )
            
         }

      })
   })
}

module.exports.searchUserDBService = (keyword) => {
   return new Promise(function myFn(resolve, reject) {
      userModel.findOne({ email: keyword }, function getResult(errorvalue, result) {
         if (errorvalue || result === null) {
            reject({ status: false, msg: "Usuario no encontrado" });
         }
         resolve({ status: true, msg: result })
      })
   })
}

module.exports.deleteUserDBService = (id) => {
   return new Promise((resolve, reject) => {
      userModel.findByIdAndDelete({ _id: ObjectId(id) }, (errorvalue, result) => {
         if (errorvalue) {
            reject({ status: false, msg: errorvalue });
         }

         if (result === null) {
            reject({ status: false, msg: "Usuario no encontrado" });
         }

         resolve({ status: true, msg: "Usuario eliminado" });
      })
   })
}