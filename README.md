# Epic Freebies Notifier

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![image](https://github.com/user-attachments/assets/53db1ea1-14eb-44c0-a423-a89ad4dd6578)


A web application built with Next.js that displays currently free and upcoming free games from the Epic Games Store. Stay up-to-date with the latest deals and never miss a free game!

## Features

*   **View Current Free Games**: See a list of games currently available for free on the Epic Games Store.
*   **View Upcoming Free Games**: Get a sneak peek at the games that will be free soon.
*   **Game Details Page**: Click on a game card to view more details, including a full description, screenshots, and links to the store page.
*   **Search Functionality**: Quickly find specific games within the free lists using the search bar.
*   **AI-Powered Summaries**: Utilizes Genkit and Google AI (Gemini) to provide concise summaries of game descriptions on the details page.
*   **Responsive Design**: Optimized for viewing on both desktop and mobile devices.
*   **Dark Theme**: Modern dark theme interface using ShadCN UI and Tailwind CSS.

## Tech Stack

*   **Framework**: [Next.js](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [ShadCN UI](https://ui.shadcn.com/)
*   **AI Integration**: [Genkit (with Google AI)](https://firebase.google.com/docs/genkit)
*   **State Management**: React Hooks (`useState`, `useEffect`, `useMemo`)
*   **Date Formatting**: [date-fns](https://date-fns.org/)
*   **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

### Prerequisites

*   Node.js (v18 or later recommended)
*   npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/W41T3D3V1L/Epic-Games-Freebies-Store.git
    cd Epic-Games-Freebies-Store
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up Environment Variables:**

    Create a `.env` file in the root of the project and add your Google Generative AI API key. This is required for the AI summary feature. You can obtain a key from [Google AI Studio](https://aistudio.google.com/app/apikey).

    ```env
    GOOGLE_GENAI_API_KEY=YOUR_GOOGLE_GENAI_API_KEY
    ```

### Running the Development Server

1.  **Start the Genkit development server (for AI features):**
    *   Open a terminal and run:
        ```bash
        npm run genkit:dev
        ```
    *   Keep this terminal running.

2.  **Start the Next.js development server:**
    *   Open a *second* terminal and run:
        ```bash
        npm run dev
        ```
    *   The application should now be running at [http://localhost:9002](http://localhost:9002).

## Data Source

Game data (titles, descriptions, images, promotion dates) is currently sourced from a **stub data file** (`src/services/epic-games.ts`) mimicking the structure of a potential Epic Games Store API response.

**Note:** This project does not directly integrate with an official Epic Games Store API at this time. The data displayed is static sample data.





---

Built by [@celikd](https://github.com/W41T3D3V1L) with Next.js and Tailwind CSS.
