import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.category.upsert({
    where: { categoryId: 1 },
    update: {},
    create: {
      title: 'Бытовая техника',
      tasks: {
        create: [
          {
            title: 'Ремонт холодильниа',
            userId: '13',
            description: 'Не холодит.',
            price: 2000,
            deadline: new Date(),
            image: '',
            address: 'Ленинский проспект, 89/3',
            tags: {
                create: [
                    {
                     message: 'Нужно сегодня вечером',
                      userId: '14',
                    }
                  ]
            },
            city: 'Москва',   
            createdAt: new Date(),
            publishAt: new Date(),
            statusTask: 'New',
            comments: {
                create: [
                    {
                    text: 'Какое время подходит?',
                    userId: '3',
                    }
                ]
            },  
          },
        ]
      },
    }
  });
  
  console.info('🤘️ Database was filled')
}

fillDb()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect()

    process.exit(1);
  })