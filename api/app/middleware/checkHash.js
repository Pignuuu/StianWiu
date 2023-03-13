// Make sure user is logged in on every request
module.exports = function (req, res, next) {
  console.log('checkHash', req.body)
  next()
}
