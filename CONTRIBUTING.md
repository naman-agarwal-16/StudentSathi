# Contributing to StudentSathi

Thank you for considering contributing to StudentSathi! We welcome contributions from the community.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/StudentSathi.git
   cd StudentSathi
   ```
3. **Install dependencies**:
   ```bash
   npm run install:all
   ```

## 📋 Development Workflow

### Frontend Development
```bash
npm run dev:frontend
```
Frontend runs on http://localhost:8080

### Backend Development
```bash
npm run dev:backend
```
Backend runs on http://localhost:3001

### Database Management
```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Open Prisma Studio
npm run prisma:studio
```

## 🔀 Making Changes

1. **Create a new branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our code style:
   - Use TypeScript for all new code
   - Follow existing naming conventions
   - Add comments for complex logic
   - Write tests for new features

3. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

   Use conventional commit format:
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `style:` - Code style changes (formatting, etc.)
   - `refactor:` - Code refactoring
   - `test:` - Adding or updating tests
   - `chore:` - Maintenance tasks

4. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Open a Pull Request** on GitHub

## 🧪 Testing

Before submitting a PR, ensure:
- [ ] Code builds without errors
- [ ] All existing tests pass
- [ ] New features have tests
- [ ] No TypeScript errors
- [ ] No ESLint warnings

```bash
# Run tests
npm run test

# Build frontend
npm run build:frontend

# Build backend
npm run build:backend
```

## 📝 Code Style

- **TypeScript**: Use strict mode
- **Formatting**: Prettier with default settings
- **Linting**: ESLint with provided configuration
- **Naming**: 
  - Components: PascalCase (`StudentCard.tsx`)
  - Files: camelCase (`useAuth.tsx`)
  - Variables: camelCase (`studentData`)
  - Constants: UPPER_SNAKE_CASE (`API_BASE_URL`)

## 🐛 Reporting Bugs

When reporting bugs, please include:
1. **Description**: Clear description of the issue
2. **Steps to reproduce**: Detailed steps
3. **Expected behavior**: What should happen
4. **Actual behavior**: What actually happens
5. **Environment**: OS, Node version, browser
6. **Screenshots**: If applicable

## 💡 Feature Requests

Feature requests are welcome! Please:
1. Check existing issues first
2. Provide clear use case
3. Explain expected behavior
4. Consider implementation complexity

## 📚 Documentation

- Update README.md for user-facing changes
- Update inline code comments
- Add JSDoc comments for public APIs
- Update SETUP_GUIDE.md if setup changes

## 🔒 Security

If you discover a security vulnerability:
1. **DO NOT** open a public issue
2. Email: [your-email@example.com]
3. Include detailed description
4. We'll respond within 48 hours

## ⚖️ License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Thank You!

Your contributions make StudentSathi better for everyone!
