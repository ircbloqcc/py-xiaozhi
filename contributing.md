---
title: Contribution Guide
description: How to contribute to the py-xiaozhi project
sidebar: false
outline: deep
---

<div class="contributing-page">

# Contribution Guide

<div class="header-content">
  <h2>How to Contribute to the py-xiaozhi Project 🚀</h2>
</div>

## Introduction

Thank you for your interest in the py-xiaozhi project! We warmly welcome community members to contribute, whether it's fixing bugs, improving documentation, or adding new features. This guide will help you understand how to contribute to the project.

## Setting Up the Development Environment

### Basic Requirements

- Python 3.9 or higher
- Git version control system
- Basic Python development tools (Visual Studio Code is recommended)

### Getting the Source Code

1. First, fork this project on GitHub to your own account:
   - Visit the [py-xiaozhi project page](https://github.com/huangjunsen0406/py-xiaozhi)
   - Click the "Fork" button in the top-right corner
   - Wait for the fork to complete, and you'll be redirected to your repository copy

2. Clone your forked repository locally:

```bash
git clone https://github.com/YOUR_USERNAME/py-xiaozhi.git
cd py-xiaozhi
```

3. Add the upstream repository as a remote source:

```bash
git remote add upstream https://github.com/huangjunsen0406/py-xiaozhi.git
```

You can verify the remote repositories are correctly configured using `git remote -v`:

```bash
git remote -v
# Output should show:
# origin    https://github.com/YOUR_USERNAME/py-xiaozhi.git (fetch)
# origin    https://github.com/YOUR_USERNAME/py-xiaozhi.git (push)
# upstream  https://github.com/huangjunsen0406/py-xiaozhi.git (fetch)
# upstream  https://github.com/huangjunsen0406/py-xiaozhi.git (push)
```

### Installing Development Dependencies
- Refer to related documentation for additional dependencies
```bash
# Create and activate a virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install project dependencies
pip install -r requirements.txt
```

## Development Workflow

### Keeping Your Local Repository Up-to-Date

Before starting work, ensure your local repository is up-to-date with the main project. Follow these steps:

1. Switch to your main branch (`main`):

```bash
git checkout main
```

2. Fetch the latest changes from the upstream repository:

```bash
git fetch upstream
```

3. Merge the upstream main branch into your local main branch:

```bash
git merge upstream/main
```

4. Push the updated local main branch to your GitHub repository:

```bash
git push origin main
```

### Creating a Branch

Before starting any work, create a new branch from the latest upstream main branch:

```bash
# Fetch the latest upstream code (as described above)
git fetch upstream
git checkout -b feature/your-feature-name upstream/main
```

Branch naming conventions:
- `feature/xxx`: New feature development
- `fix/xxx`: Bug fixes
- `docs/xxx`: Documentation updates
- `test/xxx`: Test-related work
- `refactor/xxx`: Code refactoring

### Coding Standards

We follow [PEP 8](https://www.python.org/dev/peps/pep-0008/) as the Python code style guide. Before submitting code, ensure it meets the following requirements:

- Use 4 spaces for indentation
- Line length should not exceed 120 characters
- Use meaningful variable and function names
- Add docstrings for public APIs
- Use type hints

We recommend using static code analysis tools to help adhere to coding standards:

```bash
# Check code style with flake8
flake8 .

# Perform type checking with mypy
mypy .
```

### Testing

Before submitting, ensure all tests pass.

## Submitting Changes

### Pre-Submission Checklist

Before submitting your code, ensure the following:

1. Code adheres to PEP 8 standards
2. Necessary test cases are added
3. All tests pass
4. Appropriate documentation is added
5. The issue you intended to address is resolved
6. Your code is up-to-date with the latest upstream changes

### Committing Changes

Commit changes frequently in small batches to make them easier to track and understand:

```bash
# View changed files
git status

# Stage changes
git add file1.py file2.py

# Commit changes
git commit -m "feat: add new feature X"
```

### Resolving Conflicts

If you encounter conflicts while merging upstream changes, follow these steps:

1. Identify the conflict locations:

```bash
git status
```

2. Open the conflicting files, and you'll see markers like this:

```
<<<<<<< HEAD
Your code
=======
Upstream code
>>>>>>> upstream/main
```

3. Edit the files to resolve conflicts and remove the markers
4. After resolving all conflicts, stage and commit the changes:

```bash
git add .
git commit -m "fix: resolve merge conflicts"
```

### Commit Message Guidelines

We use the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) format for Git commit messages. The format is:

```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

Common commit types include:
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style changes (e.g., formatting)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or fixing tests
- `chore`: Changes to build processes or auxiliary tools and libraries

Example:

```
feat(tts): add support for a new text-to-speech engine

Added support for Baidu TTS API, including:
- Multiple voice options
- Adjustable speed and volume
- Mixed-language synthesis

Fixes #123
```

### Pushing Changes

After completing your changes, push your branch to your GitHub repository:

```bash
git push origin feature/your-feature-name
```

If you need to update an existing Pull Request, push to the same branch again:

```bash
# After making additional changes
git add .
git commit -m "refactor: improve code based on feedback"
git push origin feature/your-feature-name
```

### Syncing Latest Code Before Creating a Pull Request

Before creating a Pull Request, sync with the upstream repository to avoid potential conflicts:

```bash
# Fetch the latest upstream code
git fetch upstream

# Rebase the latest upstream code onto your feature branch
git rebase upstream/main

# If conflicts occur, resolve them and continue rebasing
git add .
git rebase --continue

# Force-push the updated branch to your repository
git push --force-with-lease origin feature/your-feature-name
```

Note: Using `--force-with-lease` is safer than `--force` as it prevents overwriting others' changes.

### Creating a Pull Request

After completing your feature or bug fix, follow these steps to create a Pull Request:

1. Push your changes to GitHub:

```bash
git push origin feature/your-feature-name
```

2. Visit your forked repository on GitHub and click the "Compare & pull request" button

3. Fill out the Pull Request form:
   - Use a clear title following the commit message format
   - Provide detailed information in the description
   - Reference related issues (use `#issue-number` format)
   - Add `[WIP]` to the title if it's a work-in-progress

4. Submit the Pull Request and wait for the maintainers to review it

### Pull Request Lifecycle

1. **Creation**: Submit your PR
2. **CI Checks**: Automated tests and code style checks
3. **Code Review**: Maintainers review your code and provide feedback
4. **Revisions**: Make changes based on feedback
5. **Approval**: Once approved, your PR will be merged
6. **Merge**: Maintainers merge your PR into the main branch

## Contributing to Documentation

If you'd like to improve the project documentation, follow these steps:

1. Fork the project and clone it locally as described above

2. Documentation is located in the `documents/docs` directory and uses Markdown format

3. Install documentation development dependencies:

```bash
cd documents
pnpm install
```

4. Start the local documentation server:

```bash
pnpm docs:dev
```

5. Preview your changes in the browser at `http://localhost:5173/py-xiaozhi/`

6. Once done, submit your changes and create a Pull Request

### Documentation Writing Guidelines

- Use clear and concise language
- Provide practical examples
- Explain complex concepts in detail
- Include screenshots or diagrams when necessary
- Avoid excessive technical jargon; provide explanations when needed
- Maintain consistent document structure

## Reporting Issues

If you find an issue but cannot fix it, [create an Issue on GitHub](https://github.com/huangjunsen0406/py-xiaozhi/issues/new). Include the following information:

- A detailed description of the issue
- Steps to reproduce the issue
- Expected and actual behavior
- Your operating system and Python version
- Relevant logs or error messages

## Code Review

After submitting a Pull Request, maintainers will review your code. During the review process:

- Be patient while waiting for feedback
- Respond promptly to comments and suggestions
- Make necessary changes and update your Pull Request
- Maintain polite and constructive discussions

### Addressing Code Review Feedback

1. Carefully read all comments and suggestions
2. Respond to each point or make changes
3. If you disagree with a suggestion, politely explain your reasoning
4. Notify the reviewer after making changes

## Becoming a Maintainer

If you consistently make valuable contributions to the project, you may be invited to become a maintainer. As a maintainer, you'll have the authority to review and merge others' Pull Requests.

### Maintainer Responsibilities

- Review Pull Requests
- Manage issues
- Participate in project planning
- Answer community questions
- Guide new contributors

## Code of Conduct

Please respect all project participants and adhere to the following code of conduct:

- Use inclusive language
- Respect differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on the best interests of the community
- Show empathy towards other community members

## Frequently Asked Questions

### Where should I start contributing?

1. Look for issues labeled "good first issue"
2. Fix errors or unclear sections in the documentation
3. Add more test cases
4. Solve issues you encounter while using the project

### My PR hasn't received a response for a long time. What should I do?

Leave a comment on the PR politely asking if further improvements or clarifications are needed. Understand that maintainers may be busy and need time to review your contribution.

### What types of changes can I contribute?

- Bug fixes
- New features
- Performance improvements
- Documentation updates
- Test cases
- Code refactoring

## Acknowledgments

Thank you again for contributing to the project! Your participation is invaluable, and together we can make py-xiaozhi even better!

</div>

<style>
.contributing-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.contributing-page h1 {
  text-align: center;
  margin-bottom: 1rem;
}

.header-content {
  text-align: center;
}

.header-content h2 {
  color: var(--vp-c-brand);
  margin-bottom: 1rem;
}

.contributing-page h2 {
  margin-top: 3rem;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.contributing-page h3 {
  margin-top: 2rem;
}

.contributing-page code {
  background-color: var(--vp-c-bg-soft);
  padding: 0.2em 0.4em;
  border-radius: 3px;
}

.contributing-page pre {
  margin: 1rem 0;
  border-radius: 8px;
  overflow: auto;
}
</style>