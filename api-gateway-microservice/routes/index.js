var router = require('express').Router()

router.use('/user', require('./user'))
router.use('/model', require('./model'))
router.use('/weather', require('./weather'))
router.use('/results', require('./results'))

module.exports = router