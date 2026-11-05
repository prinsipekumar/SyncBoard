export const initialUsers = [
  {
    id: "admin-1",
    name: "First Admin",
    role: "admin",
    email: "first@admin.com",
  },
  {
    id: "admin-2",
    name: "Second Admin",
    role: "admin",
    email: "Second@admin.com",
  },
  {
    id: "student-1",
    name: "First Student",
    role: "student",
    email: "first@student.com",
  },
  {
    id: "student-2",
    name: "Second Student",
    role: "student",
    email: "second@student.com",
  },
  {
    id: "student-3",
    name: "Third Student",
    role: "student",
    email: "third@student.com",
  },
  {
    id: "student-4",
    name: "Fourth Student",
    role: "student",
    email: "fourth@student.com",
  },
  {
    id: "student-5",
    name: "Fifth Student",
    role: "student",
    email: "fifth@student.com",
  },
];

export const initialAssignments = [
  {
    id: "asgn-101",
    title: "Interactive UI Patterns with Tailwind",
    description:
      "Build a fully responsive side-navigation wrapper and grid dashboard system layout optimized for mobile screens.",
    dueDate: "2026-11-06",
    driveLink: "https://google.com",
    createdBy: "first-admin",
    assignedTo: [
      "student-1",
      "student-2",
      "student-3",
      "student-4",
      "student-5",
    ],
    submissions: {
      "student-1": { status: "Not Submitted", submittedAt: null },
      "student-2": { status: "Submitted", submittedAt: "2026-11-02" },
      "student-3": { status: "Not Submitted", submittedAt: null },
      "student-4": { status: "Submitted", submittedAt: "2026-11-03" },
      "student-5": { status: "Not Submitted", submittedAt: null },
    },
  },
  {
    id: "asgn-102",
    title: "Advanced React Lifecycle & Hooks",
    description:
      "Implement a complex state syncer utilizing primitive cleanup actions within custom hook structures.",
    dueDate: "2026-11-09",
    driveLink: "https://google.com",
    createdBy: "second-admin",
    assignedTo: ["student-1", "student-3", "student-5"],
    submissions: {
      "student-1": { status: "Not Submitted", submittedAt: null },
      "student-3": { status: "Submitted", submittedAt: "2026-11-01" },
      "student-5": { status: "Not Submitted", submittedAt: null },
    },
  },
];
