const redis = require('redis')
const client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_URL, { no_ready_check: true });

client.on("error", err => console.log("Error " + err));
client.on('connect', () => console.log('Connected to Redis'))

client.auth(process.env.REDIS_PASSWORD)

module.exports = {
  setState(id, value) {
    client.set(id, value, 'EX', 2000)
  },

  getState(id, cb) {
    client.get(id, (err, reply) => {
      if (err) {
        console.log(err)
        cb(null)
      }
      else cb(reply)
    })
  }, 

  overwrite(id, obj) {
		client.del(`${id}-dt`, () => {
			client.HMSET(`${id}-dt`, obj)
		})
	},

	update(id, obj) {
		client.HMSET(`${id}-dt`, obj)
	},

	get(id, cb) {
		client.hgetall(`${id}-dt`, (err, obj) => {
			if (err) console.log(err)
			cb(obj || {})
		})
	}
}