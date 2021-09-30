// bringing in dot env
require('dotenv').config()

const express = require('express')
const { join } = require('path')
// bringing in passport, local, and jwt
const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt')

const { User } = require('./models')
const syncDB = require('./db')

const app = express()

app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// initalizing passport
app.use(passport.initialize())
app.use(passport.session())
// creating authenticate, serialize, and deserialize functions
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
// using a new JWT strategy for passport
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
}, ({ id }, cb) => User.findById(id)
  .populate('items')
  .then(user => cb(null, user))
  .catch(err => console.log(err))))

app.use(require('./routes'))

syncDB()
  .then(() => app.listen(process.env.PORT || 3000))
  .catch(err => console.log(err))
