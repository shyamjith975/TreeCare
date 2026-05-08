import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Seed Services
  const services = await prisma.service.createMany({
    data: [
      {
        name: 'Coconut Harvesting',
        description: 'Professional coconut harvesting service',
        category: 'Harvest',
        basePrice: 100,
        unitType: 'per_tree',
        estimatedTime: 30
      },
      {
        name: 'Tree Cleaning',
        description: 'Professional tree and area cleaning',
        category: 'Cleaning',
        basePrice: 50,
        unitType: 'per_tree',
        estimatedTime: 45
      },
      {
        name: 'Shell Removal',
        description: 'Coconut shell removal and processing',
        category: 'Shell Removal',
        basePrice: 30,
        unitType: 'per_tree',
        estimatedTime: 20
      },
      {
        name: 'Land Inspection',
        description: 'Comprehensive land and property inspection',
        category: 'Inspection',
        basePrice: 500,
        unitType: 'per_job',
        estimatedTime: 120
      },
      {
        name: 'Emergency Storm Service',
        description: 'Emergency service for storm damage',
        category: 'Emergency',
        basePrice: 200,
        unitType: 'per_job',
        estimatedTime: 60
      }
    ],
    skipDuplicates: true
  });

  console.log(`✅ Created ${services.count} services`);

  // Seed Subscription Plans
  const plans = await prisma.subscriptionPlan.createMany({
    data: [
      {
        name: 'Basic',
        description: 'Perfect for occasional maintenance',
        visitsPerYear: 2,
        monthlyPrice: null,
        yearlyPrice: 1200,
        features: ['2 maintenance visits', 'Email support', 'Photo documentation']
      },
      {
        name: 'Standard',
        description: 'Ideal for regular maintenance',
        visitsPerYear: 4,
        monthlyPrice: 350,
        yearlyPrice: 3600,
        features: ['4 maintenance visits', 'Priority support', 'Health reports', 'Photo documentation']
      },
      {
        name: 'Premium',
        description: 'Complete care and monitoring',
        visitsPerYear: 12,
        monthlyPrice: 999,
        yearlyPrice: 10800,
        features: [
          'Monthly monitoring',
          'Priority booking',
          'Health reports',
          'Photo documentation',
          'Emergency support',
          'Yield prediction'
        ]
      }
    ],
    skipDuplicates: true
  });

  console.log(`✅ Created ${plans.count} subscription plans`);

  // Seed Equipment Inventory
  const equipment = await prisma.equipmentInventory.createMany({
    data: [
      {
        name: 'Safety Belt',
        description: 'Professional climbing safety belt',
        category: 'safety',
        dailyRent: 100,
        weeklyRent: 500,
        monthlyRent: 1500,
        totalQuantity: 50,
        availableQty: 45
      },
      {
        name: 'Climbing Rope (50m)',
        description: 'Professional grade climbing rope',
        category: 'climbing',
        dailyRent: 150,
        weeklyRent: 750,
        monthlyRent: 2000,
        totalQuantity: 30,
        availableQty: 25
      },
      {
        name: 'Climbing Machine',
        description: 'Electric climbing machine for coconut trees',
        category: 'climbing',
        dailyRent: 500,
        weeklyRent: 2500,
        monthlyRent: 7000,
        totalQuantity: 10,
        availableQty: 8
      },
      {
        name: 'Collection Basket',
        description: 'Heavy-duty collection basket',
        category: 'collection',
        dailyRent: 50,
        weeklyRent: 250,
        monthlyRent: 700,
        totalQuantity: 100,
        availableQty: 90
      }
    ],
    skipDuplicates: true
  });

  console.log(`✅ Created ${equipment.count} equipment items`);

  // Seed District Coverage
  const districts = await prisma.districtCoverage.createMany({
    data: [
      { district: 'Alappuzha', state: 'Kerala', isActive: true },
      { district: 'Ernakulam', state: 'Kerala', isActive: true },
      { district: 'Idukki', state: 'Kerala', isActive: true },
      { district: 'Kannur', state: 'Kerala', isActive: true },
      { district: 'Kottayam', state: 'Kerala', isActive: true },
      { district: 'Kozhikode', state: 'Kerala', isActive: true },
      { district: 'Malappuram', state: 'Kerala', isActive: true },
      { district: 'Palakkad', state: 'Kerala', isActive: true },
      { district: 'Pathanamthitta', state: 'Kerala', isActive: true },
      { district: 'Thiruvananthapuram', state: 'Kerala', isActive: true },
      { district: 'Thrissur', state: 'Kerala', isActive: true },
      { district: 'Wayanad', state: 'Kerala', isActive: true }
    ],
    skipDuplicates: true
  });

  console.log(`✅ Created ${districts.count} district coverage records`);

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seeding failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });