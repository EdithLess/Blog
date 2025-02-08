import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createUser() {
  const user = await prisma.newUser.findFirst();
  console.log(user);
}

createUser();

export default createUser;
