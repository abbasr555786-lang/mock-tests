const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
  key: { type: String, required: true },
  text: { type: String, required: true },
  isCorrect: { type: Boolean, default: false }
}, { _id: false });

const SolutionSchema = new mongoose.Schema({
  explanation: { type: String, required: true },
  steps: { type: [String], default: [] },
  finalAnswer: { type: String },
  references: { type: [String], default: [] }
}, { _id: false });

const QuestionSchema = new mongoose.Schema({
  questionId: {
    type: String,
    required: true,
    unique: true,
    index: true,
    validate: {
      validator: v => /^[A-Z]+-[a-z0-9]+-\d{3}$/.test(v),
      message: 'questionId must match {EXAM}-{subject-short}-{NNN}'
    }
  },
  exam: { type: String, required: true, uppercase: true, index: true },
  subject: { type: String, required: true, index: true },
  topic: { type: String, required: true, index: true },
  subtopic: { type: String },
  type: {
    type: String,
    enum: ['MCQ', 'MSQ', 'NAT', 'Subjective', 'AssertionReason', 'MatchTheFollowing'],
    required: true
  },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true, index: true },
  questionText: { type: String, required: true },
  options: {
    type: [OptionSchema],
    validate: {
      validator: function (opts) {
        if (['MCQ', 'MSQ', 'AssertionReason'].includes(this.type)) {
          return opts && opts.length >= 2 && opts.some(o => o.isCorrect);
        }
        return true;
      },
      message: 'MCQ/MSQ/AR questions need >=2 options with at least one correct'
    }
  },
  correctAnswer: { type: mongoose.Schema.Types.Mixed },
  solution: { type: SolutionSchema, required: true },
  marks: {
    correct: { type: Number, default: 4 },
    incorrect: { type: Number, default: -1 }
  },
  isPYQ: { type: Boolean, default: false, index: true },
  year: {
    type: Number,
    validate: {
      validator: function (v) { return !this.isPYQ || (v && v >= 1950 && v <= 2100); },
      message: 'PYQ requires a valid year'
    }
  },
  source: {
    type: String,
    validate: {
      validator: function (v) { return !this.isPYQ || (v && v.length > 0); },
      message: 'PYQ requires a source string'
    }
  },
  tags: { type: [String], default: [], index: true },
  language: { type: String, default: 'English' },
  status: { type: String, enum: ['draft', 'review', 'published'], default: 'published' }
}, { timestamps: true });

QuestionSchema.index({ exam: 1, subject: 1, topic: 1, difficulty: 1 });
QuestionSchema.index({ exam: 1, isPYQ: 1, year: -1 });

module.exports = mongoose.model('Question', QuestionSchema);
