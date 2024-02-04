import { getAllTasks, getTask } from "@/app/PrismaClient/dbHandler/handler";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const query = new URL(request.url).searchParams;
  const taskId = query.get("id");

  let taskRes;
  if (taskId) {
    taskRes = await getTask(taskId);
    if (!taskRes.id) {
      return NextResponse.json(
        { success: false, msg: "Task not Found!", error: taskRes.error },
        { status: 404 }
      );
    }
  } else {
    taskRes = await getAllTasks(taskId);
  }

  return NextResponse.json({ success: true, data: taskRes });
};
