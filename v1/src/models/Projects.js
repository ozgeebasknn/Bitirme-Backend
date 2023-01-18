const Mongoose=require("mongoose");
const logger=require("../scripts/logger/Projects");
const ProjectSchema=new Mongoose.Schema({
    name:String,
    ilan_image: {data:Buffer},
    // ilan_image:String,
    kira:String,
    isitma:String,
    odaSayisi:String,
    esyaDurumu:String,
    balkonDurumu:String,
    aciklama:String,
    onayDurum: { type: Number, default: 0 },
    favoriDurum: { type: Number, default: 0 },

    user_id:{
        type:Mongoose.Types.ObjectId,
        ref:"user"
    },

},
{timestamps: true, versionKey: false}
); 

ProjectSchema.pre("save",(next)=>{
    //console.log("öncesi",doc)
    next();
});

ProjectSchema.post("save",(doc)=>{
    // console.log("sonrası",object);
    logger.log({
        level:"info",
        message:doc,
    })
    //..kayıt edilmistir..loglama
});

module.exports=Mongoose.model("project",ProjectSchema)