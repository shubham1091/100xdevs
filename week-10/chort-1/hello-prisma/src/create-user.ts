import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

    await prisma.user.create({data:{email: "test@mail.com",name:"test"}})
}

main()
    .then(async () => {
        console.log("done with query");
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
