const BASE_URL = import.meta.env.VITE_API_URL;

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

async function prefill() {
  const userData = await apiFetch("/api/user");
  if (!userData.success) {
    window.location.href = "/login";
    return;
  }
  const user = userData.user;

  document.getElementById("email").value = user.email || "";

  if (user.firstname || user.lastname) {
    document.getElementById("nameStudent").value =
      [user.firstname, user.lastname].filter(Boolean).join(" ");
  }
  if (Array.isArray(user.socials) && user.socials.length) {
    document.getElementById("linkedinURL").value = user.socials[0];
  }

  const projData = await apiFetch("/project/");
  if (!projData.success) return;

  const myProject = projData.projects.find(
    (p) =>
      Array.isArray(p.members) &&
      p.members.some((m) => m.id === user.id)
  );

  if (!myProject) return;

  document.getElementById("nameProject").value = myProject.name || "";
  document.getElementById("description").value = myProject.description || "";

  const courseSelect = document.querySelector(".courseSelect");
  if (courseSelect && myProject.course) {
    const opt = [...courseSelect.options].find((o) => o.value === myProject.course);
    if (opt) courseSelect.value = myProject.course;
  }

  const otherMembers = myProject.members.filter((m) => m.id !== user.id);
  if (otherMembers.length) {
    const m2 = otherMembers[0];
    document.getElementById("extraPersonToggle").checked = true;
    document.getElementById("secondnamestudent").value =
      [m2.firstname, m2.lastname].filter(Boolean).join(" ");
    document.getElementById("secondemail").value = m2.email || "";
    if (Array.isArray(m2.socials) && m2.socials.length) {
      document.getElementById("secondlinkedinurl").value = m2.socials[0];
    }
  }
}

const extraToggle = document.getElementById("extraPersonToggle");
const secondInputs = ["secondnamestudent", "secondemail", "secondlinkedinurl"];

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

  const selects = document.querySelectorAll(".courseSelect");
  const course = selects[0]?.value;

  const payload = {
    name: document.getElementById("nameProject").value.trim(),
    description: document.getElementById("description").value.trim(),
    course,
    memberIds: [],
    mediaIds: [],
  };

  let currentUserId = null;
  try {
    const p = JSON.parse(atob(token.split(".")[1]));
    currentUserId = p.id;
  } catch { }

  if (currentUserId) payload.memberIds.push(currentUserId);

  const extraOpen = extraToggle.checked;
  const secondEmail = document.getElementById("secondemail").value.trim();
  if (extraOpen && secondEmail) {
    try {
      const allProj = await apiFetch("/project/");
      const allMembers = (allProj.projects || []).flatMap((p) => p.members || []);
      const match = allMembers.find((m) => m.email === secondEmail);
      if (match) payload.memberIds.push(match.id);
    } catch { }
  }

  const submitBtn = form.querySelector(".submit");
  submitBtn.disabled = true;
  submitBtn.textContent = "Bezig...";

  try {
    const existingData = await apiFetch("/project/");
    const existing = (existingData.projects || []).find(
      (p) =>
        Array.isArray(p.members) &&
        p.members.some((m) => m.id === currentUserId)
    );

    let result;
    if (existing) {
      result = await apiFetch(`/project/${existing.id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
    } else {
      result = await apiFetch("/project/", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    }

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
