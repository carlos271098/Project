const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DocSchema = new Schema({
  name: String,
  descripcion: String,
  gender: String,
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  Inst_id: [
    {
      type: Schema.Types.ObjectId,
      ref: "Inst"
    }
  ]
});

var Doc = mongoose.model("Doc", DocSchema);
module.exports = Doc;
