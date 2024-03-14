import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
	userEmail: {
		type: String,
		unique: true,
		require: true,
	},
	userPassword: {
		type: String,
		require: true,
	},

	favorites: {
		type: [{ type: Number }],
		default: [],
	},
})

const User = mongoose.models.User || mongoose.model('User', UserSchema)

export default User
