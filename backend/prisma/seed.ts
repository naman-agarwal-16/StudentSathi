import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Create Demo Teacher User
  const demoTeacherPassword = await bcrypt.hash('demo123', 10);
  const demoTeacher = await prisma.user.upsert({
    where: { email: 'demo@studentsathi.com' },
    update: {},
    create: {
      email: 'demo@studentsathi.com',
      passwordHash: demoTeacherPassword,
      name: 'Demo Teacher',
      role: 'TEACHER',
    },
  });
  console.log('✅ Created demo teacher:', demoTeacher.email);

  // 2. Create Demo Admin User
  const demoAdminPassword = await bcrypt.hash('admin123', 10);
  const demoAdmin = await prisma.user.upsert({
    where: { email: 'admin@studentsathi.com' },
    update: {},
    create: {
      email: 'admin@studentsathi.com',
      passwordHash: demoAdminPassword,
      name: 'Demo Admin',
      role: 'ADMIN',
    },
  });
  console.log('✅ Created demo admin:', demoAdmin.email);

  // 3. Create Demo Student User
  const demoStudentPassword = await bcrypt.hash('student123', 10);
  const demoStudentUser = await prisma.user.upsert({
    where: { email: 'student@studentsathi.com' },
    update: {},
    create: {
      email: 'student@studentsathi.com',
      passwordHash: demoStudentPassword,
      name: 'Alex Johnson',
      role: 'STUDENT',
      studentId: 'STU001',
    },
  });
  console.log('✅ Created demo student user:', demoStudentUser.email);

  // 4. Create Multiple Demo Students with Varied Performance
  const students = [
    {
      name: 'Alex Johnson',
      email: 'alex.johnson@school.edu',
      studentId: 'STU001',
      grade: '10',
      section: 'A',
      engagementScore: 85.5,
      attendanceRate: 92.0,
    },
    {
      name: 'Maria Garcia',
      email: 'maria.garcia@school.edu',
      studentId: 'STU002',
      grade: '10',
      section: 'A',
      engagementScore: 45.2,
      attendanceRate: 65.0,
    },
    {
      name: 'James Wilson',
      email: 'james.wilson@school.edu',
      studentId: 'STU003',
      grade: '10',
      section: 'B',
      engagementScore: 78.3,
      attendanceRate: 88.5,
    },
    {
      name: 'Emily Chen',
      email: 'emily.chen@school.edu',
      studentId: 'STU004',
      grade: '10',
      section: 'A',
      engagementScore: 92.8,
      attendanceRate: 98.0,
    },
    {
      name: 'Michael Brown',
      email: 'michael.brown@school.edu',
      studentId: 'STU005',
      grade: '10',
      section: 'B',
      engagementScore: 38.5,
      attendanceRate: 58.0,
    },
  ];

  const createdStudents = [];
  for (const studentData of students) {
    const student = await prisma.student.upsert({
      where: { email: studentData.email },
      update: {},
      create: studentData,
    });
    createdStudents.push(student);
    console.log(`✅ Created student: ${student.name}`);
  }

  // 5. Create Attendance Records (last 30 days)
  const attendanceStatuses = ['PRESENT', 'ABSENT', 'LATE', 'EXCUSED'];
  const today = new Date();
  
  for (const student of createdStudents) {
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Skip weekends
      if (date.getDay() === 0 || date.getDay() === 6) continue;
      
      // Higher attendance students are more likely to be present
      const isHighAttendance = student.attendanceRate > 85;
      const randomValue = Math.random() * 100;
      
      let status: string;
      if (isHighAttendance) {
        status = randomValue < 95 ? 'PRESENT' : randomValue < 98 ? 'LATE' : 'ABSENT';
      } else {
        status = randomValue < 60 ? 'PRESENT' : randomValue < 75 ? 'LATE' : randomValue < 85 ? 'ABSENT' : 'EXCUSED';
      }
      
      await prisma.attendanceRecord.upsert({
        where: {
          studentId_date: {
            studentId: student.id,
            date: date,
          },
        },
        update: {},
        create: {
          studentId: student.id,
          date: date,
          status: status as any,
          notes: status === 'ABSENT' ? 'Unexcused absence' : undefined,
        },
      });
    }
  }
  console.log('✅ Created attendance records for all students');

  // 6. Create Performance Records (Grades)
  const subjects = ['Mathematics', 'Science', 'English', 'History', 'Physics', 'Chemistry'];
  const gradeTypes = ['quiz', 'test', 'assignment', 'exam'];
  
  for (const student of createdStudents) {
    const isHighPerformer = student.engagementScore > 80;
    
    for (let i = 0; i < 20; i++) {
      const subject = subjects[Math.floor(Math.random() * subjects.length)];
      const type = gradeTypes[Math.floor(Math.random() * gradeTypes.length)];
      const date = new Date(today);
      date.setDate(date.getDate() - Math.floor(Math.random() * 60));
      
      const maxScore = type === 'exam' ? 100 : type === 'test' ? 100 : type === 'quiz' ? 50 : 100;
      let score: number;
      
      if (isHighPerformer) {
        score = maxScore * (0.75 + Math.random() * 0.25); // 75-100%
      } else {
        score = maxScore * (0.45 + Math.random() * 0.35); // 45-80%
      }
      
      const percentage = (score / maxScore) * 100;
      const letterGrade = 
        percentage >= 90 ? 'A' :
        percentage >= 80 ? 'B' :
        percentage >= 70 ? 'C' :
        percentage >= 60 ? 'D' : 'F';
      
      const gpa = 
        percentage >= 90 ? 4.0 :
        percentage >= 80 ? 3.0 :
        percentage >= 70 ? 2.0 :
        percentage >= 60 ? 1.0 : 0.0;
      
      await prisma.performanceRecord.create({
        data: {
          studentId: student.id,
          subject,
          score: parseFloat(score.toFixed(2)),
          maxScore,
          letterGrade,
          gpa,
          date,
          type,
        },
      });
    }
  }
  console.log('✅ Created performance records for all students');

  // 7. Create Analytics Data
  const metrics = ['engagement', 'participation', 'homework_completion', 'quiz_average'];
  
  for (const student of createdStudents) {
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      for (const metric of metrics) {
        const baseValue = student.engagementScore;
        const variance = (Math.random() - 0.5) * 20;
        const value = Math.max(0, Math.min(100, baseValue + variance));
        
        const previousValue = baseValue + variance - 5;
        const trend = value > previousValue ? 'UP' : value < previousValue ? 'DOWN' : 'STABLE';
        
        await prisma.analytics.create({
          data: {
            studentId: student.id,
            metric,
            value: parseFloat(value.toFixed(2)),
            trend: trend as any,
            timestamp: date,
            metadata: {
              details: `${metric} tracking for ${student.name}`,
            },
          },
        });
      }
    }
  }
  console.log('✅ Created analytics data for all students');

  // 8. Create Alerts for At-Risk Students
  const alertsData = [
    {
      student: createdStudents[1], // Maria Garcia - Low performer
      alerts: [
        {
          type: 'ENGAGEMENT_DROP' as any,
          severity: 'HIGH' as any,
          message: 'Student engagement has dropped below 50%. Immediate intervention recommended.',
        },
        {
          type: 'ATTENDANCE_LOW' as any,
          severity: 'CRITICAL' as any,
          message: 'Attendance rate is 65%, below the minimum required 75%.',
        },
        {
          type: 'GRADE_DROP' as any,
          severity: 'HIGH' as any,
          message: 'Recent test scores show a significant decline in Mathematics.',
        },
      ],
    },
    {
      student: createdStudents[4], // Michael Brown - Low performer
      alerts: [
        {
          type: 'ENGAGEMENT_DROP' as any,
          severity: 'CRITICAL' as any,
          message: 'Student shows very low engagement (38.5%). Urgent meeting required.',
        },
        {
          type: 'ATTENDANCE_LOW' as any,
          severity: 'CRITICAL' as any,
          message: 'Attendance rate at 58% - at risk of failing due to absences.',
        },
      ],
    },
    {
      student: createdStudents[2], // James Wilson - Medium performer
      alerts: [
        {
          type: 'GRADE_DROP' as any,
          severity: 'MEDIUM' as any,
          message: 'Recent Physics exam score dropped by 15 points.',
        },
      ],
    },
  ];

  for (const alertGroup of alertsData) {
    for (const alertData of alertGroup.alerts) {
      await prisma.alert.create({
        data: {
          studentId: alertGroup.student.id,
          type: alertData.type,
          severity: alertData.severity,
          message: alertData.message,
          status: 'ACTIVE',
          isRead: false,
          metadata: {
            autoGenerated: true,
            timestamp: new Date().toISOString(),
          },
        },
      });
    }
  }
  console.log('✅ Created alerts for at-risk students');

  console.log('\n🎉 Database seeding completed successfully!');
  console.log('\n📝 Demo Credentials:');
  console.log('   Teacher: demo@studentsathi.com / demo123');
  console.log('   Admin:   admin@studentsathi.com / admin123');
  console.log('   Student: student@studentsathi.com / student123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
