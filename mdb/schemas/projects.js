import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'students' },
  title: String,
  description: String,
  techStack: [String],
  link: String,
  image: String
});

export default mongoose.model('projects', projectSchema);
