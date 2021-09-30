const router = require('express').Router()
const { User } = require('../models')
// bringing in passport and json webtoken
const passport = require('passport')
const jwt = require('jsonwebtoken')
// getting the current user
router.get('/user', passport.authenticate('jwt'), (req, res) => res.json(req.user))
// registering a user
router.post('/users/register', (req, res) => {
  const { name, username } = req.body
  User.register(new User({ name, username }), req.body.password, err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})
// logging a user in
router.post('/users/login', (req, res) => {
  User.authenticate()(req.body.username, req.body.password, (err, user) => {
    if (err) { console.log(err) }
    res.json(user ? jwt.sign({ id: user._id }, process.env.SECRET) : null)
  })
})
// allowing editing user
router.put('/users', passport.authenticate('jwt'), async function (req, res) {
  await User.findByIdAndUpdate(req.user._id, { $set: req.body })
  res.sendStatus(200)
})
// deleting a user
router.delete('/users', async function (req, res) {
  await User.findByIdAndDelete(req.user._id)
  res.sendStatus(200)
})

module.exports = router
