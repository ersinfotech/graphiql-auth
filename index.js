const request = require('request-promise')

module.exports = ({
  eadminBaseUrl,
  clientId,
  callbackUrl,
}) => ({
  get: (req, res) => {
    res.sendFile(__dirname + '/login.html')
  },
  post: (req, res, next) => {
    const {email, password} = req.body
    request({
      url: eadminBaseUrl + '/oauth/signin',
      method: 'post',
      body: {
        client_id: clientId,
        email,
        password,
      },
      json: true,
    })
    .then(({access_token}) => {
      res.redirect(callbackUrl + `?access_token=${access_token}`)
    })
    .catch(() => {
      next(new Error('login fail'))
    })
  }
})