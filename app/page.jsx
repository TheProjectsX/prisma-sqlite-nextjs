import TaskTracker from "@/app/components/TaskTracker";

export default async function Home() {
  // Using dynamic URL to get Updated Data every time
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/get-task?t=${Date.now()}`
  );

  const taskData = (await res.json()).data;

  return (
    <main>
      <TaskTracker taskData={taskData} />
    </main>
  );
}
