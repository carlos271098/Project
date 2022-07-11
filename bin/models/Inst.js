const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InstSchema = new Schema({
  name: String,
  duraction: String,
  Cargs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Carg"
    }
  ],
  Doc_id: [
    {
      type: Schema.Types.ObjectId,
      ref: "Doc"
    }
  ]
});

var Inst = mongoose.model("Inst", InstSchema);
module.exports = Inst;
