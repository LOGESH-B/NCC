if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

//basic
const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate')


//Module import
const User = require("./models/user")
const Activity = require("./models/recent_activity")
const Slider = require("./models/slider")


//import js
const {links} = require('./public/js/drive.js')
const {document_links}= require('./public/js/drive.js')
const {sheets,achivementssheets}=require('./public/js/googlesheets')

//delete and put
const methodOverride = require('method-override')

//for path and flash
const path = require("path")
const flash = require('connect-flash');

//middleware
const { isLoggedIn } = require("./middleware/auth");

//session
const session = require('express-session')

//passport
const passport = require("passport");
const localStrategy = require("passport-local")

//initialize



const app = express()
app.use(express.static(path.join(__dirname, "/public")))

app.use(session({
  secret: "Our little secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'))
app.engine('ejs', ejsMate)

//database connection
//local
//mongoose.connect("mongodb://localhost:27017/NCCDb");
//db
mongoose.connect("mongodb+srv://kecncc:armymajor@cluster0.hsewwik.mongodb.net/?retryWrites=true&w=majority");


//passport initialization
passport.use(new localStrategy(User.authenticate()));
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//local variable middleware
app.use(async (req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next()
})

//app engine
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));


//setting port
const port =  443 


//home routes

app.get('/', async (req, res) => {
  const found = await Activity.find({});


  const sliders = await Slider.find({});
  if (found && sliders) {
    req.flash('success', 'Welcome to KEC NCC')
    res.render('homepage/home', { found, sliders });
  }

})


//slider routes
app.get('/slider_add', isLoggedIn, (req, res) => {
  res.render('homepage/slider_add')
})
app.post('/slider_add', isLoggedIn, async (req, res) => {
  const newslider = req.body
  const slider = new Slider(newslider);
  await slider.save();
  console.log(slider)
  req.flash('success', 'Successfully Added')
  res.redirect('/')
})
app.get('/slider/:_id/edit', isLoggedIn, async (req, res) => {
  const { _id } = req.params
  const slide = await Slider.findOne({ _id })
  res.render('homepage/slider_edit', { slide })
})
app.put('/slider/:_id/edit', isLoggedIn, (req, res) => {
  const { _id } = req.params
  Slider.findOneAndUpdate({ _id }, { ...req.body }, { new: true, runValidators: true }, (err, edited) => {
    if (!err) {
      req.flash('success', 'Updated Successfully');
      res.redirect('/');
    }
  })
})




//activiry routes
app.get('/all_activity', async (req, res) => {
  const found = await Activity.find({});
  if (found) {
    res.render('activitypages/all_activity', { found })
  }

})
app.get('/activity/:_id', async (req, res) => {
  const { _id } = req.params
  const event = await Activity.findOne({ _id })
  res.render('activitypages/activity', { event })
})
app.get('/activity/:_id/edit', isLoggedIn, async (req, res) => {
  const { _id } = req.params
  const event = await Activity.findOne({ _id })
  res.render('activitypages/activity_edit', { event })
})
app.put('/activity/:_id/edit', isLoggedIn, (req, res) => {
  const { _id } = req.params
  Activity.findOneAndUpdate({ _id }, { ...req.body }, { new: true, runValidators: true }, (err, edited) => {
    if (!err) {
      req.flash('success', 'Updated Successfully');
      res.redirect('/');
    }
  })
})
app.get('/activity_add', isLoggedIn, (req, res) => {
  res.render('activitypages/activity_add')
})
app.post('/activity_add', isLoggedIn, async (req, res) => {
  const newactivity = req.body
  const activity = new Activity(newactivity);
  await activity.save();
  req.flash('success', 'Successfully Added')
  res.redirect('/')
})
app.get('/activity/:_id/delete', isLoggedIn, async (req, res) => {
  const { _id } = req.params
 const deleted=await Activity.findByIdAndDelete({ _id })
    if (!deleted) {
      req.flash('error', 'Error Occured')
      res.redirect('/')
    }
    req.flash('success', 'Deleted Sucessfully')
    res.redirect('/')
  })



//achievements routes
app.get('/achivements', async(req, res) => {
  const achivements=await achivementssheets();
  console.log(achivements)
  if(achivements){res.render('achivements',{achivements})}
  else{req.flash('error','Something Went Wrong'),res.redirect('/')}
  
})


//dashboard
app.get('/dashboard', (req, res) => {
  res.render('dashboardpages/dashboard')
})
app.get('/dashboard/army', (req, res) => {
  res.render('dashboardpages/dashboard_army');
})
app.get('/dashboard/air', (req, res) => {
  res.render('dashboardpages/dashboard_air');
})



//cadets
app.get('/cadets', (req, res) => {
  res.render('cadetspage/cadets')
})
app.get('/documents/subjects/:id',async (req,res)=>{
  const list=await document_links(req.params.id);
  res.render('cadetspage/cadets_subjects',{list,value:'Subjects'})
})
app.get('/documents/circular/:id',async (req,res)=>{
  const list=await document_links(req.params.id);
  res.render('cadetspage/cadets_circular',{list,value:'Circular'})
})
app.get('/documents/newsletter/:id',async (req,res)=>{
  const list=await document_links(req.params.id);
  res.render('cadetspage/news_letter',{list})
})
app.get('/documents/camp_documents/:id',async (req,res)=>{
  const list=await document_links(req.params.id);
  res.render('cadetspage/cadets_documents',{list,value:'Camp Documents'})
})
app.get('/general_rules',(req,res)=>{
  res.render('cadetspage/general_rules')
})




//gallery
app.get('/gallery', async (req, res) => {
  const link = await links();
  if(link){ res.render('gallery', { link })}
  else{res.redirect('/')}
  
})

app.get('/gallery/:id', async (req, res) => {
  const { id } = req.params;
  const link = await links(id);
  if(link.length!=0){ res.render('gallery', { link })}
  else{req.flash('error','Data Not Found/Data Set Empty'),res.redirect('/gallery')}
  
 
})


//about routes
app.get('/about', (req, res) => {
  res.render('aboutpages/about_ncc');
})
app.get('/aboutkec', (req, res) => {
  res.render('aboutpages/about_kecncc');
})



//developement routes




//Auth routes

app.get('/login', (req, res) => {
  res.render('authpage/login');
})
app.post('/login',
  passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'Successfully Logged In!');
    res.redirect('/');
  });
app.get("/logout", function (req, res) {
  req.logout((err) => {
    if (err) {
      req.flash("error", err.message)
      res.redirect("/");
    }
    req.flash("success", 'Successfully Logged Out')
    res.redirect("/");

  });

});

app.get('/signup', (req, res) => {
  res.render('authpage/signup')
})
app.post('/signup', (req, res) => {
  User.register({ username: req.body.username, name: req.body.name, reg_no: req.body.reg_no, discription: req.body.discription }, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      if (err.code == 11000) {
        req.flash('error', "Roll Number Already Exits");
        res.redirect("/signUp");
      }
      else {
        req.flash('error', err.message);
        res.redirect("/signup");
      }

    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/");
      });
    }
  });
})


//Port entry
app.listen(port, function () {
  console.log("Started")
}
)
