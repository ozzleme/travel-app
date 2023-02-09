const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
    {
        eventName: { type: String, trim: true, required: true },
        description: { type: String, trim: true, },
        category: { type: String, trim: true, required: true },
        price: { type: Number, trim: true },
        image: { type: String, trim: true },
        city: { type: String, trim: true, required: true }
    },
    {
        timestamps: true
    }
);

const Event = model("Event", eventSchema);

module.exports = Event;
