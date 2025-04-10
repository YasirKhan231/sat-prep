// src/lib/syllabus.ts
export const syllabus = {
  Math: {
    'Algebra': ['Linear Equations & Inequalities', 'Systems of Linear Equations', 'Linear Functions', 'Linear Inequalities'],
    'Advanced Math': ['Quadratic Equations', 'Polynomials', 'Rational Expressions', 'Radical Expressions', 'Exponents & Exponential Functions', 'Functions (f(x))', 'Graphs of Functions', 'Non-linear Equations'],
    'Problem Solving & Data Analysis': ['Ratios, Rates, Proportions', 'Percentages', 'Data Interpretation', 'Probability', 'Statistics'],
    'Geometry & Trigonometry': ['Angles', 'Triangles', 'Circles', 'Area, Volume, Perimeter', 'Coordinate Geometry', 'Basic Trigonometry', 'Radians (Basic)']
  },
  Grammar: {
    'Craft and Structure': ['Vocabulary in Context', 'Author\'s Purpose and Tone', 'Text Structure and Organization'],
    'Information and Ideas': ['Main Idea and Supporting Details', 'Inference', 'Data Interpretation in Text'],
    'Standard English Conventions': ['Verb Tense and Agreement', 'Pronouns and Modifiers', 'Punctuation (Commas, Semicolons)'],
    'Expression of Ideas': ['Sentence Clarity and Conciseness', 'Logical Flow and Transitions']
  }
};

export type Section = keyof typeof syllabus;
export type Topic = keyof typeof syllabus['Math'] | keyof typeof syllabus['Grammar'];