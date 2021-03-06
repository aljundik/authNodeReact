const Authentication =  require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt',{session: false});
const requireSigin = passport.authenticate('local',{session: false});
module.exports = function (app) {
  app.get('/',requireAuth,function(req,res){
    res.send({message: 'Super sercret code is abc123'});
  });


  app.post('/signin',requireSigin, Authentication.signin);
  app.post('/signup', Authentication.signup);
}