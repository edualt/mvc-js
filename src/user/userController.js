var userService = require('./userServices');

var createUserControllerFunc = async (req, res) => {
    try {
        console.log(req.body);
        var response = await userService.createUserDBService(req.body);
        console.log(response);

        if (response.status) {
            res.send({ "status": true, "message": "Usuario creado" });
        } else {
            res.send({ "status": false, "message": response.msg });
        }
    }
    catch (err) {
        console.log(err);
        res.send({ "status": false, "message": err.msg });
    }
}

var loginUserControllerFunc = async (req, res) => {
    var result = null;
    try {
        result = await userService.loginuserDBService(req.body);
        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

const updateUserControllerFunc = async (req, res) => {

    try {
        const result = await userService.updateUserDBService(req.body, req.params);

        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }
    }
    catch (err) {
        console.log(err);
        res.send({ "status": false, "message": "Correo en uso" });
    }
}

var searchUserControllerFunc = async (req, res) => {
    var result = null;
    try {
        result = await userService.searchUserDBService(req.param("email"));
        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        }
        else {
            res.send({ "status": false, "message": result.msg });
        }
    }
    catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg })
    }
}

const deleteUserControllerFunc = async (req, res) => {
    try {
        const result = await userService.deleteUserDBService(req.params);
        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        }
        else {
            res.send({ "status": false, "message": result.msg });
        }
    }
    catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg })
    }
}

const listUsersControllerFunc = async (req, res) => {
    try {
        const result = await userService.listUsersDBService();
        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        }
        else {
            res.send({ "status": false, "message": result.msg });
        }
    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg })
    }
}

module.exports = { createUserControllerFunc, loginUserControllerFunc, searchUserControllerFunc, updateUserControllerFunc, deleteUserControllerFunc, listUsersControllerFunc };