import { deleteTask } from "@/app/PrismaClient/dbHandler/handler";
import { NextResponse } from "next/server";

export const DELETE = async (request) => {
  const query = new URL(request.url).searchParams;
  const taskId = query.get("id");

  if (!taskId) {
    return NextResponse.json(
      { success: false, msg: "Task ID is Required!" },
      { status: 400 }
    );
  }

  const taskRes = await deleteTask(taskId);
  if (!taskRes.id) {
    return NextResponse.json(
      { success: false, msg: "Task Not Found!", error: taskRes.error },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, data: taskRes });
};
