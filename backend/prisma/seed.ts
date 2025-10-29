import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Clear existing data
  await prisma.analytics.deleteMany();
  await prisma.alert.deleteMany();
  await prisma.attendanceRecord.deleteMany();
  await prisma.performanceRecord.deleteMany();
  await prisma.student.deleteMany();
  await prisma.webhookConfig.deleteMany();
  await prisma.lMSIntegration.deleteMany();

  // Create students
  const students = await Promise.all([
    prisma.student.create({
      data: {
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        studentId: 'STU001',
        grade: '10',
        section: 'A',
        engagementScore: 85,
        attendanceRate: 92,
      },
    }),
    prisma.student.create({
      data: {
        name: 'Bob Smith',
        email: 'bob.smith@example.com',
        studentId: 'STU002',
        grade: '10',
        section: 'A',
        engagementScore: 72,
        attendanceRate: 88,
      },
    }),
    prisma.student.create({
      data: {
        name: 'Carol Williams',
        email: 'carol.williams@example.com',
        studentId: 'STU003',
        grade: '10',
        section: 'B',
        engagementScore: 95,
        attendanceRate: 98,
      },
    }),
    prisma.student.create({
      data: {
        name: 'David Brown',
        email: 'david.brown@example.com',
        studentId: 'STU004',
        grade: '11',
        section: 'A',
        engagementScore: 65,
        attendanceRate: 75,
      },
    }),
    prisma.student.create({
      data: {
        name: 'Emma Davis',
        email: 'emma.davis@example.com',
        studentId: 'STU005',
        grade: '11',
        section: 'B',
        engagementScore: 88,
        attendanceRate: 94,
      },
    }),
  ]);

  console.log(`Created ${students.length} students`);

  // Create alerts
  const alerts = await Promise.all([
    prisma.alert.create({
      data: {
        studentId: students[1].id,
        type: 'ENGAGEMENT_DROP',
        severity: 'MEDIUM',
        message: 'Engagement score dropped below 75%',
        status: 'ACTIVE',
      },
    }),
    prisma.alert.create({
      data: {
        studentId: students[3].id,
        type: 'ATTENDANCE_LOW',
        severity: 'HIGH',
        message: 'Attendance rate below 80%',
        status: 'ACTIVE',
      },
    }),
  ]);

  console.log(`Created ${alerts.length} alerts`);

  // Create attendance records
  const today = new Date();
  const attendanceRecords = [];
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    for (const student of students) {
      const status = Math.random() > 0.1 ? 'PRESENT' : 'ABSENT';
      attendanceRecords.push(
        prisma.attendanceRecord.create({
          data: {
            studentId: student.id,
            date,
            status,
          },
        })
      );
    }
  }

  await Promise.all(attendanceRecords);
  console.log(`Created ${attendanceRecords.length} attendance records`);

  // Create performance records
  const subjects = ['Mathematics', 'Science', 'English', 'History', 'Computer Science'];
  const performanceRecords = [];

  for (const student of students) {
    for (const subject of subjects) {
      for (let i = 0; i < 5; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - (i * 7));
        const score = Math.random() * 100;
        
        performanceRecords.push(
          prisma.performanceRecord.create({
            data: {
              studentId: student.id,
              subject,
              score,
              maxScore: 100,
              date,
              type: i % 2 === 0 ? 'quiz' : 'assignment',
            },
          })
        );
      }
    }
  }

  await Promise.all(performanceRecords);
  console.log(`Created ${performanceRecords.length} performance records`);

  // Create analytics records
  const analyticsRecords = [];
  const metrics = ['engagement', 'attendance', 'performance'];

  for (const student of students) {
    for (const metric of metrics) {
      for (let i = 0; i < 10; i++) {
        const timestamp = new Date(today);
        timestamp.setDate(timestamp.getDate() - (i * 3));
        
        analyticsRecords.push(
          prisma.analytics.create({
            data: {
              studentId: student.id,
              metric,
              value: Math.random() * 100,
              trend: ['UP', 'DOWN', 'STABLE'][Math.floor(Math.random() * 3)] as 'UP' | 'DOWN' | 'STABLE',
              timestamp,
            },
          })
        );
      }
    }
  }

  await Promise.all(analyticsRecords);
  console.log(`Created ${analyticsRecords.length} analytics records`);

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
