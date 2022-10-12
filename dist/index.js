
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dms-dto.cjs.production.min.js')
} else {
  module.exports = require('./dms-dto.cjs.development.js')
}
