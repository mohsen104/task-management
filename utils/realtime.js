export async function realtimeTasksUser(setter, userid) {
    const res = await fetch("http://localhost:3000/api/tasks/userid/" + userid);
    const data = await res.json();
    setter(data);
}

export async function realtimeTasks(setter) {
    const res = await fetch("http://localhost:3000/api/tasks/");
    const data = await res.json();
    setter(data);
}