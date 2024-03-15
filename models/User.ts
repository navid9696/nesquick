import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		require: true,
	},
	password: {
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
