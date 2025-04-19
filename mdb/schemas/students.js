import mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    phone_number:{
        type: Number,
        unique: true,
        validate: {
           validator: function(v) {
               return /^\d{10}$/.test(v);
                },
                message: props => `${props.value} is not a valid phone number!`
            }
        },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
    }, {timestamps: true});

const tests = mongoose.model('tests', testSchema);

export default tests;