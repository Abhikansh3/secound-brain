import mongoose, { model, Schema } from 'mongoose';
mongoose.connect('mongodb://localhost:27017/secound-brain');
const UserSchema = new Schema({
    username: { type: String, unique: true },
    password: { type: String }
});
const ContentSchema = new Schema({
    title: String,
    link: String,
    tags: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
    userId: { type: mongoose.Types.ObjectId, ref: 'User' }
});
const LinkSchema = new Schema({
    hash: String,
    userId: { type: mongoose.Types.ObjectId, ref: 'User', unique: true }
});
export const UserModel = model('User', UserSchema);
export const ContentModel = model("Content", ContentSchema);
export const LinkModel = model("Links", LinkSchema);
//# sourceMappingURL=db.js.map