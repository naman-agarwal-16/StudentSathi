# Demo Data Setup Guide

This guide explains how to populate your database with realistic demo data for showcasing StudentSathi.

## What Gets Created

The seed script creates:

### Users (3 accounts)
- **Teacher:** `demo@studentsathi.com` / `demo123`
- **Admin:** `admin@studentsathi.com` / `admin123`  
- **Student:** `student@studentsathi.com` / `student123`

### Students (5 students with varied performance)
1. **Alex Johnson** - High performer (85.5% engagement, 92% attendance)
2. **Maria Garcia** - At-risk (45.2% engagement, 65% attendance)
3. **James Wilson** - Good performer (78.3% engagement, 88.5% attendance)
4. **Emily Chen** - Excellent (92.8% engagement, 98% attendance)
5. **Michael Brown** - Critical risk (38.5% engagement, 58% attendance)

### Data Generated
- **600+ attendance records** (30 days × 5 students × ~4 days/week)
- **100+ performance records** (grades, quizzes, tests, assignments)
- **600+ analytics data points** (engagement, participation, homework tracking)
- **6 active alerts** for at-risk students

## Running the Seed Script

### Option 1: Using npm script (Recommended)

```bash
cd backend
npm run seed
```

### Option 2: Direct execution

```bash
cd backend
npx tsx prisma/seed.ts
```

### Option 3: With Prisma reset (clears all data first)

```bash
cd backend
npx prisma migrate reset --skip-generate
# When prompted, type 'yes' to confirm
```

> ⚠️ **Warning:** `prisma migrate reset` will DELETE all existing data!

## After Seeding

1. **Start your backend server:**
   ```bash
   npm run dev
   ```

2. **Login with demo credentials:**
   - Navigate to your login page
   - Use any of the demo accounts listed above

3. **Explore the dashboards:**
   - **Teacher Dashboard:** See all 5 students with rich analytics
   - **Student Dashboard:** View personalized metrics and grades
   - **Alerts Tab:** Review 6 active alerts for at-risk students

## Data Characteristics

### High Performers (Alex, Emily, James)
- 75-100% test scores
- 85-98% attendance
- Minimal to no alerts
- Positive engagement trends

### At-Risk Students (Maria, Michael)
- 45-80% test scores  
- 58-65% attendance
- Multiple critical/high severity alerts
- Declining engagement trends

## Customizing the Data

To modify the seed data:

1. Edit `backend/prisma/seed.ts`
2. Adjust student information in the `students` array
3. Modify date ranges, score distributions, or alert thresholds
4. Re-run `npm run seed`

## Troubleshooting

### "Email already exists" error
The seed script uses `upsert` to avoid duplicate errors. If you see this, the data already exists. Use `prisma migrate reset` to start fresh.

### "Database connection failed"
Check your `.env` file has correct `DATABASE_URL` configured.

### Permission errors
Ensure your database user has CREATE, INSERT, and UPDATE permissions.

## Production Deployment

> ⚠️ **Important:** Do NOT run the seed script in production! It's designed for development and demo purposes only.

For production:
1. Remove demo credentials
2. Use real user registration
3. Let actual usage generate organic data
4. Consider data privacy regulations

## Need Help?

- Check `backend/prisma/schema.prisma` for data models
- Review `backend/src/services/` for API endpoints
- See `SETUP_GUIDE.md` for full setup instructions
