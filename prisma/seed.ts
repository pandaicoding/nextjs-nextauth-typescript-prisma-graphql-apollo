import { PrismaClient } from ".prisma/client"
import { links } from "../data/links"

const prisma = new PrismaClient()

async function main() {
  // create data user
  // await prisma.user.create({
  //   data: {
  //     email: "testadmin@gmail.com",
  //     role: "ADMIN",
  //   },
  // })
  // create data link
  await prisma.link.createMany({
    data: links,
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
