# AuditAI: Enterprise Compliance Automation Platform

![AuditAI Logo](./public/logo.png)

AuditAI is an AI-powered compliance automation platform designed for modern enterprises. It streamlines the process of achieving and maintaining compliance certifications such as SOC 2, PCI DSS, HIPAA, and more.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Development](#development)
  - [Available Scripts](#available-scripts)
  - [Styling](#styling)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## Features

- AI-driven compliance scans and risk assessment
- Real-time monitoring and alerts
- Automated evidence collection
- Customizable dashboards
- Integration with 100+ tools
- Continuous compliance monitoring
- Multi-framework support (SOC 2, PCI DSS, HIPAA, etc.)
- User and role management with RBAC
- Audit trail and reporting

## Tech Stack

- **Frontend:** React, Next.js, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** PostgreSQL
- **Authentication:** JWT, OAuth
- **CI/CD:** GitHub Actions
- **Hosting:** Vercel, AWS

## Getting Started

### Prerequisites

- Node.js >= 14.x
- npm or yarn
- PostgreSQL

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/auditai.git
    cd auditai
    ```

2. Install dependencies:
    ```sh
    npm install
    # or
    yarn install
    ```

3. Set up environment variables:
    ```sh
    cp .env.example .env
    ```

4. Run the development server:
    ```sh
    npm run dev
    # or
    yarn dev
    ```

## Usage

To start using AuditAI, navigate to `http://localhost:3000` in your browser.

## Project Structure

- **components/**: React components
- **hooks/**: Custom React hooks
- **lib/**: Utility functions
- **pages/**: Next.js pages
- **public/**: Static assets
- **styles/**: Global and component-specific styles
- **types/**: TypeScript type definitions

## Development

### Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the project for production
- `npm run start`: Start the production server
- `npm run lint`: Run ESLint
- `npm run test`: Run tests

### Styling

We use Tailwind CSS for styling. Global styles are defined in [globals.css](http://_vscodecontentref_/1).

## Testing

To run tests, use the following command:
```sh
npm run test
# or
yarn test