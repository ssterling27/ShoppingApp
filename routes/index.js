const router = require('express').Router()

router.use('/api', require('./itemRoutes.js'))
router.use('/api', require('./userRoutes.js'))

module.exports = router

// 6154ca622fb8ed3ff0c94ce6
