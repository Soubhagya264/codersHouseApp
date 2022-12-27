const mongoose = require('mongoose');
const Schema= mongoose.Schema;
const roomSchema = new Schema({
    topic: { type: String, required: true},
    roomType: { type: String, required: true},
    OwnerId:{
        type:Schema.Types.ObjectID,ref:"User"
    },
    speakers: { type: [{
        type:Schema.Types.ObjectID,
        ref:"User"
    }], required: false
    
}
}
);
module.exports=mongoose.model('Rooms',roomSchema,'room')