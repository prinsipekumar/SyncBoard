# SyncBoard - Assignment & Review Dashboard

A responsive, component-based assignment distribution and submission logging dashboard system built with **React 19**, **Vite**, and **Tailwind CSS**. The application features an offline mock data sync layer supporting dual-role matrices for Professors (Admins) and Students.

## Demo Link

- **Live Demo:** [https://sync-board-lac.vercel.app](https://sync-board-lac.vercel.app)

---

## Local Installation & Development Setup

Follow these steps:

1. **Clone the Repo:**

   ```bash
   git clone https://github.com/prinsipekumar/SyncBoard.git
   cd SyncBoard/main
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Start Local Development Server:**

   ```bash
   npm run dev
   ```

   The application will be running locally at `http://localhost:5173`.

4. **Verify Production Distribution Bundle Build:**
   ```bash
   npm run build
   ```

---

## Project Component Architecture & Directory Map

The directory structure separates core application state, mock storage definitions, reusable presentation items, and workflow routers:

```text
src/
├── context/
│   └── AppContext.jsx       # Global application state controller (React Context API Engine)
├── data/
│   └── mockData.js          # Seed databases (2 Admin templates, 5 Student profiles)
├── components/
│   ├── common/
│   │   ├── Navbar.jsx       # Responsive header containing the global mock user switcher dropdown
│   │   ├── Modal.jsx        # Reusable modal shell handler using smooth layout portal entries
│   │   └── ProgressBar.jsx  # Reusable metric tracker displaying calculated percentages
│   ├── student/
│   │   ├── StudentDashboard.jsx  # Core dashboard workspace for student metrics & layouts
│   │   ├── AssignmentList.jsx   # Grid collection layout engine routing active items
│   │   └── AssignmentCard.jsx   # Presentational module showing specific status metrics
│   └── admin/
│       ├── AdminDashboard.jsx   # Core gateway console view for professor control layers
│       ├── AssignmentForm.jsx   # Multi-functional CRUD modal mapping state attributes
│       └── TrackProgress.jsx    # Real-time cohort compliance matrix ledger tracker
├── App.jsx                  # Main root shell router checking active session flags
├── main.jsx                 # Entry point rendering tree within strict runtime engines
└── index.css                # Base directives bundling active global Tailwind utilities
```

---

## Key Design

### 1. Centralized Data Syncer (React Context API)

Instead of dealing with prop-drilling across independent branches, a monolithic state engine wrapper (`AppContext.jsx`) holds core datasets. All database operations-such as assignment generation, edit rulesets, target list manipulations, and submission flags are managed here, triggering clean, synchronized rerenders across both student and admin interfaces instantly.

### 2. State Mapping Structure for Submissions

To efficiently manage student data and keep lookups fast, individual student progress is mapped directly using key-value schemas inside each assignment object:

```json
"submissions": {
  "student-1": { "status": "Not Submitted", "submittedAt": null },
  "student-2": { "status": "Submitted", "submittedAt": "2026-11-02" }
}
```

This lets the dashboard instantly query a student's status in **O(1) time complexity**, avoiding slow loop lookups.

### 3. Transparent Persistence Layer (`localStorage`)

The application includes automatic reactive synchronization routines (`useEffect`) tied directly to state hooks. Any updates made in the browser-like creating assignments or locking in submissions-persist instantly across page reloads without requiring database infrastructure setup.

### 4. Custom Defensive UI Modal Architecture

The multi-step student submission confirmation pattern (Submit -> Confirm Workspace Verification -> Finalize Security Warning) relies on local state-driven rendering blocks. This ensures students don't accidentally submit tasks early and makes the workflow feel solid and reliable.

### 5. Fluid Responsive Utility Layout Grid

Using flexible grid components and layout classes (`grid-cols-1 md:grid-cols-2 lg:flex-col`), the platform dynamically shifts its layout. It provides an optimized screen space experience whether viewed on an iPhone screen, a compact tablet, or a wide desktop monitor.

### 6. Role-Isolated Authentication Gate (Mock Sign-In View)

To fulfill strict data multi-tenancy requirements without backend overhead, an authentication routing barrier was added directly inside `App.jsx`. Unauthenticated sessions short-circuit to a dedicated `Login.jsx` view. Users pass email lookups against seed credentials to generate a secure state session, ensuring a student profile remains sandboxed within their active dashboard line while instructors retain exclusive task modification rights.

### 7. Micro-Screen Spacing & String-Wrap Safeguards (320px-340px)

To accommodate small layout viewports (e.g., iPhone SE), headers and interactive panels utilize responsive wrapping logic. Title strings such as "Admin Control Panel:" and student grid rows utilize inline-block layouts combined with `whitespace-nowrap` text protections. This forces long strings or compound names to drop down to a secondary line as complete blocks instead of snapping single words in half mid-character.
