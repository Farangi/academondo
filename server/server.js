var compression = require('compression');
var express     = require('express');
var path        = require('path');
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var passport	  = require('passport');
var config      = require('./config/database'); // get db config file

var User        = require('./app/models/user'); // get the mongoose model
var fieldOfInterest = require('./app/models/fieldOfInterest');
var technique = require('./app/models/technique');
var country = require('./app/models/country');
var news = require('./app/models/news');
var lab = require('./app/models/lab');


var port        = process.env.PORT || 8080;
var jwt         = require('jwt-simple');

var index = require('./routes/index');

var cors = require('cors');

var CORSURLFreeDNS = 'http://altruvation.mooo.com';
var CORSURLFreeDNSHero = 'https://altruvation.herokuapp.com/';
var CORSURLLocal = 'http://localhost:4200'
var gstatic = 'https://www.gstatic.com';
var app         = express();

//nodemailer
var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var nodemailerpw = 'QfP3NxcvYYvZ40EZJQyjN7eO';
var nodemaileruser = 'n3wpassw%40gmail.com';
// var transporter = nodemailer.createTransport('smtps://' + nodemaileruser + ':' + nodemailerpw + '@smtp.gmail.com');

// // setup e-mail data with unicode symbols
// var mailOptions = {
//     from: '"Fred Foo ?" <foo@blurdybloop.com>', // sender address
//     to: 'n3wpassw@gmail.com', // list of receivers
//     subject: 'Hello ✔', // Subject line
//     text: 'Hello world ?', // plaintext body
//     html: '<b>Hello world ?</b>' // html body
// };

// // send mail with defined transport object
// transporter.sendMail(mailOptions, function(error, info){
//     if(error){
//         return console.log(error);
//     }
//     console.log('Message sent: ' + info.response);
// });

// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
// log to console
app.use(morgan('dev'));
// use gzip
app.use(compression());
 
// Use the passport package in our application
app.use(passport.initialize());

app.use(cors());

//CORS handling
// app.use(function(req, res, next) {
//   // var allowedOrigins = [CORSURLLocal, CORSURLFreeDNS, CORSURLFreeDNSHero];
//   // var origin = req.headers.origin;
//   // console.log('trying to hanlde CORS', origin);
//   // if(allowedOrigins.indexOf(origin) > -1){
//   //      res.setHeader('Access-Control-Allow-Origin', origin);
//   // }
//   // else if(origin) {    
//   //   res.setHeader('Access-Control-Allow-Origin', origin);
//   //   console.log('Illegal! ', origin);
//   // }
  
//   // res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//   // res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   // res.header('Access-Control-Allow-Credentials', true);
//   res.header("Access-Control-Allow-Origin", "*");

//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   return next();
// });

// access to dist folder
app.use(express.static(path.join(__dirname, '../dist'))); 
app.get('/', index);

// connect to database
mongoose.connect(config.database);
 
// pass passport for configuration
require('./config/passport')(passport);
 
// bundle our routes
var apiRoutes = express.Router();
 
// create a new user account (POST http://localhost:8080/api/register)
apiRoutes.post('/register', function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({success: false, msg: 'Please pass username and password.'});
  } else {
    var newUser = new User({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      admin: false
    });
    // save the user
    newUser.save(function(err) {
      if (err) {     
        return res.json({success: false, msg: 'Username already exists.'});
      }   
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/authenticate', function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err; 
    if (!user) {         
      res.send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.encode(user, config.secret);
          // return the information including token as JSON          
          res.json({success: true, token: 'JWT ' + token, user: user.username});
        } else {
            res.send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

// route to a restricted info (GET http://localhost:8080/api/admin)
apiRoutes.get('/admin', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      username: decoded.username
    }, function(err, user) {
        if (err) throw err; 
        if (!user) {
          return res.status(403).send({
            success: false,
            msg: 'Authentication failed. User not found.'
          });
        } if (user.username && user.admin) {
            res.json({
              success: true,
              msg: 'Welcome in the admin area ' + user.username + '!'
            });
        } else {
          res.json({
              success: false,
              msg: 'you are not admin ' + user.username + '!'
            });
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});

// route to a restricted info (GET http://localhost:8080/api/memberinfo)
apiRoutes.get('/memberinfo', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      username: decoded.username
    }, function(err, user) {
        if (err) throw err; 
        if (!user) {
          return res.status(403).send({
            success: false,
            msg: 'Authentication failed. User not found.'
          });
        } else if (user.username) {
            res.json({
              success: true,
              msg: 'Welcome in the member area ' + user.username + '!'
            });
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});
 
getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

// route to  (GET http://localhost:8080/api/fieldOfInterest)
apiRoutes.get('/fieldofinterest', function(req, res){
  fieldOfInterest.find({}, function(err, fieldOfInterests) {
      if (err) throw err;
      else {
        res.send(fieldOfInterests);        
      }
    });
});

// route to  (GET http://localhost:8080/api/labTechnique)
apiRoutes.get('/labTechnique', function(req, res){
  technique.find({}, function(err, labTechniques) {
      if (err) throw err;
      else {
        res.send(labTechniques);        
      }
    });
});

// route to  (GET http://localhost:8080/api/countries)
apiRoutes.get('/country', function(req, res){
  country.find({}, function(err, countries) {
      if (err) throw err;
      else {
        res.send(countries);        
      }
    });
});

// route to  (GET http://localhost:8080/api/news)
apiRoutes.get('/news', function(req, res){
  news.find({}, function(err, news) {
      if (err) throw err;
      else {
        res.send(news);        
      }
    });
});

// route to  (POST http://localhost:8080/api/news)
apiRoutes.post('/news', function(req, res){
  var newnews = new news ({
    title: req.body.title,
    desc: req.body.desc
  });
  newnews.save(function(err) {
    if (err) throw err;
    else {
      res.send(true);
    }    
  });
});


// route to  (POST http://localhost:8080/api/lab)
apiRoutes.post('/lab', function(req, res){  
  var newlab = new lab ({
    name: req.body.name,
    address: req.body.address,
    zip: req.body.zip,
    country: req.body.country,
    email: req.body.email,
    groupLeader: req.body.groupLeader,
    about: req.body.about,
    publications: req.body.publications,
    techniques: req.body.techniques,
    fieldOfInterests: req.body.fieldOfInterests
  });
  newlab.save(function(err) {
    if(err) {
      return res.send(false);  
    }
    res.send(true);
  });
});

// route to  (GET http://localhost:8080/api/lab)
apiRoutes.get('/lab', function(req, res){
  lab.find({}, function(err, labs) {
      if (err) throw err;
      else {
        res.send(labs);        
      }
    });
});

 
// connect the api routes under /api/*
app.use('/api', apiRoutes);

// redirect all others to the index (HTML5 history)
app.get('*', function(request, response){
  response.sendfile('./dist/index.html');
});

// Start the server
app.listen(port);
console.log('There will be dragons: http://localhost:' + port);