const Mongoose=require("mongoose");
const logger=require("../scripts/logger/Projects");

const FavorilerSchema=new Mongoose.Schema({
   
    name:String,
    kira:{type:String},
    isitma:{type:String},
    odaSayisi:{type:String},
    esyaDurumu:{type:String},
    balkonDurumu:{type:String},
    aciklama:{type:String},
    onayDurum: { type: Number, default: 1 },
    // favoriDurum: { type: Number, default: 0 },
 

    ilan_id:{
        type:Mongoose.Types.ObjectId,
        ref:"project"
    },
    user_id:{
        type:Mongoose.Types.ObjectId,
        ref:"user"
    },



},
{timestamps: true, versionKey: false}
); 



module.exports=Mongoose.model("favori",FavorilerSchema)