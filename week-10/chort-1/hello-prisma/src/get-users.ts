import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const users = await prisma.user.findMany({
        where: {
            email: "test@mail.com",
        },
    });
    users.forEach((usr) => {
        console.log(usr.name);
    });
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
