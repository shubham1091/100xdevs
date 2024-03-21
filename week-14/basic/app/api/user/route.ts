import client from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const user = await client.user.findFirst();
  return NextResponse.json({
    username: user?.username,
    email: user?.email,
    route: request.url,
  });
}

export async function POST(request: NextRequest) {
  const res = await request.json();
  // console.log(res);
  try {
    const user = await client.user.create({
      data: {
        username: res.username,
        password: res.password,
        email: res.email,
      },
    });
    console.log(user);
    return NextResponse.json({
      id: user.id,
      email: user.email,
      username: user.username,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "unable to create" }, { status: 403 });
  }
}
