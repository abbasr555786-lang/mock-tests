const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  subjects: { type: [String], default: [] },
  questionCount: { type: Number },
  durationMinutes: { type: Number },
  optional: { type: Boolean, default: false }
}, { _id: false });

const MarkingSchemeSchema = new mongoose.Schema({
  correct: { type: Number, required: true },
  incorrect: { type: Number, required: true },
  unattempted: { type: Number, default: 0 },
  partial: { type: Number, default: null },
  notes: { type: String }
}, { _id: false });

const ExamSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true, index: true },
  name: { type: String, required: true },
  fullForm: { type: String, required: true },
  conductingBody: { type: String },
  level: { type: String, enum: ['UG', 'PG', 'Civil Services', 'Management', 'Other'] },
  mode: { type: String, enum: ['Online', 'Offline', 'Hybrid'] },
  totalDurationMinutes: { type: Number },
  sections: { type: [SectionSchema], default: [] },
  markingScheme: { type: Map, of: MarkingSchemeSchema },
  defaultMarking: MarkingSchemeSchema,
  languages: { type: [String], default: ['English'] },
  metadata: { type: mongoose.Schema.Types.Mixed }
}, { timestamps: true });

module.exports = mongoose.model('Exam', ExamSchema);
