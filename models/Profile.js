const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ProfileSchema = ({
    type: {
        type: String
    },
    describe: {
        type: String
    },
    income: {
        type: String,
        required: true
    },
    expend: {
        type: String,
        require: true
    },
    cash: {
        type: String,
        required: true
    },
    remark: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Profile = mongoose.model('profiles', ProfileSchema)