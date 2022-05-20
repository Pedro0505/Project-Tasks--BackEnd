import prisma from '../prisma';
import { tasks } from './data/tasks';

async function main() {
  await prisma.tasks.createMany({ data: tasks });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
