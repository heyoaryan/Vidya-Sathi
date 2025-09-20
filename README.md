# Vidya-Sathi - AI-Powered Dropout Prevention System

An AI-powered system designed to prevent dropout rates in schools by identifying at-risk students early and enabling timely intervention.

## Features

- **AI-Powered Risk Assessment**: Identifies at-risk students using attendance patterns, academic performance, and behavioral indicators
- **School-Centric Design**: Built specifically for schools with class and section-based organization
- **Multi-Role Dashboard**: Separate dashboards for students, teachers, and counsellors
- **Real-time Monitoring**: 24/7 AI monitoring with smart alerts
- **Early Intervention**: Enables timely intervention to keep students engaged and on track

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd vidya-sathi
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

### Building for Production

```bash
npm run build
```

This builds the app for production to the `build` folder.

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Vercel will automatically deploy your app

### Manual Vercel Deployment

```bash
npm install -g vercel
vercel --prod
```

## Project Structure

```
src/
├── components/          # Reusable components
├── contexts/           # React contexts (Auth, etc.)
├── data/              # Mock data and types
├── pages/             # Page components
├── utils/             # Utility functions
└── types/             # TypeScript type definitions
```

## Key Pages

- **Home**: Landing page with hero section and features
- **Student Dashboard**: Personal performance overview for students
- **Teacher Dashboard**: Class management and student monitoring
- **Counsellor Dashboard**: At-risk student management and interventions
- **Students**: Student list with filtering and management
- **Analytics**: Performance analytics and insights

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is part of Hack Genesis 2025.
