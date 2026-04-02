import mongoose from "mongoose";

const financeSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    type:{
        type: String,
        enum: ["expense","income"]
    },
    date: {
        type: Date,
    },
    category: {
        type: String
    },
    notes: String,
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
});

financeSchema.index({date:1});
financeSchema.index({category:1});

export const Finance = mongoose.model("finance",financeSchema);