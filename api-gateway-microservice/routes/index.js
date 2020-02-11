var router = require('express').Router()

router.use('/user', require('./user'))
router.use('/model', require('./model'))
router.use('/weather', require('./weather'))

module.exports = router