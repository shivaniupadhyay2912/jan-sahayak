// Run this once: node fix.js
// It will create the correct server.js in the same folder

const fs = require('fs');
const path = require('path');

const HTML = `<!DOCTYPE html>
<html lang="hi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Jan Sahayak – जन सहायक | AI Citizen Assistant</title>
<link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700;800&family=Noto+Sans+Devanagari:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
:root {
  --saffron: #FF6B1A; --deep-saffron: #E8510A;
  --green: #138808; --deep-green: #0D6B06;
  --navy: #000080; --bg: #FFF8F0;
  --card: #FFFFFF; --text: #1A1A2E;
  --muted: #6B6B8A; --border: rgba(255,107,26,0.15);
  --shadow: 0 8px 40px rgba(255,107,26,0.12);
  --red: #E53E3E;
}
* { margin:0; padding:0; box-sizing:border-box; }
html { scroll-behavior:smooth; }
body { font-family:'Baloo 2','Noto Sans Devanagari',sans-serif; background:var(--bg); color:var(--text); overflow-x:hidden; }
nav {
  position:fixed; top:0; left:0; right:0; z-index:200;
  display:flex; align-items:center; justify-content:space-between;
  padding:0 5%; height:64px;
  background:rgba(255,248,240,0.95); backdrop-filter:blur(16px);
  border-bottom:1px solid var(--border);
}
.nav-logo { display:flex; align-items:center; gap:10px; text-decoration:none; cursor:pointer; }
.nav-logo-text { font-size:1.3rem; font-weight:800; color:var(--saffron); }
.nav-logo-sub { font-size:0.75rem; font-weight:600; color:var(--navy); }
.flag-stripe { width:4px; height:36px; border-radius:2px; background:linear-gradient(to bottom, var(--saffron) 33%, white 33%, white 66%, var(--green) 66%); }
.nav-links { display:flex; gap:28px; list-style:none; }
.nav-links a { text-decoration:none; font-size:0.9rem; font-weight:600; color:var(--text); transition:color 0.2s; cursor:pointer; }
.nav-links a:hover { color:var(--saffron); }
.nav-right { display:flex; gap:10px; align-items:center; }
.btn-login { background:transparent; border:2px solid var(--saffron); color:var(--saffron); padding:8px 20px; border-radius:50px; font-family:inherit; font-weight:700; font-size:0.88rem; cursor:pointer; transition:all 0.2s; }
.btn-login:hover { background:var(--saffron); color:white; }
.btn-register { background:var(--saffron); color:white; border:none; padding:10px 22px; border-radius:50px; font-family:inherit; font-weight:700; font-size:0.88rem; cursor:pointer; transition:all 0.3s; box-shadow:0 4px 16px rgba(255,107,26,0.35); }
.btn-register:hover { background:var(--deep-saffron); transform:translateY(-1px); }
.user-menu { display:none; align-items:center; gap:10px; }
.user-avatar { width:36px; height:36px; border-radius:50%; background:linear-gradient(135deg,var(--saffron),var(--deep-saffron)); display:flex; align-items:center; justify-content:center; color:white; font-weight:800; font-size:0.9rem; }
.user-name { font-weight:700; font-size:0.9rem; }
.btn-logout { background:var(--bg); border:1.5px solid var(--border); color:var(--muted); padding:7px 16px; border-radius:50px; font-family:inherit; font-weight:600; font-size:0.82rem; cursor:pointer; transition:all 0.2s; }
.btn-logout:hover { border-color:var(--red); color:var(--red); }
.modal-overlay { display:none; position:fixed; inset:0; z-index:500; background:rgba(0,0,0,0.55); backdrop-filter:blur(6px); align-items:center; justify-content:center; padding:20px; }
.modal-overlay.active { display:flex; }
.modal { background:white; border-radius:24px; padding:40px; width:100%; max-width:460px; position:relative; animation:modalIn 0.3s cubic-bezier(0.34,1.56,0.64,1) both; box-shadow:0 24px 60px rgba(0,0,0,0.2); }
@keyframes modalIn { from { opacity:0; transform:scale(0.85) translateY(20px); } to { opacity:1; transform:none; } }
.modal-close { position:absolute; top:16px; right:18px; background:none; border:none; font-size:1.4rem; cursor:pointer; color:var(--muted); }
.modal-logo { text-align:center; margin-bottom:24px; }
.modal-logo .icon { font-size:2.5rem; margin-bottom:8px; }
.modal-logo h2 { font-size:1.5rem; font-weight:800; }
.modal-logo p { color:var(--muted); font-size:0.88rem; margin-top:4px; }
.modal-tabs { display:flex; background:var(--bg); border-radius:12px; padding:4px; margin-bottom:24px; }
.modal-tab { flex:1; padding:9px; text-align:center; border-radius:9px; font-weight:700; font-size:0.88rem; cursor:pointer; transition:all 0.2s; color:var(--muted); border:none; background:transparent; font-family:inherit; }
.modal-tab.active { background:white; color:var(--saffron); box-shadow:0 2px 8px rgba(0,0,0,0.08); }
.form-group { margin-bottom:14px; }
.form-group label { display:block; font-size:0.8rem; font-weight:700; color:var(--text); margin-bottom:5px; }
.form-group input, .form-group select { width:100%; padding:11px 14px; border:1.5px solid var(--border); border-radius:10px; font-family:inherit; font-size:0.9rem; color:var(--text); background:var(--bg); transition:border-color 0.2s; outline:none; }
.form-group input:focus, .form-group select:focus { border-color:var(--saffron); }
.form-row-2 { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
.auth-btn { width:100%; padding:13px; margin-top:4px; background:linear-gradient(135deg,var(--saffron),var(--deep-saffron)); color:white; border:none; border-radius:12px; font-family:inherit; font-weight:800; font-size:1rem; cursor:pointer; transition:all 0.3s; box-shadow:0 6px 20px rgba(255,107,26,0.35); }
.auth-btn:disabled { opacity:0.6; cursor:not-allowed; }
.error-msg { background:rgba(229,62,62,0.08); border:1px solid rgba(229,62,62,0.2); border-radius:8px; padding:10px 14px; font-size:0.82rem; color:var(--red); margin-bottom:12px; display:none; }
.error-msg.visible { display:block; }
.success-msg { background:rgba(19,136,8,0.08); border:1px solid rgba(19,136,8,0.2); border-radius:8px; padding:10px 14px; font-size:0.82rem; color:var(--green); margin-bottom:12px; display:none; }
.success-msg.visible { display:block; }
.hero { min-height:100vh; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; padding:100px 5% 60px; position:relative; overflow:hidden; }
.hero-bg { position:absolute; inset:0; z-index:0; background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,107,26,0.12) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 90% 80%, rgba(19,136,8,0.08) 0%, transparent 60%); }
.hero-ashoka { position:absolute; opacity:0.04; font-size:420px; top:50%; left:50%; transform:translate(-50%,-50%); user-select:none; pointer-events:none; animation:slowSpin 60s linear infinite; }
@keyframes slowSpin { to { transform:translate(-50%,-50%) rotate(360deg); } }
.hero-badge { display:inline-flex; align-items:center; gap:8px; background:rgba(255,107,26,0.1); border:1px solid rgba(255,107,26,0.25); border-radius:50px; padding:6px 18px; font-size:0.8rem; font-weight:600; color:var(--saffron); margin-bottom:24px; }
.hero-title { font-size:clamp(2.8rem,7vw,5.5rem); font-weight:800; line-height:1.05; position:relative; z-index:1; }
.hero-title .highlight { background:linear-gradient(135deg,var(--saffron),var(--deep-saffron)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
.hero-title .hindi-title { display:block; font-size:0.55em; font-family:'Noto Sans Devanagari',sans-serif; color:var(--navy); -webkit-text-fill-color:var(--navy); margin-top:4px; }
.hero-sub { font-size:1.1rem; color:var(--muted); max-width:580px; margin:20px auto 36px; line-height:1.7; }
.hero-btns { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; position:relative; z-index:1; }
.btn-primary { background:linear-gradient(135deg,var(--saffron),var(--deep-saffron)); color:white; border:none; padding:14px 32px; border-radius:50px; font-family:inherit; font-weight:700; font-size:1rem; cursor:pointer; transition:all 0.3s; box-shadow:0 6px 24px rgba(255,107,26,0.4); }
.btn-secondary { background:white; color:var(--text); border:2px solid var(--border); padding:14px 32px; border-radius:50px; font-family:inherit; font-weight:700; font-size:1rem; cursor:pointer; transition:all 0.3s; }
.hero-stats { display:flex; gap:48px; justify-content:center; margin-top:56px; flex-wrap:wrap; }
.stat { text-align:center; }
.stat-num { font-size:2rem; font-weight:800; color:var(--saffron); }
.stat-label { font-size:0.8rem; color:var(--muted); font-weight:500; }
.tricolor-bar { width:100%; height:5px; background:linear-gradient(to right, var(--saffron) 33.3%, white 33.3%, white 66.6%, var(--green) 66.6%); position:absolute; bottom:0; }
.dashboard { display:none; padding:100px 5% 60px; }
.dashboard.visible { display:block; }
.dash-welcome { background:linear-gradient(135deg,var(--saffron),var(--deep-saffron)); color:white; border-radius:20px; padding:28px 32px; margin-bottom:28px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:16px; }
.dash-welcome h2 { font-size:1.5rem; font-weight:800; }
.dash-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:18px; margin-bottom:32px; }
.dash-card { background:white; border-radius:16px; padding:24px; border:1px solid var(--border); }
.dash-card .dc-icon { font-size:2rem; margin-bottom:12px; }
.dash-card .dc-num { font-size:2rem; font-weight:800; color:var(--saffron); }
.dash-card .dc-label { font-size:0.85rem; color:var(--muted); margin-top:4px; }
.dash-section-title { font-size:1.1rem; font-weight:800; margin-bottom:16px; display:flex; align-items:center; gap:10px; }
.complaint-form-dash { background:white; border-radius:20px; padding:28px; border:1px solid var(--border); margin-bottom:28px; }
.complaint-types-dash { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:16px; }
.ct-btn { padding:8px 16px; border-radius:50px; border:1.5px solid var(--border); background:var(--bg); font-family:inherit; font-size:0.82rem; font-weight:600; cursor:pointer; transition:all 0.2s; }
.ct-btn.active { background:var(--saffron); border-color:var(--saffron); color:white; }
.form-input { width:100%; padding:11px 14px; border:1.5px solid var(--border); border-radius:10px; font-family:inherit; font-size:0.9rem; background:var(--bg); outline:none; transition:border-color 0.2s; margin-bottom:12px; }
.form-input:focus { border-color:var(--saffron); }
textarea.form-input { resize:vertical; min-height:90px; }
.submit-btn { background:linear-gradient(135deg,var(--green),var(--deep-green)); color:white; border:none; padding:12px 28px; border-radius:10px; font-family:inherit; font-weight:700; font-size:0.95rem; cursor:pointer; transition:all 0.3s; }
.my-complaints { background:white; border-radius:20px; padding:28px; border:1px solid var(--border); }
.complaint-item { border:1px solid var(--border); border-radius:12px; padding:16px; margin-bottom:12px; }
.complaint-header { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px; margin-bottom:8px; }
.complaint-id { font-family:'DM Mono',monospace; font-size:0.78rem; color:var(--muted); }
.status-badge { font-size:0.72rem; font-weight:700; padding:3px 10px; border-radius:50px; }
.status-Submitted { background:rgba(255,107,26,0.1); color:var(--saffron); }
.status-Resolved { background:rgba(19,136,8,0.1); color:var(--green); }
.complaint-desc { font-size:0.85rem; color:var(--text); line-height:1.5; }
.complaint-date { font-size:0.75rem; color:var(--muted); margin-top:6px; }
.empty-state { text-align:center; padding:40px; color:var(--muted); }
section { padding:80px 5%; }
.section-tag { display:inline-block; background:rgba(255,107,26,0.1); border:1px solid rgba(255,107,26,0.2); border-radius:50px; padding:4px 14px; font-size:0.75rem; font-weight:700; color:var(--saffron); letter-spacing:0.05em; text-transform:uppercase; margin-bottom:12px; }
.section-title { font-size:clamp(1.8rem,4vw,2.8rem); font-weight:800; margin-bottom:12px; }
.section-sub { color:var(--muted); font-size:1rem; max-width:520px; line-height:1.7; }
.features-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:24px; }
.feature-card { background:white; border-radius:20px; padding:32px; border:1px solid var(--border); transition:all 0.3s; }
.feature-card:hover { transform:translateY(-6px); box-shadow:var(--shadow); }
.feature-icon { width:54px; height:54px; border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:1.6rem; margin-bottom:18px; background:rgba(255,107,26,0.1); }
.feature-card h3 { font-size:1.1rem; font-weight:700; margin-bottom:8px; }
.feature-card p { color:var(--muted); font-size:0.88rem; line-height:1.65; }
.scheme-finder { background:white; border-radius:24px; padding:40px; border:1px solid var(--border); box-shadow:var(--shadow); max-width:700px; margin:0 auto; }
.scheme-finder h3 { font-size:1.2rem; font-weight:800; margin-bottom:6px; }
.scheme-finder .sub { color:var(--muted); font-size:0.88rem; margin-bottom:24px; }
.find-btn { width:100%; padding:13px; background:linear-gradient(135deg,var(--saffron),var(--deep-saffron)); color:white; border:none; border-radius:12px; font-family:inherit; font-size:1rem; font-weight:700; cursor:pointer; transition:all 0.3s; margin-top:8px; }
.scheme-results { margin-top:20px; display:none; }
.scheme-results.visible { display:block; }
.scheme-item-card { display:flex; align-items:flex-start; gap:14px; padding:14px; border-radius:12px; background:var(--bg); border:1px solid var(--border); margin-bottom:10px; }
.si-icon { font-size:1.5rem; flex-shrink:0; }
.si-info h4 { font-size:0.92rem; font-weight:700; margin-bottom:3px; }
.si-info p { font-size:0.8rem; color:var(--muted); line-height:1.5; }
.eligible-badge { display:inline-block; font-size:0.7rem; font-weight:700; background:rgba(19,136,8,0.1); color:var(--green); border-radius:50px; padding:2px 10px; margin-top:5px; }
.lang-grid { display:flex; flex-wrap:wrap; gap:10px; justify-content:center; margin-top:32px; }
.lang-chip { background:white; border:1.5px solid var(--border); border-radius:50px; padding:9px 20px; font-size:0.9rem; font-weight:600; color:var(--text); transition:all 0.3s; cursor:pointer; }
.lang-chip:hover,.lang-chip.active { border-color:var(--saffron); color:var(--saffron); }
.cta-section { background:linear-gradient(135deg,var(--saffron),var(--deep-saffron),#CC4400); color:white; text-align:center; padding:80px 5%; }
.cta-section h2 { font-size:clamp(1.8rem,4vw,3rem); font-weight:800; margin-bottom:12px; }
.cta-section p { opacity:0.85; font-size:1rem; margin-bottom:28px; }
.cta-btn-white { background:white; color:var(--saffron); border:none; padding:14px 32px; border-radius:50px; font-family:inherit; font-weight:800; font-size:1rem; cursor:pointer; }
footer { background:#0a0a1a; color:rgba(255,255,255,0.6); padding:40px 5% 24px; }
.footer-top { display:flex; justify-content:space-between; flex-wrap:wrap; gap:32px; margin-bottom:32px; }
.footer-brand .logo { font-size:1.3rem; font-weight:800; color:var(--saffron); margin-bottom:8px; }
.footer-brand p { font-size:0.82rem; line-height:1.6; max-width:240px; }
.footer-links h4 { color:white; font-size:0.85rem; font-weight:700; margin-bottom:12px; }
.footer-links ul { list-style:none; display:flex; flex-direction:column; gap:7px; }
.footer-links a { color:rgba(255,255,255,0.5); text-decoration:none; font-size:0.8rem; }
.footer-bottom { border-top:1px solid rgba(255,255,255,0.08); padding-top:18px; display:flex; justify-content:space-between; align-items:center; font-size:0.78rem; flex-wrap:wrap; gap:10px; }
.toast { position:fixed; bottom:24px; right:24px; z-index:999; background:#1A1A2E; color:white; padding:14px 20px; border-radius:12px; font-size:0.88rem; font-weight:600; display:none; box-shadow:0 8px 24px rgba(0,0,0,0.25); max-width:320px; }
.toast.show { display:flex; align-items:center; gap:10px; }
.toast.success { border-left:4px solid var(--green); }
.toast.error { border-left:4px solid var(--red); }
@keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:none; } }
.reveal { opacity:0; transform:translateY(32px); transition:opacity 0.6s ease,transform 0.6s ease; }
.reveal.visible { opacity:1; transform:none; }
@media(max-width:768px) { .nav-links { display:none; } .form-row-2 { grid-template-columns:1fr; } }
</style>
</head>
<body>
<div class="toast" id="toast"></div>
<div class="modal-overlay" id="authModal">
  <div class="modal">
    <button class="modal-close" onclick="closeModal()">✕</button>
    <div class="modal-logo"><div class="icon">🇮🇳</div><h2>Jan Sahayak</h2><p>जन सहायक – स्मार्ट नागरिक सहायक</p></div>
    <div class="modal-tabs">
      <button class="modal-tab active" onclick="switchTab('login')">Login / लॉगिन</button>
      <button class="modal-tab" onclick="switchTab('register')">Register / रजिस्टर</button>
    </div>
    <div id="loginForm">
      <div class="error-msg" id="loginError"></div>
      <div class="form-group"><label>Email / ईमेल</label><input type="email" id="loginEmail" placeholder="your@email.com"></div>
      <div class="form-group"><label>Password / पासवर्ड</label><input type="password" id="loginPass" placeholder="Enter password"></div>
      <button class="auth-btn" onclick="doLogin()" id="loginBtn">Login / लॉगिन करें</button>
    </div>
    <div id="registerForm" style="display:none;">
      <div class="error-msg" id="registerError"></div>
      <div class="form-row-2">
        <div class="form-group"><label>Full Name / नाम</label><input type="text" id="regName" placeholder="Ramesh Kumar"></div>
        <div class="form-group"><label>Phone / मोबाइल</label><input type="tel" id="regPhone" placeholder="9876543210"></div>
      </div>
      <div class="form-group"><label>Email / ईमेल</label><input type="email" id="regEmail" placeholder="your@email.com"></div>
      <div class="form-row-2">
        <div class="form-group"><label>State / राज्य</label>
          <select id="regState"><option value="">Select State</option><option>Uttar Pradesh</option><option>Maharashtra</option><option>Bihar</option><option>Rajasthan</option><option>Gujarat</option><option>Tamil Nadu</option><option>Karnataka</option><option>Other</option></select>
        </div>
        <div class="form-group"><label>Occupation / पेशा</label>
          <select id="regOccupation"><option value="">Select</option><option value="farmer">Farmer / किसान</option><option value="student">Student / छात्र</option><option value="labourer">Labourer / मजदूर</option><option value="small-business">Business</option><option value="senior">Senior Citizen</option><option value="woman">Homemaker</option><option value="other">Other</option></select>
        </div>
      </div>
      <div class="form-group"><label>Password / पासवर्ड</label><input type="password" id="regPass" placeholder="Min 6 characters"></div>
      <button class="auth-btn" onclick="doRegister()" id="registerBtn">Create Account / खाता बनाएं</button>
    </div>
  </div>
</div>
<nav>
  <div class="nav-logo" onclick="showHome()">
    <div class="flag-stripe"></div>
    <div><div class="nav-logo-text">Jan Sahayak</div><div class="nav-logo-sub">जन सहायक</div></div>
  </div>
  <ul class="nav-links">
    <li><a onclick="scrollTo('features')">Features</a></li>
    <li><a onclick="scrollTo('schemes')">Schemes</a></li>
    <li><a onclick="scrollTo('languages')">Languages</a></li>
  </ul>
  <div class="nav-right">
    <div id="guestNav"><button class="btn-login" onclick="openModal('login')">Login</button><button class="btn-register" onclick="openModal('register')">Register Free</button></div>
    <div class="user-menu" id="userNav"><div class="user-avatar" id="userAvatar">R</div><span class="user-name" id="userNameNav"></span><button class="btn-logout" onclick="doLogout()">Logout</button></div>
  </div>
</nav>
<section class="hero" id="heroSection">
  <div class="hero-bg"></div>
  <div class="hero-ashoka">☸</div>
  <div class="hero-badge">🇮🇳 India's AI Citizen Assistant</div>
  <h1 class="hero-title"><span class="highlight">Jan Sahayak</span><span class="hindi-title">जन सहायक – स्मार्ट नागरिक सहायक</span></h1>
  <p class="hero-sub">Your AI-powered digital government helper. Find schemes, file complaints, and get services — in Hindi or your language.</p>
  <div class="hero-btns">
    <button class="btn-primary" onclick="openModal('register')">🚀 Get Started Free</button>
    <button class="btn-secondary" onclick="scrollTo('features')">Explore Features</button>
  </div>
  <div class="hero-stats">
    <div class="stat"><div class="stat-num" id="statUsers">0</div><div class="stat-label">Citizens Registered</div></div>
    <div class="stat"><div class="stat-num" id="statComplaints">0</div><div class="stat-label">Complaints Filed</div></div>
    <div class="stat"><div class="stat-num">22</div><div class="stat-label">Languages</div></div>
    <div class="stat"><div class="stat-num">500+</div><div class="stat-label">Govt Schemes</div></div>
  </div>
  <div class="tricolor-bar"></div>
</section>
<div class="dashboard" id="dashboard">
  <div class="dash-welcome">
    <div><h2>नमस्ते, <span id="dashName">User</span> जी! 🙏</h2><p>Welcome back to Jan Sahayak</p></div>
    <div style="text-align:right;"><div style="font-size:0.8rem;opacity:0.8;">Registered as</div><div style="font-size:1.1rem;font-weight:800;" id="dashOccupation">Citizen</div><div style="font-size:0.8rem;opacity:0.7;" id="dashState">India</div></div>
  </div>
  <div class="dash-grid">
    <div class="dash-card"><div class="dc-icon">📋</div><div class="dc-num" id="myComplaintCount">0</div><div class="dc-label">My Complaints Filed</div></div>
    <div class="dash-card"><div class="dc-icon">🎯</div><div class="dc-num" id="schemeCount">—</div><div class="dc-label">Eligible Schemes</div></div>
    <div class="dash-card"><div class="dc-icon">✅</div><div class="dc-num" id="resolvedCount">0</div><div class="dc-label">Complaints Resolved</div></div>
  </div>
  <div class="complaint-form-dash">
    <div class="dash-section-title">📢 File a New Complaint</div>
    <div class="error-msg" id="complaintError"></div>
    <div class="success-msg" id="complaintSuccess"></div>
    <div style="margin-bottom:12px;"><label style="font-size:0.8rem;font-weight:700;display:block;margin-bottom:8px;">Issue Type</label>
      <div class="complaint-types-dash" id="ctypeBtns">
        <button class="ct-btn active" data-type="road" onclick="selectCType(this)">🛣️ Road</button>
        <button class="ct-btn" data-type="water" onclick="selectCType(this)">💧 Water</button>
        <button class="ct-btn" data-type="electricity" onclick="selectCType(this)">⚡ Electricity</button>
        <button class="ct-btn" data-type="sanitation" onclick="selectCType(this)">🧹 Sanitation</button>
        <button class="ct-btn" data-type="health" onclick="selectCType(this)">🏥 Health</button>
        <button class="ct-btn" data-type="other" onclick="selectCType(this)">📝 Other</button>
      </div>
    </div>
    <input type="text" class="form-input" id="cLocation" placeholder="Location / स्थान">
    <textarea class="form-input" id="cDesc" placeholder="Describe the problem..."></textarea>
    <button class="submit-btn" onclick="fileComplaint()">✅ Submit Complaint</button>
  </div>
  <div class="my-complaints">
    <div class="dash-section-title">📋 My Complaints <button onclick="loadMyComplaints()" style="background:none;border:none;color:var(--saffron);cursor:pointer;font-size:0.8rem;font-weight:700;">↻ Refresh</button></div>
    <div id="complaintsList"><div class="empty-state"><p>No complaints yet.</p></div></div>
  </div>
</div>
<section id="features">
  <div style="margin-bottom:40px;"><div class="section-tag">Key Features</div><h2 class="section-title">Everything a Citizen Needs</h2></div>
  <div class="features-grid">
    <div class="feature-card"><div class="feature-icon">🎯</div><h3>AI Scheme Finder</h3><p>Enter age, occupation & income. Get every scheme you qualify for instantly.</p></div>
    <div class="feature-card"><div class="feature-icon">🎤</div><h3>Voice Assistant</h3><p>Ask in Hindi, Tamil, Bengali or any of 22 languages and get instant answers.</p></div>
    <div class="feature-card"><div class="feature-icon">📢</div><h3>Complaint System</h3><p>Report road damage, water issues, electricity problems with tracking ID.</p></div>
    <div class="feature-card"><div class="feature-icon">📍</div><h3>Nearby Services</h3><p>Find hospitals, ration shops, and government offices near you.</p></div>
  </div>
</section>
<section id="schemes" style="background:linear-gradient(135deg,#FFF8F0,#F0F8FF);">
  <div style="text-align:center;margin-bottom:36px;"><div class="section-tag">Try It Now</div><h2 class="section-title">Find Your Eligible Schemes</h2></div>
  <div class="scheme-finder">
    <h3>🎯 AI Scheme Finder</h3><p class="sub">Fill details to discover eligible government schemes</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px;">
      <div class="form-group"><label>Occupation / पेशा</label>
        <select id="sfOccupation" style="width:100%;padding:11px 14px;border:1.5px solid var(--border);border-radius:10px;font-family:inherit;font-size:0.9rem;background:var(--bg);outline:none;">
          <option value="">Select occupation</option><option value="farmer">Farmer / किसान</option><option value="student">Student / छात्र</option><option value="labourer">Labourer / मजदूर</option><option value="small-business">Small Business</option><option value="senior">Senior Citizen</option><option value="woman">Homemaker</option>
        </select>
      </div>
      <div class="form-group"><label>State / राज्य</label>
        <select id="sfState" style="width:100%;padding:11px 14px;border:1.5px solid var(--border);border-radius:10px;font-family:inherit;font-size:0.9rem;background:var(--bg);outline:none;">
          <option value="">Select state</option><option>Uttar Pradesh</option><option>Maharashtra</option><option>Bihar</option><option>Gujarat</option><option>Tamil Nadu</option><option>Other</option>
        </select>
      </div>
    </div>
    <button class="find-btn" onclick="findSchemes()">🔍 Find My Schemes</button>
    <div class="scheme-results" id="schemeResults"></div>
  </div>
</section>
<section id="languages" style="text-align:center;">
  <div class="section-tag">Languages</div><h2 class="section-title">Works in 22 Indian Languages</h2>
  <div class="lang-grid">
    <div class="lang-chip active">हिंदी</div><div class="lang-chip">বাংলা</div><div class="lang-chip">தமிழ்</div>
    <div class="lang-chip">తెలుగు</div><div class="lang-chip">मराठी</div><div class="lang-chip">ગુજરાતી</div>
    <div class="lang-chip">ಕನ್ನಡ</div><div class="lang-chip">ਪੰਜਾਬੀ</div><div class="lang-chip">മലയാളം</div>
    <div class="lang-chip">ଓଡ଼ିଆ</div><div class="lang-chip">অসমীয়া</div><div class="lang-chip">English</div>
  </div>
</section>
<section class="cta-section">
  <h2>Join Lakhs of Citizens</h2><p>Register free and start using Jan Sahayak today.</p>
  <button class="cta-btn-white" onclick="openModal('register')">🚀 Register Free Now</button>
</section>
<footer>
  <div class="footer-top">
    <div class="footer-brand"><div class="logo">Jan Sahayak 🇮🇳</div><p>AI-powered citizen assistant for every Indian.</p></div>
    <div class="footer-links"><h4>Services</h4><ul><li><a href="#">Scheme Finder</a></li><li><a href="#">Complaints</a></li></ul></div>
  </div>
  <div class="footer-bottom"><p>© 2024 Jan Sahayak. Made with ❤️ for Bharat.</p><span style="color:rgba(255,255,255,0.4);">जय हिंद 🇮🇳</span></div>
</footer>
<script>
const API='http://localhost:3000/api';
let currentUser=null,selectedComplaintType='road',authToken=localStorage.getItem('js_token');
const schemeData={farmer:[{icon:'🌾',name:'PM-KISAN Samman Nidhi',desc:'Annual income support of ₹6,000 directly in your bank account.'},{icon:'💳',name:'Kisan Credit Card',desc:'Low-interest credit up to ₹3 lakh for agricultural needs.'},{icon:'🌧️',name:'PM Fasal Bima Yojana',desc:'Crop insurance against natural calamities.'},{icon:'🧪',name:'Soil Health Card',desc:'Free soil testing to improve farm productivity.'}],student:[{icon:'🎓',name:'National Scholarship Portal',desc:'Scholarships for pre-matric, post-matric studies.'},{icon:'📚',name:'PM Vidya Lakshmi',desc:'Education loans at subsidized rates.'},{icon:'💼',name:'PM Kaushal Vikas Yojana',desc:'Free skill training and certification.'}],labourer:[{icon:'🏗️',name:'MNREGA',desc:'100 days of guaranteed wage employment per year.'},{icon:'🏠',name:'PM Awas Yojana',desc:'Financial aid to build a pucca house.'},{icon:'🏥',name:'Ayushman Bharat',desc:'Free health coverage up to ₹5 lakh per year.'}],'small-business':[{icon:'💰',name:'PM Mudra Yojana',desc:'Collateral-free loans up to ₹10 lakh.'},{icon:'🏪',name:'PM Vishwakarma Yojana',desc:'Support for artisans with training and credit.'},{icon:'📊',name:'Stand-Up India',desc:'Bank loans for SC/ST and women entrepreneurs.'}],senior:[{icon:'👴',name:'Atal Pension Yojana',desc:'Guaranteed pension of ₹1,000–5,000/month after 60.'},{icon:'🏥',name:'Ayushman Bharat',desc:'Free health coverage up to ₹5 lakh per year.'}],woman:[{icon:'🤱',name:'PM Matru Vandana Yojana',desc:'Cash benefit of ₹5,000 for first live birth.'},{icon:'💰',name:'PM Mudra Yojana',desc:'Priority loans for women entrepreneurs.'},{icon:'🍳',name:'PM Ujjwala Yojana',desc:'Free LPG connection for BPL households.'}]};
window.onload=async()=>{loadStats();initReveal();document.querySelectorAll('.lang-chip').forEach(c=>c.addEventListener('click',()=>{document.querySelectorAll('.lang-chip').forEach(x=>x.classList.remove('active'));c.classList.add('active');}));if(authToken)await loadProfile();};
async function loadProfile(){try{const r=await fetch(API+'/auth/me',{headers:{Authorization:'Bearer '+authToken}});if(!r.ok){authToken=null;localStorage.removeItem('js_token');return;}const d=await r.json();setLoggedIn(d.user);}catch{}}
async function loadStats(){try{const r=await fetch(API+'/stats');const d=await r.json();animateNum('statUsers',d.totalUsers);animateNum('statComplaints',d.totalComplaints);}catch{}}
function animateNum(id,target){let cur=0;const el=document.getElementById(id);if(!el||target===0){if(el)el.textContent='0';return;}const step=Math.ceil(target/30);const t=setInterval(()=>{cur=Math.min(cur+step,target);el.textContent=cur;if(cur>=target)clearInterval(t);},40);}
function openModal(tab){document.getElementById('authModal').classList.add('active');switchTab(tab);}
function closeModal(){document.getElementById('authModal').classList.remove('active');}
document.getElementById('authModal').addEventListener('click',e=>{if(e.target===e.currentTarget)closeModal();});
function switchTab(tab){document.querySelectorAll('.modal-tab').forEach((t,i)=>t.classList.toggle('active',(i===0&&tab==='login')||(i===1&&tab==='register')));document.getElementById('loginForm').style.display=tab==='login'?'block':'none';document.getElementById('registerForm').style.display=tab==='register'?'block':'none';}
async function doLogin(){const email=document.getElementById('loginEmail').value.trim();const password=document.getElementById('loginPass').value;const errEl=document.getElementById('loginError');const btn=document.getElementById('loginBtn');errEl.classList.remove('visible');if(!email||!password){showErr(errEl,'Please fill all fields');return;}btn.disabled=true;btn.textContent='Logging in...';try{const r=await fetch(API+'/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})});const d=await r.json();if(!r.ok){showErr(errEl,d.error);btn.disabled=false;btn.textContent='Login / लॉगिन करें';return;}authToken=d.token;localStorage.setItem('js_token',authToken);setLoggedIn(d.user);closeModal();showToast('✅ Welcome back, '+d.user.name+'!','success');}catch{showErr(errEl,'Server not reachable');}btn.disabled=false;btn.textContent='Login / लॉगिन करें';}
async function doRegister(){const name=document.getElementById('regName').value.trim();const phone=document.getElementById('regPhone').value.trim();const email=document.getElementById('regEmail').value.trim();const state=document.getElementById('regState').value;const occupation=document.getElementById('regOccupation').value;const password=document.getElementById('regPass').value;const errEl=document.getElementById('registerError');const btn=document.getElementById('registerBtn');errEl.classList.remove('visible');if(!name||!email||!password){showErr(errEl,'Name, email and password required');return;}if(password.length<6){showErr(errEl,'Password must be 6+ characters');return;}btn.disabled=true;btn.textContent='Creating...';try{const r=await fetch(API+'/auth/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,phone,email,state,occupation,password})});const d=await r.json();if(!r.ok){showErr(errEl,d.error);btn.disabled=false;btn.textContent='Create Account / खाता बनाएं';return;}authToken=d.token;localStorage.setItem('js_token',authToken);setLoggedIn(d.user);closeModal();showToast('🎉 Welcome '+d.user.name+'!','success');}catch{showErr(errEl,'Server not reachable');}btn.disabled=false;btn.textContent='Create Account / खाता बनाएं';}
async function doLogout(){try{await fetch(API+'/auth/logout',{method:'POST',headers:{Authorization:'Bearer '+authToken}});}catch{}authToken=null;localStorage.removeItem('js_token');currentUser=null;setLoggedOut();showToast('👋 Logged out','success');}
function setLoggedIn(user){currentUser=user;document.getElementById('guestNav').style.display='none';document.getElementById('userNav').style.display='flex';document.getElementById('userAvatar').textContent=user.name.charAt(0).toUpperCase();document.getElementById('userNameNav').textContent=user.name.split(' ')[0];document.getElementById('heroSection').style.display='none';document.getElementById('dashboard').classList.add('visible');document.getElementById('dashName').textContent=user.name.split(' ')[0];document.getElementById('dashOccupation').textContent=user.occupation||'Citizen';document.getElementById('dashState').textContent=user.state||'India';document.getElementById('schemeCount').textContent=(schemeData[user.occupation]||[]).length||'—';loadMyComplaints();loadStats();window.scrollTo({top:0,behavior:'smooth'});}
function setLoggedOut(){document.getElementById('guestNav').style.display='flex';document.getElementById('userNav').style.display='none';document.getElementById('heroSection').style.display='flex';document.getElementById('dashboard').classList.remove('visible');loadStats();}
function selectCType(btn){document.querySelectorAll('.ct-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');selectedComplaintType=btn.dataset.type;}
async function fileComplaint(){const location=document.getElementById('cLocation').value.trim();const description=document.getElementById('cDesc').value.trim();const errEl=document.getElementById('complaintError');const sucEl=document.getElementById('complaintSuccess');errEl.classList.remove('visible');sucEl.classList.remove('visible');if(!description){showErr(errEl,'Please describe the problem');return;}try{const r=await fetch(API+'/complaints',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+authToken},body:JSON.stringify({type:selectedComplaintType,location,description})});const d=await r.json();if(!r.ok){showErr(errEl,d.error);return;}sucEl.textContent='✅ Filed! Tracking ID: '+d.complaint.trackingId;sucEl.classList.add('visible');document.getElementById('cDesc').value='';document.getElementById('cLocation').value='';showToast('✅ ID: '+d.complaint.trackingId,'success');loadMyComplaints();}catch{showErr(errEl,'Server not reachable');}}
async function loadMyComplaints(){if(!authToken)return;try{const r=await fetch(API+'/complaints/my',{headers:{Authorization:'Bearer '+authToken}});const d=await r.json();const list=d.complaints||[];document.getElementById('myComplaintCount').textContent=list.length;document.getElementById('resolvedCount').textContent=list.filter(c=>c.status==='Resolved').length;const el=document.getElementById('complaintsList');if(list.length===0){el.innerHTML='<div class="empty-state"><p>No complaints yet.</p></div>';return;}el.innerHTML=list.map(c=>'<div class="complaint-item"><div class="complaint-header"><div><span class="complaint-id">'+c.trackingId+'</span></div><span class="status-badge status-'+c.status.replace(' ','')+'">'+c.status+'</span></div><div class="complaint-desc">'+c.description+'</div><div class="complaint-date">'+new Date(c.createdAt).toLocaleString('en-IN')+'</div></div>').join('');}catch{document.getElementById('complaintsList').innerHTML='<div class="empty-state"><p>Could not load.</p></div>';}}
function findSchemes(){const occ=document.getElementById('sfOccupation').value;const resultsDiv=document.getElementById('schemeResults');if(!occ){showToast('Please select occupation','error');return;}const schemes=schemeData[occ]||[];resultsDiv.innerHTML='<h4 style="font-size:0.95rem;font-weight:700;margin-bottom:14px;color:var(--green);">✅ Found '+schemes.length+' schemes!</h4>'+schemes.map((s,i)=>'<div class="scheme-item-card" style="animation-delay:'+i*0.08+'s"><div class="si-icon">'+s.icon+'</div><div class="si-info"><h4>'+s.name+'</h4><p>'+s.desc+'</p><span class="eligible-badge">✓ Eligible</span></div></div>').join('');resultsDiv.classList.add('visible');resultsDiv.scrollIntoView({behavior:'smooth',block:'nearest'});}
function showErr(el,msg){el.textContent='⚠️ '+msg;el.classList.add('visible');}
function scrollTo(id){document.getElementById(id).scrollIntoView({behavior:'smooth'});}
function showHome(){if(!currentUser)window.scrollTo({top:0,behavior:'smooth'});}
function showToast(msg,type='success'){const t=document.getElementById('toast');t.textContent=msg;t.className='toast show '+type;setTimeout(()=>t.classList.remove('show'),4000);}
function initReveal(){const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});},{threshold:0.1});document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));}
</script>
</body>
</html>`;

