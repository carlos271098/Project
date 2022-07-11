//requerimos las biblotecas express para las rutas, bodyParser para loenvios por post de JSON
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
//midware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
//llamamos el controlador que se encarga de gestionar la base de datos
const { controller } =
    require("./Controller");

//creamos la ruta raiz para enviar un mensaje de bienvenida con la version
app.get("/version", (req, res) => {
    //retornamos un mensaje
    res.send({ version: "1.0.0" });
});

//Routes for user
//Agregar a un usuario
app.post("/users", function(req, res) {
    let { user } = req.body;
    controller.setUser(user, res);
});

//creamos la ruta users que deberá traer todos los usuarios
app.get("/users", (req, res) => {
    //llamamos el metodo getUser del objeto controller, este se encarga de buscar todos los usuarios
    //recibe por parametros req que es igual a la consulta request(consulta) y el res que equivale al response(respuesta)
    controller.getUsers(req, res);
});

//Traer a un usuario por su id
app.get("/users/:id", function(req, res) {
    let { id } = req.params;
    controller.getUser(id, res);
});

//Actualizar a un usuario por su id
app.put("/users/:id", function(req, res) {
    let user = req.body.user;
    user.id = req.params.id;
    controller.updateUser(user, res);
});

//Eliminar a un usuario por su id
app.delete("/users/:id", function(req, res) {
    let { id } = req.params;
    controller.deleteUser(id, res);
});

//Routes for Doc
//Agregar una Doca de usuario
app.post("/users/:user_id/Docs", (req, res) => {
    let { user_id } = req.params;
    let { Doc } = req.body;
    controller.setUserDoc(user_id, Doc, res);
});

//Traer las Docas de un usuario
app.get("/users/:id/Docs", function(req, res) {
    let { id } = req.params;
    controller.getUserDocs(id, res);
});

//Traer una Doca específica de un usuario
app.get("/users/:user_id/Docs/:Doc_id", (req, res) => {
    let { user_id, Doc_id } = req.params;
    controller.getUserDoc(user_id, Doc_id, res);
});

//Routes for Inst
//Guardar una cancion
app.post("/Insts", (req, res) => {
    let { Inst } = req.body;
    controller.setInst(Inst, res);
});

//traer todas las canciones
app.get("/Insts", (req, res) => {
    controller.getInsts(res);
});

//traer una cancion
app.get("/Insts/:id", (req, res) => {
    let { id } = req.params;
    controller.getInst(id, res);
});

//Actualizar una Doca con canciones
app.put("/users/:id_user/Docs/:id_Doc/", function(req, res) {
    let { Inst_id } = req.body;
    let { id_user, id_Doc } = req.params;
    controller.updateDoc(Inst_id, id_user, id_Doc, res);
});

//Routes for Carga
//Agregar un Carga
app.post("/Cargs/", (req, res) => {
    let { Carg } = req.body;
    controller.setCarg(Carg, res);
});

// Traer todos los Cargas
app.get("/Cargs/", (req, res) => {
    controller.getCargs(res);
});

//traer un Carga por su id
app.get("/Cargs/:id", (req, res) => {
    let { id } = req.params;
    controller.getCarg(id, res);
});

//Actualizar canciones con Cargas
app.put("/Insts/:id_Inst/", function(req, res) {
    let { id_Inst } = req.params;
    let { Cargs } = req.body;
    controller.updateInst(id_Inst, Cargs, res);
});
//exportamos la constante app con toda la configuracion de las rutas
exports.app = app;
