import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const client = new PrismaClient();

export async function GET(request: NextRequest) {
  return Response.json({
    username: "shubham",
    email: "shubham@gmail.com",
    route: request.url,
  });
}

export async function POST(request: NextRequest) {
  const res = await request.json();
  // console.log(res);
  const user = await client.user.create({
    data: { username: res.username, password: res.password, email: res.email },
  });
  console.log(user);
  return Response.json({ user });
}