const serverCode = `const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const url = require('url');

const PORT = 3000;
const DB_FILE = path.join(__dirname, 'data', 'db.json');

function loadDB() {
  if (!fs.existsSync(DB_FILE)) {
    const init = { users: [], complaints: [], sessions: [] };
    fs.writeFileSync(DB_FILE, JSON.stringify(init, null, 2));
    return init;
  }
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}
function saveDB(db) { fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2)); }
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return salt + ':' + hash;
}
function verifyPassword(password, stored) {
  const [salt, hash] = stored.split(':');
  const verify = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return verify === hash;
}
function generateToken() { return crypto.randomBytes(32).toString('hex'); }
function generateComplaintId() {
  return 'JS-' + new Date().getFullYear() + '-' + crypto.randomBytes(3).toString('hex').toUpperCase();
}
function getUser(req) {
  const token = (req.headers['authorization'] || '').replace('Bearer ', '').trim();
  if (!token) return null;
  const db = loadDB();
  const session = db.sessions.find(s => s.token === token);
  if (!session) return null;
  return db.users.find(u => u.id === session.userId) || null;
}
function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => { try { resolve(body ? JSON.parse(body) : {}); } catch { resolve({}); } });
  });
}
function json(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type, Authorization', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS' });
  res.end(JSON.stringify(data));
}
async function handleAPI(req, res, pathname) {
  if (pathname === '/api/auth/register' && req.method === 'POST') {
    const body = await parseBody(req);
    const { name, email, phone, password, state, occupation } = body;
    if (!name || !email || !password) return json(res, 400, { error: 'Name, email and password required' });
    const db = loadDB();
    if (db.users.find(u => u.email === email)) return json(res, 409, { error: 'Email already registered' });
    const user = { id: crypto.randomUUID(), name, email, phone: phone||'', state: state||'', occupation: occupation||'', passwordHash: hashPassword(password), createdAt: new Date().toISOString(), role: 'citizen' };
    db.users.push(user); saveDB(db);
    const token = generateToken();
    db.sessions.push({ token, userId: user.id, createdAt: new Date().toISOString() }); saveDB(db);
    return json(res, 201, { message: 'Registration successful', token, user: { id: user.id, name: user.name, email: user.email, state: user.state, occupation: user.occupation } });
  }
  if (pathname === '/api/auth/login' && req.method === 'POST') {
    const body = await parseBody(req);
    const { email, password } = body;
    if (!email || !password) return json(res, 400, { error: 'Email and password required' });
    const db = loadDB();
    const user = db.users.find(u => u.email === email);
    if (!user || !verifyPassword(password, user.passwordHash)) return json(res, 401, { error: 'Invalid email or password' });
    const token = generateToken();
    db.sessions.push({ token, userId: user.id, createdAt: new Date().toISOString() }); saveDB(db);
    return json(res, 200, { message: 'Login successful', token, user: { id: user.id, name: user.name, email: user.email, state: user.state, occupation: user.occupation } });
  }
  if (pathname === '/api/auth/logout' && req.method === 'POST') {
    const token = (req.headers['authorization'] || '').replace('Bearer ', '').trim();
    const db = loadDB(); db.sessions = db.sessions.filter(s => s.token !== token); saveDB(db);
    return json(res, 200, { message: 'Logged out' });
  }
  if (pathname === '/api/auth/me' && req.method === 'GET') {
    const user = getUser(req);
    if (!user) return json(res, 401, { error: 'Not authenticated' });
    return json(res, 200, { user: { id: user.id, name: user.name, email: user.email, phone: user.phone, state: user.state, occupation: user.occupation, createdAt: user.createdAt } });
  }
  if (pathname === '/api/complaints' && req.method === 'POST') {
    const user = getUser(req);
    if (!user) return json(res, 401, { error: 'Please login to file a complaint' });
    const body = await parseBody(req);
    const { type, location, description } = body;
    if (!type || !description) return json(res, 400, { error: 'Type and description required' });
    const db = loadDB();
    const complaint = { id: crypto.randomUUID(), trackingId: generateComplaintId(), userId: user.id, userName: user.name, type, location: location||'', description, status: 'Submitted', createdAt: new Date().toISOString() };
    db.complaints.push(complaint); saveDB(db);
    return json(res, 201, { message: 'Complaint filed', complaint });
  }
  if (pathname === '/api/complaints/my' && req.method === 'GET') {
    const user = getUser(req);
    if (!user) return json(res, 401, { error: 'Not authenticated' });
    const db = loadDB();
    const myComplaints = db.complaints.filter(c => c.userId === user.id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return json(res, 200, { complaints: myComplaints });
  }
  if (pathname === '/api/stats' && req.method === 'GET') {
    const db = loadDB();
    return json(res, 200, { totalUsers: db.users.length, totalComplaints: db.complaints.length });
  }
  return json(res, 404, { error: 'Not found' });
}
const server = http.createServer(async (req, res) => {
  const pathname = require('url').parse(req.url).pathname;
  if (req.method === 'OPTIONS') {
    res.writeHead(204, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type, Authorization', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS' });
    return res.end();
  }
  if (pathname.startsWith('/api/')) return handleAPI(req, res, pathname);
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(HTML);
});
server.listen(3000, () => {
  console.log('\\n✅ Jan Sahayak running at http://localhost:3000');
  console.log('📦 Database: ' + DB_FILE + '\\n');
});`;

const fullFile = 'const HTML = ' + JSON.stringify(HTML) + ';\n\n' + serverCode;
fs.writeFileSync(path.join(__dirname, 'server.js'), fullFile);
console.log('✅ server.js created successfully! Now run: node server.js');
