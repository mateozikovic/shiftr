const mongoose = require('mongoose');

const WorkWeekSchema = new mongoose.Schema({
    weekName: {
        type: String,
        required: true
    },
    workers: [],
    
    monday: [{
        workerName: String,
        shift: String
        }
    ],
    tuesday: [{
        workerName: String,
        shift: String
        }
    ],
    wednesday: [{
        workerName: String,
        shift: String
        }
    ],
    thursday: [{
        workerName: String,
        shift: String
        }
    ],
    friday: [{
        workerName: String,
        shift: String
        }
    ],
    saturday: [{
        workerName: String,
        shift: String
        }
    ],
    sunday: [{
        workerName: String,
        shift: String
        }
    ]
})

module.exports = mongoose.model("WorkWeek", WorkWeekSchema);