const express=require("express");
const helmet=require("helmet");
const config=require("./config");
const {ProjectRoutes,UserRoutes,AdminRoutes,FavorilerRoutes}=require("./api-routes");
const {updateIlanImage} = require("./controllers/Projects")

const {create} = require("./controllers/Projects")
const loaders = require("./loaders");
const events=require("./scripts/events")
const path=require("path")
const cors = require('cors')
const multer  = require('multer')
const project=require("./models/Projects")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname + '/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + ".jpeg")
    }
  })
const upload = multer({ dest: 'uploads/', storage: storage })



config(); //yerlerini degistirme asagidakiyle yoksa loader icindekiler calismaz
loaders(); //DATABASE BAGLANTİ SURECLERİNİN YONETİLDİGİ İSLER
events();
const app=express();
app.use(express.json());
app.use(helmet());
app.use(cors())
app.use("/uploads",express.static(path.join(__dirname,"./","uploads")))

app.listen(process.env.APP_PORT,()=>{
    console.log("sunucu ayağa kalktı");
    app.use("/projects",ProjectRoutes.router);
    app.use("/users",UserRoutes.router);
    app.use("/admin",AdminRoutes.router);
    app.use("/favoriler",FavorilerRoutes.router);
    app.use("/users/login",UserRoutes.router);
    app.post("/upload", upload.array('photos', 12), create);

    // app.get("/ilanlar", (req, res) => {
    //   Project.find({isitma: "doğalgaz"})
    //     .then((projects) => res.json(projects))
    //     .catch((err) => res.status(400).json("Error: " + err));
    // });

    
    // app.get('/ilanlar', (req, res) => {
    //   const { isitma, odaSayisi, esyaDurumu, balkonDurumu } = req.query;
    //   let filter = {};
    //   if (isitma) filter.isitma = "klima";
    //   if (odaSayisi) filter.odaSayisi = "2";
    //   if (esyaDurumu) filter.esyaDurumu = "eşyalı";
    //   if (balkonDurumu) filter.balkonDurumu = "var";
    
    //   project.find(filter)
    //     .then(projects => res.json(projects))
    //     .catch(err => res.status(400).json('Error: ' + err));
    // });

    // app.get("/ilanlar", (req, res) => {
    //   Project.find({isitma: "doğalgaz"})
    //     .then((projects) => res.json(projects))
    //     .catch((err) => res.status(400).json("Error: " + err));
    // });
});
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // res.header('Access-Control-Allow-Methods',  'POST, GET, OPTIONS');
    next();
  });