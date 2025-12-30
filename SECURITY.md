# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of StudentSathi seriously. If you discover a security vulnerability, please follow these steps:

### 🔒 Private Disclosure

**DO NOT** open a public issue for security vulnerabilities. Instead:

1. **Email**: Send details to [aganaman16@gmail.com]
2. **Subject**: Include "SECURITY" in the subject line
3. **Details**: Provide:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### ⏱️ Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Depends on severity
  - Critical: 1-7 days
  - High: 7-14 days
  - Medium: 14-30 days
  - Low: 30-90 days

### 🛡️ Security Best Practices

When deploying StudentSathi:

#### Environment Variables
- ✅ **NEVER** commit `.env` files
- ✅ Use strong, unique values for `JWT_SECRET` and `ENCRYPTION_KEY`
- ✅ Change default credentials in production
- ✅ Use environment-specific variables

#### Database Security
- ✅ Use Supabase connection pooling
- ✅ Enable Row Level Security (RLS) in Supabase
- ✅ Use strong database passwords
- ✅ Restrict database access by IP if possible
- ✅ Regular backups

#### Authentication
- ✅ Enable HTTPS in production
- ✅ Use HttpOnly cookies for tokens
- ✅ Implement rate limiting
- ✅ Use strong password policies
- ✅ Enable 2FA for admin accounts (if implemented)

#### API Security
- ✅ Validate all inputs
- ✅ Use CORS properly
- ✅ Implement rate limiting
- ✅ Keep dependencies updated
- ✅ Use Helmet.js for security headers

#### Deployment
- ✅ Use HTTPS/TLS certificates
- ✅ Enable security headers
- ✅ Keep Node.js and dependencies updated
- ✅ Use environment variables for secrets
- ✅ Implement logging and monitoring

### 🔍 Security Features

#### Implemented
- JWT-based authentication with refresh tokens
- Password hashing with bcrypt
- HttpOnly cookies for token storage
- Role-based access control (RBAC)
- SQL injection prevention via Prisma
- XSS protection
- CORS configuration
- Rate limiting
- Input validation with Zod

#### Planned
- Two-factor authentication (2FA)
- Session management improvements
- Advanced audit logging
- IP whitelisting
- API key rotation
- Security headers enhancement

### 📋 Security Checklist for Deployment

Before deploying to production:

- [ ] All `.env` files are in `.gitignore`
- [ ] Strong, unique `JWT_SECRET` set (min 32 characters)
- [ ] Strong, unique `ENCRYPTION_KEY` set (32 characters)
- [ ] Database credentials are secure
- [ ] HTTPS is enabled
- [ ] CORS is properly configured
- [ ] Rate limiting is enabled
- [ ] Security headers are set
- [ ] Dependencies are up to date
- [ ] Backup strategy is in place
- [ ] Monitoring is enabled
- [ ] Error messages don't leak sensitive info

### 🚨 Known Security Considerations

1. **Password Reset**: Implement token expiration (currently set to 1 hour)
2. **Rate Limiting**: Adjust limits based on your use case
3. **Session Management**: Implement session revocation
4. **File Uploads**: Validate and sanitize if implementing file uploads
5. **HTTPS**: Required for production - sensitive data in transit

### 📚 Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Supabase Security](https://supabase.com/docs/guides/auth)
- [JWT Security Best Practices](https://tools.ietf.org/html/rfc8725)

### 🙏 Acknowledgments

We appreciate security researchers who responsibly disclose vulnerabilities. Contributors will be acknowledged (with permission) in our security advisories.

---

**Last Updated**: December 31, 2025
