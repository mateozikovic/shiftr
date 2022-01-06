const mongoose = require('mongoose');

const coworkerSchema = new Schema({
    requester: { type: Schema.Types.ObjectId, ref: 'UserInfo'},
    recipient: { type: Schema.Types.ObjectId, ref: 'UserInfo'},
    status: {
      type: Number,
      enums: [
          0,    //'add coworker',
          1,    //'requested',
          2,    //'pending',
          3,    //'coworkers'
      ]
    }
}, {timestamps: true})

module.exports = mongoose.model('Coworkers', coworkerSchema)