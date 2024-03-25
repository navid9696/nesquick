import mongoose from 'mongoose'

const favoritesSchema = new mongoose.Schema({
	movieId: { type: Number },
	movieType: { type: String },
})

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},

	favorites: {
		type: [favoritesSchema],
		
	},
})

const User = mongoose.models.User || mongoose.model('User', UserSchema)

export default User
