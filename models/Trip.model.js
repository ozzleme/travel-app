const { Schema, model, trusted } = require("mongoose");

const tripSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    event: [{ type: Schema.Types.ObjectId, ref: "Event" }],
    tripName: {
        type: 'String',
        trim: true,
        required: true
    },
    description: { type: 'String', trim: true, required: true },
    image: { type: String, trim: true }
})

const Trip = model("Trip", tripSchema);

module.exports = Trip;