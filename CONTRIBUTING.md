# Welcome to the Codamigos Contributing Guide! 👋

Thank you for investing your time in contributing to our project! Any contribution you make will be reflected on `Codamigos-DSA-Duel-Web-App` and will help us build a better platform for developers.

Read our specific guidelines below to understand how to contribute effectively.

---

## 💥 Found a Bug? / 💡 Missing a Feature?

Before writing code, please check our **Issues** tab.

1.  **Check for duplicates:** Use the search bar in the [Issues tab](https://github.com/AkshatRaval/Codamigos-DSA-Duel-Web-App/issues) to ensure your idea or bug hasn't already been reported.
2.  **Open a New Issue:**
    * Click the green **"New Issue"** button.
    * Choose the appropriate category (Bug Report or Feature Request).
    * Be descriptive! Use screenshots, code snippets, and clear titles.

---

## 🛠 Installation & Setup

To contribute code, you need to set up the project locally.

1.  **Fork the Repository**
    Click the "Fork" button at the top right of this page to create your own copy of the repository.

2.  **Clone Your Fork**
    ```bash
    # Clone Repo First
    git clone https://github.com/AkshatRaval/Codamigos-DSA-Duel-Web-App.git
    # Change Directory 
    cd Codamigos-DSA-Duel-Web-App
    ```

3.  **Install Dependencies**
    *(Make sure you have Node.js installed)*
    ```bash
    npm install
    # or if using yarn
    yarn install
    ```

4.  **Environment Variables**
    If the project uses a `.env` file, duplicate `.env.example` (if available) and rename it to `.env`.

---

## 👩‍💻 Development Workflow

### 1. Create a Branch
**Never** work directly on the `main` branch. Always create a new branch for your specific task.

```bash
git checkout -b <type>/<short-description>
````

**Branch Naming Convention:**

  * `feat/leaderboard-ui` (New features)
  * `fix/login-error` (Bug fixes)
  * `docs/update-readme` (Documentation)
  * `style/navbar-css` (Formatting/Styling)

### 2\. Make Your Changes

Write your code\! Remember to:

  * Keep your changes focused (don't fix a login bug and add a leaderboard in the same branch).
  * Save often.

### 3\. Commit Guidelines (Important\!) 🚨

We follow **Conventional Commits**. Your commit messages must differ from standard text. They helps us generate changelogs automatically.

**Format:** `<type>: <subject>`

**Types you can use:**

  * `Feat`: A new feature (e.g., `Feat: add dark mode toggle`)
  * `Fix`: A bug fix (e.g., `Fix: resolve crash on profile page`)
  * `Docs`: Documentation only changes (e.g., `Docs: update API reference`)
  * `Style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
  * `Refactor`: A code change that neither fixes a bug nor adds a feature
  * `Perf`: A code change that improves performance
  * `Chore`: Changes to the build process or auxiliary tools (e.g., `Chore: update npm dependencies`)

**Example:**

```bash
git commit -m "Feat: add user leaderboard component"
```

### 4\. Push to Your Fork

```bash
git push origin feat/leaderboard-ui
```

-----

## 🚀 Submitting a Pull Request (PR)

Once you have pushed your branch, you are ready to submit your code\!

1.  Go to the [Pull Requests tab](https://www.google.com/search?q=https://github.com/AkshatRaval/Codamigos-DSA-Duel-Web-App/pulls).
2.  Click **"New Pull Request"**.
3.  **Base:** `main`  ⬅️  **Compare:** `your-fork/feat/leaderboard-ui`.
4.  **Fill out the PR Description:**
      * **Description:** Explain *what* you did and *why*.
      * **Related Issue:** Link the issue using keywords (e.g., "Closes \#12", "Fixes \#5").
      * **Screenshots:** If you changed the UI, please include an image or GIF.
5.  **Self-Review:**
      * [ ] Did I remove all `console.log` statements?
      * [ ] Does the code run without errors locally?
      * [ ] Did I follow the commit message standard?

Once submitted, a maintainer will review your code. We may ask for changes—this is a normal part of the process\!

-----

## 🤝 Code of Conduct

Please note that this project is released with a Contributor Code of Conduct. By participating in this project you agree to abide by its terms. Be kind and respectful to others.

Happy Coding\! 🚀
