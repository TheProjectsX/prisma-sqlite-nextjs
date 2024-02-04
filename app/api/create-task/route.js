import { createTask } from "@/app/PrismaClient/dbHandler/handler";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  let requestBody;
  try {
    requestBody = await request.json();
  } catch (error) {
    return NextResponse.json(
      { success: false, msg: "Invalid Request!" },
      { status: 400 }
    );
  }

  const title = requestBody.title;
  const description = requestBody.description;
  const completed = requestBody.completed ?? false;

  if (!title || !description) {
    return NextResponse.json(
      { success: false, msg: "Task Title and Description is Required!" },
      { status: 400 }
    );
  }

  const taskRes = await createTask({
    title: title.trim(),
    title: description.trim(),
    completed,
  });

  if (!taskRes.id) {
    return NextResponse.json(
      { success: false, msg: "Server Error", error: taskRes.error },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, data: taskRes });
};
