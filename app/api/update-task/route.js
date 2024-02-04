import { updateTask } from "@/app/PrismaClient/dbHandler/handler";
import { NextResponse } from "next/server";

export const PUT = async (request) => {
  let requestBody;
  try {
    requestBody = await request.json();
  } catch (error) {
    return NextResponse.json(
      { success: false, msg: "Invalid Request!" },
      { status: 400 }
    );
  }
  const taskId = requestBody.id;
  const title = requestBody.title;
  const description = requestBody.description;
  const completed = requestBody.completed;

  if (!taskId || (!title && !description && completed === undefined)) {
    return NextResponse.json(
      { success: false, msg: "Task ID and at least One Item is Required!" },
      { status: 400 }
    );
  }

  const dataToUpdate = {
    ...(title && { title: title.trim() }),
    ...(description && { title: description.trim() }),
    ...(completed !== undefined && { completed }),
  };

  const taskRes = await updateTask(taskId, dataToUpdate);
  if (!taskRes.id) {
    return NextResponse.json(
      {
        success: false,
        msg: "Task not Found!",
        error: taskRes.error,
      },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, data: taskRes });
};
