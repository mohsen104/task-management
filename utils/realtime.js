export async function realtimeTasksUser(setter, userid) {
    const res = await fetch("https://task-management-nine-mu.vercel.app/api/tasks/userid/" + userid);
    const data = await res.json();
    setter(data);
}

export async function realtimeTasks(setter) {
    const res = await fetch("https://task-management-nine-mu.vercel.app/api/tasks/");
    const data = await res.json();
    setter(data);
}