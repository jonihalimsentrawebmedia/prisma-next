import {PrismaClient,} from "@/app/generated/prisma/client";
import {PrismaPg} from '@prisma/adapter-pg'
import 'dotenv/config'
import bcrypt from 'bcrypt'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter,
});

const HashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10)
}

export async function main() {
  const User = await prisma.user.create({
    data: {
      name: 'Testing',
      email: 'testing@gmail.com',
      password: await HashPassword('@Naruto1244'),
      phone: '081234567890'
    }
  })
  
  console.log(User)
}

main().catch((e) => {
  console.log(e)
}).finally(async () => {
  await prisma.$disconnect()
})