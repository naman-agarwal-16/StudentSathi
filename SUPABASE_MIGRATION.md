# Migrating to Supabase

This guide will help you migrate from a local PostgreSQL database to Supabase.

## Why Supabase?

- **Managed PostgreSQL**: No database maintenance
- **Built-in Authentication**: Optional Supabase Auth integration
- **Real-time subscriptions**: WebSocket support
- **Row Level Security**: Fine-grained access control
- **Free tier**: Generous limits for development
- **Easy deployment**: Connection pooling included

## Prerequisites

- Supabase account (sign up at [https://supabase.com](https://supabase.com))
- Existing StudentSathi project
- Node.js 18+ installed

## Step 1: Create Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Click "New Project"
3. Choose organization and region
4. Set database password (save this securely!)
5. Wait for project initialization (~2 minutes)

## Step 2: Get Connection String

1. In your Supabase project dashboard
2. Go to **Settings** → **Database**
3. Scroll to **Connection string** section
4. Copy the **Connection pooling** string (recommended for serverless)
   ```
   postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
   ```
5. Or use **Direct connection** for traditional hosting:
   ```
   postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   ```

### Connection String Format

**Connection Pooling (Recommended for Vercel, Netlify, etc.):**
```env
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
```

**Direct Connection (For traditional servers, Railway, etc.):**
```env
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
```

## Step 3: Update Environment Variables

### Backend Environment

Update `backend/.env`:

```env
# Supabase Database
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"

# Optional: Supabase Additional Features
SUPABASE_URL="https://[PROJECT-REF].supabase.co"
SUPABASE_ANON_KEY="your-anon-key-from-supabase-settings"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key-keep-secret"
```

### Get Supabase Keys

1. Go to **Settings** → **API**
2. Copy `Project URL` → Use as `SUPABASE_URL`
3. Copy `anon public` key → Use as `SUPABASE_ANON_KEY`
4. Copy `service_role secret` → Use as `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

### Frontend Environment (if using Supabase client)

Update `frontend/.env`:

```env
VITE_SUPABASE_URL="https://[PROJECT-REF].supabase.co"
VITE_SUPABASE_ANON_KEY="your-anon-key"
```

## Step 4: Update Prisma Schema

If using connection pooling, update `backend/prisma/schema.prisma`:

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL") // Optional: for migrations
}
```

Then in `backend/.env`:
```env
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
```

## Step 5: Run Migrations

```bash
cd backend

# Generate Prisma Client
npx prisma generate

# Run migrations (creates tables in Supabase)
npx prisma migrate deploy

# Or create a new migration
npx prisma migrate dev --name init_supabase
```

## Step 6: Verify Connection

Test the connection:

```bash
cd backend
npx prisma studio
```

This should open Prisma Studio connected to your Supabase database.

## Step 7: Enable Row Level Security (Optional)

For additional security in Supabase:

1. Go to **Database** → **Tables** in Supabase dashboard
2. For each table, click **⋮** → **Edit table**
3. Enable **Row Level Security (RLS)**
4. Create policies based on your needs

Example RLS policy for `users` table:
```sql
-- Allow users to read their own data
CREATE POLICY "Users can read own data"
ON users
FOR SELECT
USING (auth.uid()::text = id);
```

## Step 8: Deploy Backend

### Deploy to Railway

1. Install Railway CLI: `npm install -g @railway/cli`
2. Login: `railway login`
3. Create project: `railway init`
4. Add environment variables:
   ```bash
   railway variables set DATABASE_URL="your-supabase-connection-string"
   railway variables set JWT_SECRET="your-secret"
   railway variables set FRONTEND_URL="your-frontend-url"
   ```
5. Deploy: `railway up`

### Deploy to Heroku

```bash
heroku create studentsathi-backend
heroku config:set DATABASE_URL="your-supabase-connection-string"
heroku config:set JWT_SECRET="your-secret"
heroku config:set FRONTEND_URL="your-frontend-url"
git push heroku main
```

### Deploy to Render

1. Create new **Web Service** on Render
2. Connect GitHub repository
3. Set build command: `cd backend && npm install && npx prisma generate`
4. Set start command: `cd backend && npm start`
5. Add environment variables in dashboard

## Step 9: Deploy Frontend

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from frontend directory
cd frontend
vercel

# Set environment variables
vercel env add VITE_API_BASE_URL production
# Enter your backend URL: https://your-backend.railway.app/api
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd frontend
netlify deploy --prod

# Set environment variables in Netlify dashboard
```

## Step 10: Update CORS

Update `backend/src/server.ts` CORS configuration:

```typescript
app.use(cors({
  origin: [
    'https://your-frontend.vercel.app',
    'https://your-frontend.netlify.app',
    process.env.FRONTEND_URL || 'http://localhost:8080'
  ],
  credentials: true
}));
```

## Troubleshooting

### Connection Issues

**Problem**: "Connection timeout"
```bash
# Solution: Use connection pooling URL
DATABASE_URL="postgresql://...pooler.supabase.com:6543/..."
```

**Problem**: "Too many connections"
```bash
# Solution: Add connection limit to URL
DATABASE_URL="postgresql://...?connection_limit=1"
```

### Migration Errors

**Problem**: "Migration failed"
```bash
# Solution: Use direct URL for migrations
DIRECT_URL="postgresql://...db.[PROJECT-REF].supabase.co:5432/..."
```

### Prisma Issues

**Problem**: "Prisma Client did not initialize yet"
```bash
# Solution: Regenerate Prisma Client
cd backend
npx prisma generate
npm run build
```

## Performance Tips

1. **Use Connection Pooling** for serverless deployments
2. **Enable Row Level Security** for additional security
3. **Create Indexes** on frequently queried columns
4. **Monitor Performance** in Supabase Dashboard
5. **Use Supabase Realtime** for live updates (optional)

## Monitoring

Monitor your database in Supabase:
- **Database** → **Reports**: Performance metrics
- **Database** → **Logs**: Query logs
- **Database** → **Backups**: Automatic daily backups

## Cost Estimation

**Free Tier Limits:**
- 500 MB database space
- 5 GB bandwidth
- 50 MB file storage
- Unlimited API requests
- Up to 500,000 monthly active users

**Pro Tier** ($25/month):
- 8 GB database space
- 50 GB bandwidth
- 100 GB file storage

## Support

- Supabase Docs: [https://supabase.com/docs](https://supabase.com/docs)
- Prisma + Supabase: [https://www.prisma.io/docs/guides/database/supabase](https://www.prisma.io/docs/guides/database/supabase)
- StudentSathi Issues: [https://github.com/naman-agarwal-16/StudentSathi/issues](https://github.com/naman-agarwal-16/StudentSathi/issues)

## Next Steps

After successful migration:
- [ ] Test all API endpoints
- [ ] Verify authentication flow
- [ ] Check RBAC permissions
- [ ] Test student dashboard
- [ ] Monitor performance
- [ ] Set up automatic backups reminder
- [ ] Configure alerts in Supabase

---

**Need Help?** Open an issue on GitHub or check the [SETUP_GUIDE.md](SETUP_GUIDE.md) for general setup instructions.
