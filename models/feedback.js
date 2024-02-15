const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({ 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    text: { type: String, required: true, minlength: 5, maxlength: 255},
    rating: { type: Number, required: true, min: 1, max: 10},
    date_uploaded: { type: Date, required: true, default: Date.now},
    isAdmin: { type: Boolean, default: false }
});

const Feedback = mongoose.model("Feedback", feedbackSchema)

// module.exports = Feedback;
module.exports.Feedback = Feedback;