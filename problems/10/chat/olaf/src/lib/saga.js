const EventEmitter = require('events')
const hyperdb = require('hyperdb')
const pump = require('pump')
const hyperid = require('hyperid')
const forEachChunk = require('./for-each-chunk.js')

const uuid = hyperid()

// ********************** //
class Saga extends EventEmitter {
//
// Saga code goes here ... //
//
}
// ********************** //

module.exports = (...args) => new Saga(...args)
