import mongoose  from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
        trim: true
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: [8, "Password must be at least 8 characters long"]
    },
    cartItems: [
        {
            quantity: {
                type: Number,
                default: 1
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            }
        }
    ],
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer"
    }
    
}, {
    timestamps: true // createdAt,updatedAt
})

// pre-save hook to hash password before saving to database
userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
})

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}
const User = mongoose.model('User', userSchema);

export default User;