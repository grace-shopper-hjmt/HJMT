const checks = {
  isAdmin: req => {
    return req.user && req.user.isAdmin
  },
  isUser: req => {
    return req.user.id === +req.params.id
  }
}

module.exports = {
  isAdmin: (req, res, next) => {
    if (checks.isAdmin(req)) return next()

    const err = new Error('nope')
    err.status = 403
    return next(err)
  },
  isAdminOrIsUser: (req, res, next) => {
    if (checks.isAdmin(req) || checks.isUser(req)) return next()
      const err = new Error('nope')
      err.status = 403
      return next(err)
  }
}


