const mongoose = require("mongoose");
const User = require("./models/User");
const Doc = require("./models/Doc");
const Song = require("./models/Inst");
const Carg = require("./models/Carg");

class Controller {
    constructor() {
        //al crearse el objeto se establece la conexion
        this.connect();
    }

    async connect() {
        try {
            //se intenta establecer una conexion con los datos de conexion
            await mongoose.connect(
                "mongodb+srv://carlos27:admin@cluster0.nvo54.mongodb.net/?retryWrites=true&w=majority",
                { useNewUrlParser: true }
            );
            //en caso de esablecer la conexion, se muestra en consola este mensaje
            console.log("Connected databases.");
        } catch (e) {
            //en caso de haber un error se muestra en consola el error
            console.error(e);
        }
    }

    //CRUD user
    setUser(user, res) {
        // Se recibe el nuevo usuario en la variable user y se crea a partir del modelo
        User.create(user, function(err, newUser) {
            // sihay error se reporta
            if (err) throw err;
            // se retorna la informacion con el nuevo usuario creado
            res.send({ status: 200, nU: newUser });
        });
    }

    //metodo para buscar todos los usuarios
    getUsers(req, res) {
        //en el modelo User se ejecuta el find sin ninguna condicion...
        User.find({}, (err, users) => {
            //en caso de haberse presentado un error se ejecuta el error
            if (err) throw err;
            //de lo contrario se retorna un objeto con todos los resultados
            res.send({ allUsers: users });
        });
    }

    getUser(id, res) {
        //en el modelo User se ejecuta el find sin ninguna condicion...
        User.find({ _id: id }, (err, user) => {
            //en caso de haberse presentado un error se ejecuta el error
            if (err) throw err;
            //de lo contrario se retorna un objeto con todos los resultados
            res.send({ User: user });
        });
    }

    updateUser(user, res) {
        //optenemos los campos que queremos actualizar
        let { id, picture, password } = user;
        //actualizamos teniendo en cuenta una condicion con el operador $set
        //https://docs.mongodb.com/manual/reference/operator/update/set/
        User.updateOne(
            { _id: id },
            { $set: { picture: picture, password: password } }
        )
            .then(rawResponse => {
                res.send({ message: "User updated", raw: rawResponse });
            })
            .catch(err => {
                if (err) throw err;
            });
    }

    deleteUser(id, res) {
        User.deleteOne({ _id: id }, function(err) {
            if (err) throw err;
            res.send({ message: "User has been deleted" });
        });
    } // remove, findByIdAndRemove, findOneAndRemove

    //CRUD Doc
    setUserDoc(user_id, Doc, res) {
        Doc.user_id = user_id;
        Doc.create(Doc, function(err, newDoc) {
            if (err) return handleError(err);
            res.send({ status: 200, id_Doc: newDoc._id });
        });
    }

    getUserDocs(id, res) {
        Doc.find({ user_id: id }, function(err, userDoc) {
            if (err) throw err;
            res.send({ status: 200, user_Doc: userDoc });
        });
    }

    getUserDoc(user_id, Doc_id, res) {
        Doc.find({ _id: Doc_id, user_id: user_id })
            .populate({
                path: "song_id",
                select: "name Cargs duraction",
                populate: {
                    path: "Cargs",
                    select: "name1 name2 last_name1 last_name2"
                }
            })
            .exec(function(err, userDocSong) {
                if (err) throw err;
                res.send({ status: 200, user_Doc_song: userDocSong });
            });
    }

    //CRUD song
    setSong(song, res) {
        Song.create(song, function(err, newSong) {
            if (err) throw err;
            res.send({ status: 200, id_song: newSong._id });
        });
    }
    getSongs(res) {
        Song.find().exec(function(err, songs) {
            if (err) throw err;
            res.send({ status: 200, Cargs: songs });
        });
    }
    getSong(id, res) {
        Song.find({ _id: id }).exec(function(err, song) {
            if (err) throw err;
            res.send({ status: 200, Cargs: song });
        });
    }

    updateDoc(song_id, id_user, id_Doc, res) {
        //actualizamos teniendo en cuenta una condicion con el operador $push
        // https://docs.mongodb.com/manual/reference/operator/update/push/
        Doc.updateOne({ _id: id_Doc }, { $push: { song_id: song_id } })
            .then(rawResponse => {
                res.send({ message: "Doc updated", raw: rawResponse });
            })
            .catch(err => {
                if (err) throw err;
            });
    }

    //CRUD Carg
    setCarg(Carg, res) {
        Carg.create(Carg, function(err, newCarg) {
            if (err) throw err;
            res.send({ status: 200, id_Carg: newCarg._id });
        });
    }

    getCargs(res) {
        Carg.find().exec(function(err, Carg) {
            if (err) throw err;
            res.send({ status: 200, Cargs: Carg });
        });
    }

    getCarg(id, res) {
        Carg.find({ _id: id }).exec(function(err, Carg) {
            if (err) throw err;
            res.send({ status: 200, Cargs: Carg });
        });
    }

    updateSong(song_id, Cargs, res) {
        //actualizamos teniendo en cuenta una condicion con el operador $push
        // https://docs.mongodb.com/manual/reference/operator/update/push/
        Song.updateOne({ _id: song_id }, { $push: { Cargs: Cargs } })
            .then(rawResponse => {
                res.send({ message: "Song updated", raw: rawResponse });
            })
            .catch(err => {
                if (err) throw err;
            });
    }
}
// se exporta elobjeto controlador crado a partir de la clase Controller
exports.controller = new Controller();
