const BASE_URL = "https://api.shiftfestival.be";

const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "/login";
}

async function apiFetch(path, opts = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(opts.headers || {}),
    },
  });
  return res.json();
}

function val(id) {
  return document.getElementById(id)?.value.trim() ?? "";
}

async function prefill() {
  const userData = await apiFetch("/api/user");
  if (!userData.success) {
    window.location.href = "/login";
    return;
  }
  const user = userData.user;

  document.getElementById("firstName").value = user.firstname || "";
  document.getElementById("lastName").value = user.lastname || "";
  document.getElementById("email").value = user.email || "";
  if (Array.isArray(user.socials) && user.socials.length) {
    document.getElementById("linkedinURL").value = user.socials[0];
  }

  const projData = await apiFetch("/project/");
  if (!projData.success) return;

  const myProject = projData.projects.find(
    (p) => Array.isArray(p.members) && p.members.some((m) => m.id === user.id)
  );
  if (!myProject) return;

  document.getElementById("nameProject").value = myProject.name || "";
  document.getElementById("description").value = myProject.description || "";

  if (myProject.course) {
    const courseEl = document.getElementById("course");
    const opt = [...courseEl.options].find((o) => o.value === myProject.course);
    if (opt) courseEl.value = myProject.course;
  }

  const others = myProject.members.filter((m) => m.id !== user.id);
  if (others.length) {
    const m2 = others[0];
    document.getElementById("extraPersonToggle").checked = true;
    syncSecondRequired();
    document.getElementById("2ndStudentFirstName").value = m2.firstname || "";
    document.getElementById("2ndStudentLastName").value = m2.lastname || "";
    document.getElementById("secondemail").value = m2.email || "";
    if (Array.isArray(m2.socials) && m2.socials.length) {
      document.getElementById("secondlinkedinurl").value = m2.socials[0];
    }
  }
}

const extraToggle = document.getElementById("extraPersonToggle");
const secondInputs = ["2ndStudentFirstName", "2ndStudentLastName", "secondemail", "secondlinkedinurl"];

function syncSecondRequired() {
  const open = extraToggle.checked;
  secondInputs.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.required = open;
  });
}

extraToggle.addEventListener("change", syncSecondRequired);
syncSecondRequired();

const form = document.querySelector(".form-3de");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let currentUserId = null;
  try {
    currentUserId = JSON.parse(atob(token.split(".")[1])).id;
  } catch { }

  const payload = {
    name: val("nameProject"),
    description: val("description"),
    course: val("course"),
    memberIds: currentUserId ? [currentUserId] : [],
    mediaIds: [],
  };

  if (extraToggle.checked && val("secondemail")) {
    try {
      const allProj = await apiFetch("/project/");
      const allMembers = (allProj.projects || []).flatMap((p) => p.members || []);
      const match = allMembers.find((m) => m.email === val("secondemail"));
      if (match) payload.memberIds.push(match.id);
    } catch { }
  }

  const submitBtn = form.querySelector(".submit");
  submitBtn.disabled = true;
  submitBtn.textContent = "Bezig...";

  try {

    const existingData = await apiFetch("/project/");
    const existing = (existingData.projects || []).find(
      (p) => Array.isArray(p.members) && p.members.some((m) => m.id === currentUserId)
    );

    const result = existing
      ? await apiFetch(`/project/${existing.id}`, { method: "PUT", body: JSON.stringify(payload) })
      : await apiFetch("/project/", { method: "POST", body: JSON.stringify(payload) });

    if (result.success) {
      submitBtn.textContent = "✓ Opgeslagen";
      submitBtn.style.background = "green";
    } else {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit";
      alert("Fout: " + (result.message || "Onbekende fout"));
    }
  } catch (err) {
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit";
    alert("Netwerk fout: " + err.message);
  }
});

prefill();
