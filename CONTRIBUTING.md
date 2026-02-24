# Guide to Contributing

This document describes how to contribute to this project. Fill in each section as a team (see [project setup instructions](./instructions-0c-project-setup.md)).

## Team Norms

### Communication

- Be respectful and professional in all interactions.

- Ask questions early if you are blocked.

- Use group chat for quick discussions.

- Use GitHub Issues to track tasks.

- Use Pull Requests (PRs) for code discussions and reviews.

### Accountability

- Complete assigned tasks before sprint deadlines.

- Inform the team early if you cannot complete a task.

- Attend meetings prepared with updates on your progress.

### Collaboration

- Do not push directly to main.

- All changes must go through Pull Requests.

- At least one teammate must review and approve before merging.

- Provide constructive and respectful feedback during reviews.

## Git Workflow

We follow a Feature Branch Workflow.

### Branch Rules

- The main branch must always remain stable and deployable.

- Never push directly to main.

- Create a new branch for every feature or bug fix.

- Merge changes only through Pull Requests.

### Standard Workflow

#### 1. Pull the Latest Code
git checkout main
git pull origin main

#### 2. Create a Feature Branch
git checkout -b feature/short-description


Examples:

feature/login-page

feature/user-authentication

bugfix/navbar-alignment

#### 3. Commit Your Changes
git add .
git commit -m "Add login form validation"


Commit message guidelines:

Good examples:

- Add authentication middleware

- Fix API error handling

- Update README setup instructions

Avoid vague messages such as:

- fix

- update

- stuff

#### 4. Push Your Branch
git push origin feature/short-description

#### 5. Open a Pull Request

Each Pull Request must:

- Have a clear and descriptive title

- Include a description of what was changed

- Be tested locally before submission

- Not break existing functionality

#### 6. Review and Merge

- At least one teammate must approve the PR.

- Address requested changes before merging.

- Delete the branch after merging.

## Rules of Contributing

### Code Standards

- Use consistent formatting (Prettier / ESLint if configured).

- Use meaningful variable and function names.

- Keep functions and components modular and readable.

- Add comments only when logic is not obvious.

### What You May Contribute

- New features

- Bug fixes

- Refactoring improvements

- Documentation updates

- UI/UX improvements

### What You Must Not Do

- Push directly to main

- Commit unfinished experimental code to main

- Commit .env files

- Push API keys or sensitive information

### Issue Tracking

- Create a GitHub Issue before starting major work.

- Assign yourself to the issue.

- Link PRs to issues using:

Closes #issue-number


## Setting Up the Local Development Environment

Follow these steps to run the project locally.

#### 1. Clone the Repository
git clone https://github.com/<organization>/<repo-name>.git
cd <repo-name>

#### 2. Install Dependencies
##### Backend
cd back-end
npm install

##### Frontend
cd front-end
npm install

#### 3. Configure Environment Variables

Create a .env file inside the back-end folder if required.

Example:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


Do not commit the .env file.

#### 4. Run the Application
##### Start Backend
cd back-end
npm start


Or, if using nodemon:

npm run dev

##### Start Frontend
cd front-end
npm start

#### 5. Access the Application

## Building and Testing

### Build Frontend
cd front-end
npm run build

### Run Tests (if configured)
npm test

### Linting (if configured)
npm run lint