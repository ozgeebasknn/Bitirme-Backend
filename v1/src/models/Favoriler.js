const Mongoose=require("mongoose");
const logger=require("../scripts/logger/Projects");
const FavorilerSchema=new Mongoose.Schema({

    favori:{type:Mongoose.Schema.ObjectId, ref:'Project'},
    

    user_id:{
        type:Mongoose.Types.ObjectId,
        ref:"user"
    },
    project_id:{
        type:Mongoose.Types.ObjectId,
        ref:"project"
    }



},
{timestamps: true, versionKey: false}
); 



module.exports=Mongoose.model("favori",FavorilerSchema)