# 📓 NoteHub — Notes Application

Application for managing personal notes with a robust authentication system. Built with **Next.js (App Router)** utilizing hybrid rendering (SSR/CSR).

## 🚀 Links

- **Live Demo:** [https://09-auth-kam1.vercel.app/](https://09-auth-kam1.vercel.app/)
- **Backend API Docs:** [NoteHub API Documentation](https://notehub-api.goit.study/docs)

---

## 🛠 Tech Stack

* **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
* **Language:** TypeScript
* **State Management:** [Zustand](https://zustand-demo.pmnd.rs/) & [TanStack Query v5](https://tanstack.com/query/latest)
* **Styling:** CSS Modules
* **HTTP Client:** Axios
* **Deployment:** Vercel

---

## 📋 Features

1. **Auth & Security:**
    * User registration and login.
    * Protected routes via Middleware/Proxy — notes and profile access restricted to authorized users only.
    * Secure session handling using Cookies (HttpOnly).
2. **Notes Management:**
    * Server-Side Rendering (SSR) for the notes list.
    * CRUD operations: Create, Read, Update, and Delete notes.
    * Tag-based filtering and search functionality.
3. **User Profile:**
    * View account details.
    * Profile editing capabilities (username).
4. **Advanced Routing:**
    * Implementation of Parallel Routes (`@modal`) for seamless UI interactions.

---

## 📂 Project Structure

* `app/` — Core application logic and routing.
    * `(auth routes)/` — Public routes for login and registration.
    * `(private routes)/` — Protected routes for notes and user profile.
    * `api/` — Route Handlers acting as a proxy to the external backend.
    * `@modal/` — Parallel routes for displaying modals without changing the context.
* `components/` — Reusable UI components (each in its own folder with local CSS Modules).
* `lib/` — API configurations (axios instances), Zustand stores, and utility functions.
* `types/` — Shared TypeScript interfaces and types.
* `public/` — Static assets such as icons and images.

---

## ⚙️ Local Development

### Prerequisites
* Node.js (LTS version)
* npm

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/DevScriber/NoteHub.git](https://github.com/DevScriber/NoteHub.git)
    cd NoteHub
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env.local` file in the root directory and add the following:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:3000
    ```

4.  **Run the application:**
    ```bash
    npm run dev
    ```

5.  **Access the app:**
    Open [http://localhost:3000](http://localhost:3000) in your browser.
