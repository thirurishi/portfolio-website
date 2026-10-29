export interface JourneyEvent {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  category: 'education' | 'internship' | 'career';
  accent: 'sky' | 'cyan' | 'violet';
}

export const journeyEvents: JourneyEvent[] = [
  {
    year: '2020 — 2024',
    title: "B.Tech in Information Technology",
    subtitle: "St. Joseph’s College of Engineering | Chennai, India",
    description:
      'Developed a strong foundation in computer science, software engineering, and information systems through structured academic training and practical implementation.',
    highlights: [
      'Core computer science concepts, data structures, and programming',
      'Database systems, software development, and problem-solving skills'
    ],
    category: 'education',
    accent: 'sky'
  },
  {
    year: '2024 — Present',
    title: "Master’s in Computer Science — Data Science & Analytics",
    subtitle: "EPITA | Paris, France",
    description:
      'Specializing in data science, machine learning, and analytics systems with a focus on building scalable, real-world data-driven solutions.',
    highlights: [
      'Machine learning, NLP, and predictive modeling',
      'Data analytics for business intelligence and automation systems'
    ],
    category: 'education',
    accent: 'cyan'
  },
  {
  year: 'Dec 2022',
  title: 'Android Application Development Internship',
  subtitle: 'NSIC | Mobile Application Development',
  description:
    'Designed and delivered Android application features with a focus on performance, usability, and real-world deployment, working closely with design and backend teams.',
  highlights: [
    'Android development using modern UI/UX practices',
    'Performance optimization and real-world feature implementation'
  ],
  category: 'internship',
  accent: 'violet'
}
];