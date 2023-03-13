const router = require('express').Router()
const controllers = require('../controllers/spotify.js')
// router.get('/current-track', controllers.currentTrack)
router.ws('/current-track', function (ws, req) {
  controllers.currentTrack(ws, req);
});


module.exports = router;
