document.addEventListener("DOMContentLoaded", () => {
  const loginOverlay = document.getElementById("login-overlay");
  const adminDashboard = document.getElementById("admin-dashboard");
  const loginBtn = document.getElementById("login-btn");
  const logoutBtn = document.getElementById("logout-btn");
  const errorMsg = document.getElementById("login-error");

  // Authentication
  const checkAuth = () => {
    if (localStorage.getItem("aw_admin_auth") === "true") {
      loginOverlay.style.display = "none";
      adminDashboard.style.display = "block";
      loadAdminData();
    } else {
      loginOverlay.style.display = "flex";
      adminDashboard.style.display = "none";
    }
  };

  loginBtn.addEventListener("click", () => {
    const user = document.getElementById("admin-user").value;
    const pass = document.getElementById("admin-pass").value;

    if (user === "Aaradhya358" && pass === "Aaradhya358") {
      localStorage.setItem("aw_admin_auth", "true");
      checkAuth();
    } else {
      errorMsg.style.display = "block";
    }
  });

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("aw_admin_auth");
    checkAuth();
  });

  checkAuth();

  // Load Data into Forms
  function loadAdminData() {
    const data = getData();
    
    // General Settings
    document.getElementById("site-title").value = data.settings.siteTitle;
    document.getElementById("hero-heading").value = data.settings.heroHeading;
    document.getElementById("hero-sub").value = data.settings.heroSub;
    document.getElementById("contact-email").value = data.settings.contactEmail;
    document.getElementById("contact-phone").value = data.settings.contactPhone;
    if(data.settings.logoUrl && data.settings.logoUrl.startsWith('data:image')) {
       document.getElementById("logo-preview").src = data.settings.logoUrl;
       document.getElementById("logo-preview").style.display = "block";
    } else {
       document.getElementById("logo-preview").src = "logo.png";
       document.getElementById("logo-preview").style.display = "block";
    }

    // Projects
    renderProjects(data.projects);

    // Stats
    renderStats(data.stats);
  }

  // Save General Settings
  document.getElementById("save-general").addEventListener("click", () => {
    const data = getData();
    data.settings.siteTitle = document.getElementById("site-title").value;
    data.settings.heroHeading = document.getElementById("hero-heading").value;
    data.settings.heroSub = document.getElementById("hero-sub").value;
    data.settings.contactEmail = document.getElementById("contact-email").value;
    data.settings.contactPhone = document.getElementById("contact-phone").value;

    const logoInput = document.getElementById("logo-upload");
    if (logoInput.files && logoInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function(e) {
        data.settings.logoUrl = e.target.result;
        saveData(data);
        alert("Settings and Logo Saved!");
        loadAdminData();
      };
      reader.readAsDataURL(logoInput.files[0]);
    } else {
      saveData(data);
      alert("Settings Saved!");
    }
  });

  // Render Projects
  function renderProjects(projects) {
    const list = document.getElementById("projects-list");
    list.innerHTML = "";
    projects.forEach((p, index) => {
      list.innerHTML += `
        <div class="admin-list-item">
          <div class="list-content">
            <strong>${p.title}</strong>
            <small style="color:var(--muted)">${p.meta} - ${p.type}</small>
          </div>
          <button class="delete-btn" onclick="deleteProject(${index})">Delete</button>
        </div>
      `;
    });
  }

  // Add Project
  document.getElementById("add-project").addEventListener("click", () => {
    const type = document.getElementById("proj-type").value;
    const meta = document.getElementById("proj-meta").value;
    const title = document.getElementById("proj-title").value;
    const desc = document.getElementById("proj-desc").value;

    if (!type || !meta || !title || !desc) {
      alert("Please fill all fields to add a project.");
      return;
    }

    const data = getData();
    data.projects.push({ type, meta, title, desc });
    saveData(data);
    
    // reset form
    document.getElementById("proj-type").value = "";
    document.getElementById("proj-meta").value = "";
    document.getElementById("proj-title").value = "";
    document.getElementById("proj-desc").value = "";
    
    renderProjects(data.projects);
  });

  // Delete Project (expose to window for inline onclick)
  window.deleteProject = function(index) {
    if(confirm("Are you sure you want to delete this project?")) {
      const data = getData();
      data.projects.splice(index, 1);
      saveData(data);
      renderProjects(data.projects);
    }
  };

  // Render Stats
  function renderStats(stats) {
    const list = document.getElementById("stats-list");
    list.innerHTML = "";
    stats.forEach((s, index) => {
      list.innerHTML += `
        <div class="form-group" style="flex-direction: row; align-items: center; gap: 15px;">
          <input type="text" id="stat-label-${index}" class="admin-input" value="${s.label}" style="flex:2">
          <input type="number" id="stat-count-${index}" class="admin-input" value="${s.count}" style="flex:1">
        </div>
      `;
    });
  }

  // Save Stats
  document.getElementById("save-stats").addEventListener("click", () => {
    const data = getData();
    data.stats.forEach((s, index) => {
      s.label = document.getElementById(`stat-label-${index}`).value;
      s.count = parseInt(document.getElementById(`stat-count-${index}`).value) || 0;
    });
    saveData(data);
    alert("Stats Saved!");
  });
});
