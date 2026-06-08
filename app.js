/* ═══════════════════════════════════════════════════════════
   LexQR — Agenda Legal · app.js v2
   Módulos: Expedientes, Agenda, Clientes, Documentos,
            RPP, Catastro, Reg. Civil, SAT, Notaría,
            Honorarios, Gastos/Pagos, Estadísticas
════════════════════════════════════════════════════════════ */

// ══════════════════════ DATOS DEMO ═══════════════════════
const EXPEDIENTES_DEMO = [
  { id:'1042/2024', cliente:'Torres Villanueva, Marco A.', materia:'civil',     titulo:'Torres vs. Constructora del Caribe', juzgado:'3° Civil, Cancún',         estatus:'activo',    proxActo:'Audiencia 5 Jun', color:'#22d3ee' },
  { id:'0956/2024', cliente:'Rodríguez Ek, Patricia',     materia:'familiar',   titulo:'Divorcio Incausado Rodríguez',       juzgado:'1° Familiar, Playa del Carmen',estatus:'activo',   proxActo:'Audiencia 5 Jun', color:'#a78bfa' },
  { id:'A-234/2024',cliente:'Pérez Canul, Sergio',        materia:'amparo',     titulo:'Amparo Directo — Pérez',             juzgado:'Tribunal Colegiado, Cancún',  estatus:'activo',    proxActo:'Audiencia 5 Jun', color:'#fbbf24' },
  { id:'0891/2024', cliente:'Ramírez Balam, Lourdes',     materia:'mercantil',  titulo:'Cobro de Pesos Ramírez vs. Tienda', juzgado:'Juzgado Mercantil, Cancún',   estatus:'sentencia', proxActo:'Ejecución 10 Jun',color:'#34d399' },
  { id:'0774/2024', cliente:'Hernández Chi, Juan',        materia:'penal',      titulo:'Hernández — Fraude Procesal',        juzgado:'3° Penal, Chetumal',          estatus:'apelacion', proxActo:'Alegatos 15 Jun', color:'#f472b6' },
  { id:'0623/2024', cliente:'Dzul Poot, Armando',         materia:'civil',      titulo:'Dzul vs. Arrendadora QRoo',          juzgado:'1° Civil, Chetumal',          estatus:'activo',    proxActo:'Desahogo 18 Jun', color:'#22d3ee' },
  { id:'0511/2024', cliente:'López Caamal, Rosa',         materia:'familiar',   titulo:'Guarda y Custodia López',            juzgado:'2° Familiar, Cancún',         estatus:'activo',    proxActo:'Mediación 20 Jun',color:'#a78bfa' },
  { id:'0399/2023', cliente:'Castillo Mena, Alberto',     materia:'mercantil',  titulo:'Castillo vs. Banco del Sur',         juzgado:'Mercantil, Playa del Carmen', estatus:'suspendido',proxActo:'Pendiente',       color:'#34d399' },
];

const CLIENTES_DEMO = [
  { nombre:'Torres Villanueva, Marco A.',  tel:'998-123-4567', correo:'m.torres@email.com',  exp:2, color:'#22d3ee' },
  { nombre:'Rodríguez Ek, Patricia',       tel:'984-987-6543', correo:'p.rodriguez@email.com',exp:1, color:'#a78bfa' },
  { nombre:'Pérez Canul, Sergio',          tel:'998-555-1212', correo:'s.perez@email.com',    exp:1, color:'#fbbf24' },
  { nombre:'Ramírez Balam, Lourdes',       tel:'998-222-3333', correo:'l.ramirez@email.com',  exp:3, color:'#f472b6' },
  { nombre:'Hernández Chi, Juan',          tel:'983-444-5555', correo:'j.hernandez@email.com',exp:1, color:'#34d399' },
  { nombre:'Dzul Poot, Armando',           tel:'983-666-7777', correo:'a.dzul@email.com',     exp:1, color:'#22d3ee' },
  { nombre:'López Caamal, Rosa',           tel:'998-888-9999', correo:'r.lopez@email.com',    exp:2, color:'#a78bfa' },
  { nombre:'Castillo Mena, Alberto',       tel:'984-111-2222', correo:'a.castillo@email.com', exp:1, color:'#fbbf24' },
];

const DOCUMENTOS_DEMO = [
  { tipo:'📄', titulo:'Demanda Civil — Torres vs. Constructora', exp:'1042/2024', fecha:'2024-06-01', vence:'2024-06-10', estado:'urgente' },
  { tipo:'📋', titulo:'Acta de Audiencia — Rodríguez Divorcio',  exp:'0956/2024', fecha:'2024-05-28', vence:'2024-07-01', estado:'ok' },
  { tipo:'📑', titulo:'Amparo Directo — Escrito Inicial Pérez',  exp:'A-234/2024',fecha:'2024-05-20', vence:'2024-06-20', estado:'pendiente' },
  { tipo:'📃', titulo:'Convenio de Pago — Ramírez vs. Tienda',   exp:'0891/2024', fecha:'2024-05-15', vence:'2024-06-30', estado:'ok' },
  { tipo:'📝', titulo:'Escrito de Alegatos — Hernández',         exp:'0774/2024', fecha:'2024-06-02', vence:'2024-06-15', estado:'urgente' },
  { tipo:'📜', titulo:'Contrato de Arrendamiento — Dzul',        exp:'0623/2024', fecha:'2024-04-10', vence:'2024-08-01', estado:'ok' },
];

const AUDIENCIAS_PROX = [
  { fecha:'Jun 12', titulo:'Desahogo de Pruebas — Dzul', meta:'Exp. 0623/2024 · 10:00h · Chetumal', tipo:'civil' },
  { fecha:'Jun 15', titulo:'Alegatos — Hernández Chi', meta:'Exp. 0774/2024 · 09:00h · Chetumal', tipo:'penal' },
  { fecha:'Jun 18', titulo:'Resolución Final — Rodríguez', meta:'Exp. 0956/2024 · 11:30h · Playa', tipo:'familiar' },
  { fecha:'Jun 20', titulo:'Mediación — López Caamal', meta:'Exp. 0511/2024 · 12:00h · Cancún', tipo:'familiar' },
  { fecha:'Jun 25', titulo:'Audiencia Oral — Torres Civil', meta:'Exp. 1042/2024 · 10:00h · Cancún', tipo:'civil' },
];

const EVENTOS_CAL = {
  5:  [{ texto:'Torres 10:00', tipo:'civil'    }, { texto:'Rodríguez 12:30', tipo:'familiar' }, { texto:'Pérez 16:00', tipo:'amparo' }],
  12: [{ texto:'Dzul 10:00', tipo:'civil'      }],
  15: [{ texto:'Hernández 09:00', tipo:'penal' }],
  18: [{ texto:'Rodríguez 11:30', tipo:'familiar' }],
  20: [{ texto:'López 12:00', tipo:'familiar'  }],
  25: [{ texto:'Torres 10:00', tipo:'civil'    }],
};

// ── TRAMITES GUBERNAMENTALES ──────────────────────────────
const TRAMITES_DEMO = {
  rpp: [
    { id:'RPP-001', cliente:'Torres Villanueva, Marco A.', tipo:'Inscripción de escritura', folio:'QR-2024-18741', fecha_ingreso:'2024-05-10', fecha_vence:'2024-06-08', estatus:'urgente',    monto:2800, notas:'Requiere pago de derechos previo' },
    { id:'RPP-002', cliente:'Dzul Poot, Armando',          tipo:'Cancelación de hipoteca',  folio:'QR-2024-19205', fecha_ingreso:'2024-05-20', fecha_vence:'2024-07-01', estatus:'en_tramite', monto:1500, notas:'En revisión documental' },
    { id:'RPP-003', cliente:'Castillo Mena, Alberto',      tipo:'Búsqueda de antecedentes', folio:'QR-2024-20100', fecha_ingreso:'2024-06-01', fecha_vence:'2024-06-15', estatus:'en_tramite', monto:600,  notas:'Folio real pendiente de emitir' },
    { id:'RPP-004', cliente:'Ramírez Balam, Lourdes',      tipo:'Inscripción de embargo',   folio:'QR-2024-17890', fecha_ingreso:'2024-04-15', fecha_vence:'2024-05-20', estatus:'concluido',  monto:1200, notas:'Inscrito correctamente' },
  ],
  catastro: [
    { id:'CAT-001', cliente:'Torres Villanueva, Marco A.', tipo:'Avalúo catastral',          folio:'CAT-QR-3341', fecha_ingreso:'2024-05-12', fecha_vence:'2024-06-12', estatus:'en_tramite', monto:3500, notas:'Pendiente visita de perito' },
    { id:'CAT-002', cliente:'López Caamal, Rosa',          tipo:'Cédula catastral',           folio:'CAT-QR-3198', fecha_ingreso:'2024-05-28', fecha_vence:'2024-06-28', estatus:'en_tramite', monto:800,  notas:'En proceso de digitalización' },
    { id:'CAT-003', cliente:'Hernández Chi, Juan',         tipo:'Actualización de valor',     folio:'CAT-QR-2987', fecha_ingreso:'2024-04-01', fecha_vence:'2024-05-10', estatus:'concluido',  monto:450,  notas:'Actualizado al ejercicio 2024' },
  ],
  regcivil: [
    { id:'RC-001', cliente:'Rodríguez Ek, Patricia',      tipo:'Acta de divorcio',           folio:'RC-PDCH-1042', fecha_ingreso:'2024-05-15', fecha_vence:'2024-06-15', estatus:'en_tramite', monto:1200, notas:'Juicio de divorcio incausado concluido' },
    { id:'RC-002', cliente:'López Caamal, Rosa',           tipo:'Reconocimiento de paternidad',folio:'RC-CUN-0877', fecha_ingreso:'2024-05-22', fecha_vence:'2024-06-22', estatus:'en_tramite', monto:800,  notas:'Requiere prueba de ADN' },
    { id:'RC-003', cliente:'Pérez Canul, Sergio',          tipo:'Rectificación de acta',      folio:'RC-CUN-0901', fecha_ingreso:'2024-06-01', fecha_vence:'2024-06-30', estatus:'urgente',    monto:600,  notas:'Error en fecha de nacimiento' },
    { id:'RC-004', cliente:'Castillo Mena, Alberto',       tipo:'Acta de defunción',          folio:'RC-CHTM-0512',fecha_ingreso:'2024-04-10', fecha_vence:'2024-05-05', estatus:'concluido',  monto:400,  notas:'Registrado en Chetumal' },
  ],
  sat: [
    { id:'SAT-001', cliente:'Dzul Poot, Armando',          tipo:'Obtención de RFC',           folio:'RFC-DPOA-880605', fecha_ingreso:'2024-05-25', fecha_vence:'2024-06-10', estatus:'urgente',    monto:0,    notas:'Apoyo para apertura de empresa' },
    { id:'SAT-002', cliente:'Ramírez Balam, Lourdes',      tipo:'Renovación e.firma',         folio:'EFIRMA-2024-LRB', fecha_ingreso:'2024-05-18', fecha_vence:'2024-06-18', estatus:'en_tramite', monto:0,    notas:'Cita SAT agendada Jun 10' },
    { id:'SAT-003', cliente:'Torres Villanueva, Marco A.', tipo:'Declaración anual',           folio:'DA-2023-MTV-001', fecha_ingreso:'2024-04-01', fecha_vence:'2024-04-30', estatus:'concluido',  monto:4200, notas:'ISR anual presentado sin diferencias' },
    { id:'SAT-004', cliente:'Hernández Chi, Juan',         tipo:'Devolución de impuestos',    folio:'DEV-2024-HCJ-11', fecha_ingreso:'2024-05-05', fecha_vence:'2024-07-05', estatus:'en_tramite', monto:8500, notas:'Solicitud presentada, en revisión SAT' },
  ],
  notaria: [
    { id:'NOT-001', cliente:'Torres Villanueva, Marco A.', tipo:'Escritura de compraventa',   folio:'ESC-1241-2024', fecha_ingreso:'2024-05-10', fecha_vence:'2024-06-10', estatus:'en_tramite', monto:12000, notas:'Notaría 3a. Cancún — Lic. Guerrero' },
    { id:'NOT-002', cliente:'Castillo Mena, Alberto',      tipo:'Poder Notarial General',     folio:'POD-0987-2024', fecha_ingreso:'2024-05-28', fecha_vence:'2024-06-05', estatus:'urgente',    monto:3500,  notas:'Poder para pleitos y cobranzas' },
    { id:'NOT-003', cliente:'López Caamal, Rosa',           tipo:'Testamento',                 folio:'TEST-0234-2024',fecha_ingreso:'2024-04-20', fecha_vence:'2024-07-20', estatus:'en_tramite', monto:5000,  notas:'Primera cita realizada' },
    { id:'NOT-004', cliente:'Ramírez Balam, Lourdes',      tipo:'Protocolización de acuerdo', folio:'PROT-0112-2024',fecha_ingreso:'2024-04-01', fecha_vence:'2024-05-01', estatus:'concluido',  monto:2800,  notas:'Acuerdo de mediación protocolizado' },
  ],
};

// ── HONORARIOS ────────────────────────────────────────────
const HONORARIOS_DEMO = [
  { id:'HON-001', cliente:'Torres Villanueva, Marco A.', concepto:'Retainer mensual — Jun',       monto:8000,  fecha:'2024-06-01', vence:'2024-06-05', estatus:'cobrado',  metodo:'Transferencia', exp:'1042/2024' },
  { id:'HON-002', cliente:'Rodríguez Ek, Patricia',      concepto:'Honorarios audiencia divorcio', monto:5000,  fecha:'2024-06-05', vence:'2024-06-10', estatus:'cobrado',  metodo:'Efectivo',       exp:'0956/2024' },
  { id:'HON-003', cliente:'Pérez Canul, Sergio',          concepto:'Amparo directo — etapa inicial',monto:12000, fecha:'2024-05-20', vence:'2024-06-20', estatus:'pendiente',metodo:'',               exp:'A-234/2024' },
  { id:'HON-004', cliente:'Ramírez Balam, Lourdes',      concepto:'Cobro de pesos — ejecución',   monto:6000,  fecha:'2024-06-02', vence:'2024-06-08', estatus:'cobrado',  metodo:'Transferencia', exp:'0891/2024' },
  { id:'HON-005', cliente:'Hernández Chi, Juan',          concepto:'Defensa penal — alegatos',     monto:8500,  fecha:'2024-05-15', vence:'2024-06-01', estatus:'vencido',  metodo:'',               exp:'0774/2024' },
  { id:'HON-006', cliente:'Dzul Poot, Armando',           concepto:'Retainer mensual — Jun',       monto:5000,  fecha:'2024-06-01', vence:'2024-06-10', estatus:'pendiente',metodo:'',               exp:'0623/2024' },
  { id:'HON-007', cliente:'López Caamal, Rosa',           tipo:'Guarda y custodia — mediación',    monto:6000,  fecha:'2024-05-30', vence:'2024-06-15', estatus:'cobrado',  metodo:'Transferencia', exp:'0511/2024' },
  { id:'HON-008', cliente:'Torres Villanueva, Marco A.', concepto:'Honorarios trámite RPP',        monto:3500,  fecha:'2024-06-03', vence:'2024-06-15', estatus:'pendiente',metodo:'',               exp:'1042/2024' },
];

// ── GASTOS ────────────────────────────────────────────────
const GASTOS_DEMO = [
  { id:'GAS-001', concepto:'Arancel RPP — inscripción escritura', categoria:'arancel',   monto:2800, fecha:'2024-06-01', exp:'1042/2024', cliente:'Torres Villanueva, Marco A.' },
  { id:'GAS-002', concepto:'Derechos catastro — avalúo',          categoria:'arancel',   monto:1000, fecha:'2024-06-02', exp:'0623/2024', cliente:'Dzul Poot, Armando' },
  { id:'GAS-003', concepto:'Mensualidad oficina Cancún',           categoria:'operativo', monto:3500, fecha:'2024-06-01', exp:'',          cliente:'' },
  { id:'GAS-004', concepto:'Copias certificadas — Juzgado',        categoria:'tramite',   monto:350,  fecha:'2024-06-03', exp:'0956/2024', cliente:'Rodríguez Ek, Patricia' },
  { id:'GAS-005', concepto:'Servicios internet + telefonía',       categoria:'operativo', monto:800,  fecha:'2024-06-01', exp:'',          cliente:'' },
  { id:'GAS-006', concepto:'Honorarios perito valuador',           categoria:'tramite',   monto:4500, fecha:'2024-05-28', exp:'1042/2024', cliente:'Torres Villanueva, Marco A.' },
  { id:'GAS-007', concepto:'Material de oficina',                  categoria:'operativo', monto:450,  fecha:'2024-06-04', exp:'',          cliente:'' },
  { id:'GAS-008', concepto:'Derechos Reg. Civil — acta divorcio',  categoria:'arancel',   monto:900,  fecha:'2024-06-05', exp:'0956/2024', cliente:'Rodríguez Ek, Patricia' },
];

// ══════════════════════ ESTADO ════════════════════════════
let expedientes  = JSON.parse(localStorage.getItem('lx_exp')  || 'null') || [...EXPEDIENTES_DEMO];
let clientes     = JSON.parse(localStorage.getItem('lx_cli')  || 'null') || [...CLIENTES_DEMO];
let documentos   = JSON.parse(localStorage.getItem('lx_doc')  || 'null') || [...DOCUMENTOS_DEMO];
let tramites     = JSON.parse(localStorage.getItem('lx_tram') || 'null') || JSON.parse(JSON.stringify(TRAMITES_DEMO));
let honorarios   = JSON.parse(localStorage.getItem('lx_hon')  || 'null') || [...HONORARIOS_DEMO];
let gastos       = JSON.parse(localStorage.getItem('lx_gas')  || 'null') || [...GASTOS_DEMO];

let currentSection = 'dashboard';
let calYear, calMonth;
let filtroHon = 'todos';
let filtroGas = 'todos';

function save() {
  localStorage.setItem('lx_exp',  JSON.stringify(expedientes));
  localStorage.setItem('lx_cli',  JSON.stringify(clientes));
  localStorage.setItem('lx_doc',  JSON.stringify(documentos));
  localStorage.setItem('lx_tram', JSON.stringify(tramites));
  localStorage.setItem('lx_hon',  JSON.stringify(honorarios));
  localStorage.setItem('lx_gas',  JSON.stringify(gastos));
}

// ══════════════════════ INIT ══════════════════════════════
window.addEventListener('DOMContentLoaded', () => {
  const now = new Date();
  calYear  = now.getFullYear();
  calMonth = now.getMonth();

  renderFechaHoy();
  renderMiniCal();
  renderDashboardTable();
  renderTramitesUrgentes();
  renderExpCards(expedientes);
  renderClientes(clientes);
  renderDocumentos(documentos);
  renderFullCal();
  renderProxList();
  renderBarChart();
  renderLineChart();
  renderBarChartFin();
  renderBarChartTram();
  updateKPIs();

  // Render all tramite sections
  ['rpp','catastro','regcivil','sat','notaria'].forEach(t => renderTramitesGrid(t));
  renderHonorarios();
  renderGastos();
});

// ══════════════════════ NAVEGACIÓN ═══════════════════════
const SECTION_TITLES = {
  dashboard:'Dashboard', expedientes:'Expedientes', agenda:'Agenda',
  clientes:'Clientes', documentos:'Documentos',
  rpp:'Reg. Público de la Propiedad', catastro:'Catastro Municipal',
  regcivil:'Registro Civil', sat:'SAT / Fiscal', notaria:'Notaría Pública',
  honorarios:'Honorarios', gastos:'Gastos y Pagos',
  estadisticas:'Estadísticas'
};

function showSection(name) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const sec = document.getElementById('sec-' + name);
  if (sec) sec.classList.add('active');
  // Mark active nav
  document.querySelectorAll('.nav-item').forEach(n => {
    const fn = n.getAttribute('onclick') || '';
    if (fn.includes(`'${name}'`)) n.classList.add('active');
  });
  document.getElementById('topbarTitle').textContent = SECTION_TITLES[name] || '';
  currentSection = name;
  if (window.innerWidth < 768) closeSidebar();
  if (name === 'agenda') renderFullCal();
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('show');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
}

// ══════════════════════ FECHA HOY ════════════════════════
function renderFechaHoy() {
  const d   = new Date();
  const str = d.toLocaleDateString('es-MX', { weekday:'long', day:'numeric', month:'long' });
  document.getElementById('fechaHoy').textContent = str.charAt(0).toUpperCase() + str.slice(1);
}

// ══════════════════════ MINI CAL ══════════════════════════
function renderMiniCal() {
  const now   = new Date();
  const year  = now.getFullYear();
  const month = now.getMonth();
  const first = new Date(year, month, 1).getDay();
  const days  = new Date(year, month + 1, 0).getDate();
  const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  const dias  = ['D','L','M','X','J','V','S'];
  let html = `<div class="cal-head"><span>${meses[month]} ${year}</span></div>`;
  html += `<div class="cal-days-header">${dias.map(d=>`<span>${d}</span>`).join('')}</div>`;
  html += `<div class="cal-days">`;
  for (let i = 0; i < first; i++) html += `<span class="cal-day other-month"></span>`;
  for (let d = 1; d <= days; d++) {
    const isToday = d === now.getDate();
    const hasEv   = EVENTOS_CAL[d] ? 'has-event' : '';
    html += `<span class="cal-day ${isToday?'today':''} ${hasEv}">${d}</span>`;
  }
  html += `</div>`;
  document.getElementById('miniCal').innerHTML = html;
}

// ══════════════════════ FULL CAL ══════════════════════════
function cambiarMes(dir) {
  calMonth += dir;
  if (calMonth < 0)  { calMonth = 11; calYear--; }
  if (calMonth > 11) { calMonth = 0;  calYear++; }
  renderFullCal();
}

function renderFullCal() {
  const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  document.getElementById('calTitle').textContent = `${meses[calMonth]} ${calYear}`;
  const first = new Date(calYear, calMonth, 1).getDay();
  const days  = new Date(calYear, calMonth + 1, 0).getDate();
  const prevD = new Date(calYear, calMonth, 0).getDate();
  const today = new Date();
  const dias  = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
  let html = dias.map(d => `<div class="day-header">${d}</div>`).join('');
  for (let i = 0; i < first; i++) {
    html += `<div class="day-cell other-m"><span class="day-num">${prevD - first + i + 1}</span></div>`;
  }
  for (let d = 1; d <= days; d++) {
    const isToday = (calYear === today.getFullYear() && calMonth === today.getMonth() && d === today.getDate());
    const eventos = EVENTOS_CAL[d] || [];
    const evHTML  = eventos.slice(0,3).map(ev => `<div class="cal-event ev-${ev.tipo}">${ev.texto}</div>`).join('');
    html += `<div class="day-cell ${isToday?'today':''}"><span class="day-num">${d}</span>${evHTML}</div>`;
  }
  const total = first + days;
  const rest  = total % 7 === 0 ? 0 : 7 - (total % 7);
  for (let i = 1; i <= rest; i++) {
    html += `<div class="day-cell other-m"><span class="day-num">${i}</span></div>`;
  }
  document.getElementById('fullCal').innerHTML = html;
}

// ══════════════════════ PRÓXIMAS AUDIENCIAS ═══════════════
function renderProxList() {
  document.getElementById('proxList').innerHTML = AUDIENCIAS_PROX.map(a => `
    <div class="prox-item">
      <span class="prox-date">${a.fecha}</span>
      <div class="prox-body">
        <div class="prox-title">${a.titulo}</div>
        <div class="prox-meta">${a.meta}</div>
      </div>
      <span class="audit-tipo tipo-${a.tipo}">${cap(a.tipo)}</span>
    </div>
  `).join('');
}

// ══════════════════════ DASHBOARD TABLE ═══════════════════
function renderDashboardTable() {
  const tbody = document.getElementById('tbody-dashboard');
  tbody.innerHTML = expedientes.slice(0, 6).map(exp => `
    <tr>
      <td><span class="exp-num">${exp.id}</span></td>
      <td>${exp.cliente}</td>
      <td><span class="audit-tipo tipo-${exp.materia}">${cap(exp.materia)}</span></td>
      <td style="font-size:.78rem;color:var(--text-m)">${exp.juzgado}</td>
      <td><span class="status-badge status-${exp.estatus}">${cap(exp.estatus)}</span></td>
      <td style="font-size:.78rem">${exp.proxActo}</td>
    </tr>
  `).join('');
}

// ══════════════════════ TRÁMITES URGENTES DASHBOARD ═══════
function renderTramitesUrgentes() {
  const el = document.getElementById('tramitesUrgentes');
  const urgentes = [];
  Object.entries(tramites).forEach(([key, arr]) => {
    const labels = { rpp:'RPP', catastro:'Catastro', regcivil:'Reg. Civil', sat:'SAT', notaria:'Notaría' };
    arr.filter(t => t.estatus === 'urgente' || t.estatus === 'en_tramite').slice(0,2).forEach(t => {
      urgentes.push({ ...t, inst: labels[key], key });
    });
  });
  if (!urgentes.length) { el.innerHTML = '<p style="color:var(--text-m);font-size:.85rem">Sin trámites urgentes.</p>'; return; }
  el.innerHTML = `<div class="tramite-urgente-list">${urgentes.map(t => `
    <div class="tram-urg-item" onclick="showSection('${t.key}')">
      <div class="tram-urg-inst">${t.inst}</div>
      <div class="tram-urg-body">
        <div class="tram-urg-tipo">${t.tipo}</div>
        <div class="tram-urg-cli">${t.cliente} · ${t.folio}</div>
      </div>
      <div class="tram-urg-vence ${t.estatus === 'urgente' ? 'urg-red' : 'urg-amber'}">
        ${t.estatus === 'urgente' ? '⚠' : '⏳'} Vence ${t.fecha_vence?.slice(5).replace('-','/')}
      </div>
    </div>
  `).join('')}</div>`;
}

// ══════════════════════ EXP CARDS ════════════════════════
let filtroMateria = 'todos';
let filtroTexto   = '';

function renderExpCards(data) {
  const grid = document.getElementById('expCardsGrid');
  let filtered = data.filter(e => {
    const matchM = filtroMateria === 'todos' || e.materia === filtroMateria;
    const matchT = !filtroTexto || e.id.toLowerCase().includes(filtroTexto) || e.cliente.toLowerCase().includes(filtroTexto) || e.titulo.toLowerCase().includes(filtroTexto);
    return matchM && matchT;
  });
  if (!filtered.length) { grid.innerHTML = `<p style="color:var(--text-m);font-size:.88rem">Sin resultados.</p>`; return; }
  grid.innerHTML = filtered.map(exp => `
    <div class="exp-card" onclick="verExpediente('${exp.id}')">
      <div class="exp-card-num"># ${exp.id}</div>
      <div class="exp-card-title">${exp.titulo}</div>
      <div class="exp-card-meta">
        <span>👤 ${exp.cliente}</span>
        <span>🏛 ${exp.juzgado}</span>
        <span>📅 ${exp.proxActo}</span>
      </div>
      <div class="exp-card-footer">
        <span class="audit-tipo tipo-${exp.materia}">${cap(exp.materia)}</span>
        <span class="status-badge status-${exp.estatus}">${cap(exp.estatus)}</span>
      </div>
    </div>
  `).join('');
}

function filtrarExpedientes(val) { filtroTexto = val.toLowerCase(); renderExpCards(expedientes); }
function filtrarMateria(materia, btn) {
  filtroMateria = materia;
  document.querySelectorAll('#sec-expedientes .pill').forEach(p => p.classList.remove('active'));
  btn?.classList.add('active');
  renderExpCards(expedientes);
}

function verExpediente(id) {
  const exp = expedientes.find(e => e.id === id);
  if (!exp) return;
  document.getElementById('modalContent').innerHTML = `
    <div class="modal-title">Expediente ${exp.id}</div>
    <div style="display:flex;flex-direction:column;gap:14px">
      <div><span style="color:var(--text-m);font-size:.78rem">CASO</span><div style="font-weight:600;margin-top:4px">${exp.titulo}</div></div>
      <div><span style="color:var(--text-m);font-size:.78rem">CLIENTE</span><div style="font-weight:600;margin-top:4px">${exp.cliente}</div></div>
      <div><span style="color:var(--text-m);font-size:.78rem">MATERIA</span><div style="margin-top:4px"><span class="audit-tipo tipo-${exp.materia}">${cap(exp.materia)}</span></div></div>
      <div><span style="color:var(--text-m);font-size:.78rem">JUZGADO</span><div style="margin-top:4px">${exp.juzgado}</div></div>
      <div><span style="color:var(--text-m);font-size:.78rem">ESTATUS</span><div style="margin-top:4px"><span class="status-badge status-${exp.estatus}">${cap(exp.estatus)}</span></div></div>
      <div><span style="color:var(--text-m);font-size:.78rem">PRÓXIMO ACTO</span><div style="font-weight:600;margin-top:4px">${exp.proxActo}</div></div>
    </div>
    <div class="form-actions"><button class="btn-cancel" onclick="closeModalDirect()">Cerrar</button></div>
  `;
  document.getElementById('modalOverlay').classList.add('show');
}

// ══════════════════════ CLIENTES ══════════════════════════
function renderClientes(data) {
  const txt   = document.querySelector('#sec-clientes .search-input')?.value?.toLowerCase() || '';
  const grid  = document.getElementById('clientsGrid');
  const shown = data.filter(c => !txt || c.nombre.toLowerCase().includes(txt));
  const initials = n => n.split(' ').slice(0,2).map(p=>p[0]).join('');
  grid.innerHTML = shown.map(c => `
    <div class="client-card">
      <div style="display:flex;align-items:center;gap:12px">
        <div class="client-avatar-lg" style="background:linear-gradient(135deg,${c.color}aa,${c.color}44)">${initials(c.nombre)}</div>
        <div>
          <div class="client-name">${c.nombre}</div>
          <div class="client-info"><span>📞 ${c.tel}</span><span>✉ ${c.correo}</span></div>
        </div>
      </div>
      <div class="client-stats">
        <div class="client-stat"><div class="client-stat-val" style="color:${c.color}">${c.exp}</div><div class="client-stat-label">Expedientes</div></div>
        <div class="client-stat"><div class="client-stat-val" style="color:var(--emerald)">Activo</div><div class="client-stat-label">Estatus</div></div>
      </div>
    </div>
  `).join('');
}
function filtrarClientes() { renderClientes(clientes); }

// ══════════════════════ DOCUMENTOS ═══════════════════════
function renderDocumentos(data) {
  document.getElementById('docsList').innerHTML = data.map(d => `
    <div class="doc-item">
      <span class="doc-icon">${d.tipo}</span>
      <div class="doc-body">
        <div class="doc-title">${d.titulo}</div>
        <div class="doc-meta">Exp. ${d.exp} · Cargado ${d.fecha}</div>
      </div>
      <div class="doc-badge">
        <span class="doc-vence doc-${d.estado}">${d.estado === 'urgente' ? '⚠ Vence ' + d.vence : d.estado === 'pendiente' ? '⏳ Vence ' + d.vence : '✅ Al día'}</span>
      </div>
    </div>
  `).join('');
}

// ══════════════════════ TRÁMITES GOV ═════════════════════
const TRAM_ESTATUS_ICONS = { urgente:'🔴', en_tramite:'🟡', concluido:'🟢' };
const TRAM_ESTATUS_LABELS = { urgente:'Urgente', en_tramite:'En Trámite', concluido:'Concluido' };

function renderTramitesGrid(key) {
  const el = document.getElementById('grid-' + key);
  if (!el) return;
  const data = tramites[key] || [];
  if (!data.length) { el.innerHTML = '<p style="color:var(--text-m);font-size:.85rem;padding:8px 0">Sin trámites registrados.</p>'; return; }
  el.innerHTML = data.map(t => `
    <div class="tram-card tram-${t.estatus}" onclick="verTramite('${key}','${t.id}')">
      <div class="tram-card-top">
        <span class="tram-id">${t.id}</span>
        <span class="tram-est-badge tram-est-${t.estatus}">${TRAM_ESTATUS_ICONS[t.estatus]} ${TRAM_ESTATUS_LABELS[t.estatus]}</span>
      </div>
      <div class="tram-tipo">${t.tipo}</div>
      <div class="tram-cliente">👤 ${t.cliente}</div>
      <div class="tram-folio">📋 Folio: ${t.folio}</div>
      <div class="tram-footer">
        <span class="tram-fecha">Ingreso: ${t.fecha_ingreso}</span>
        <span class="tram-vence ${t.estatus === 'urgente' ? 'tv-red' : ''}">Vence: ${t.fecha_vence}</span>
      </div>
      ${t.monto ? `<div class="tram-monto">💰 Arancel: ${fmtMoney(t.monto)}</div>` : ''}
    </div>
  `).join('');
}

function filtrarTramites(key, val) {
  const data = tramites[key] || [];
  const txt  = val.toLowerCase();
  const el   = document.getElementById('grid-' + key);
  if (!el) return;
  const filtered = data.filter(t => t.cliente.toLowerCase().includes(txt) || t.tipo.toLowerCase().includes(txt) || t.folio.toLowerCase().includes(txt));
  if (!filtered.length) { el.innerHTML = '<p style="color:var(--text-m);font-size:.85rem">Sin resultados.</p>'; return; }
  const orig = tramites[key];
  tramites[key] = filtered;
  renderTramitesGrid(key);
  tramites[key] = orig;
}

function filtrarEstTramite(key, est, btn) {
  document.querySelectorAll(`#sec-${key} .pill`).forEach(p => p.classList.remove('active'));
  btn?.classList.add('active');
  const data = (JSON.parse(localStorage.getItem('lx_tram')) || TRAMITES_DEMO)[key] || [];
  tramites[key] = est === 'todos' ? data : data.filter(t => t.estatus === est);
  renderTramitesGrid(key);
}

function verTramite(key, id) {
  const t = (tramites[key] || []).find(x => x.id === id);
  if (!t) return;
  document.getElementById('modalContent').innerHTML = `
    <div class="modal-title">${t.tipo}</div>
    <div style="display:flex;flex-direction:column;gap:14px">
      <div><span style="color:var(--text-m);font-size:.78rem">FOLIO</span><div style="font-weight:700;color:var(--cyan);margin-top:4px">${t.folio}</div></div>
      <div><span style="color:var(--text-m);font-size:.78rem">CLIENTE</span><div style="font-weight:600;margin-top:4px">${t.cliente}</div></div>
      <div><span style="color:var(--text-m);font-size:.78rem">ESTATUS</span><div style="margin-top:4px"><span class="tram-est-badge tram-est-${t.estatus}">${TRAM_ESTATUS_ICONS[t.estatus]} ${TRAM_ESTATUS_LABELS[t.estatus]}</span></div></div>
      <div class="form-row">
        <div><span style="color:var(--text-m);font-size:.78rem">INGRESO</span><div style="margin-top:4px">${t.fecha_ingreso}</div></div>
        <div><span style="color:var(--text-m);font-size:.78rem">VENCIMIENTO</span><div style="margin-top:4px;color:${t.estatus==='urgente'?'var(--rose)':'inherit'}">${t.fecha_vence}</div></div>
      </div>
      ${t.monto ? `<div><span style="color:var(--text-m);font-size:.78rem">ARANCEL / MONTO</span><div style="font-weight:700;color:var(--emerald);margin-top:4px">${fmtMoney(t.monto)}</div></div>` : ''}
      <div><span style="color:var(--text-m);font-size:.78rem">NOTAS</span><div style="margin-top:4px;font-size:.88rem">${t.notas || '—'}</div></div>
    </div>
    <div class="form-actions">
      <button class="btn-cancel" onclick="closeModalDirect()">Cerrar</button>
      <button class="btn-submit" onclick="marcarConcluido('${key}','${t.id}')">✅ Marcar Concluido</button>
    </div>
  `;
  document.getElementById('modalOverlay').classList.add('show');
}

function marcarConcluido(key, id) {
  const t = (tramites[key] || []).find(x => x.id === id);
  if (t) { t.estatus = 'concluido'; save(); renderTramitesGrid(key); renderTramitesUrgentes(); }
  closeModalDirect();
  showToast('✅ Trámite marcado como concluido');
}

// ══════════════════════ HONORARIOS ═══════════════════════
function renderHonorarios() {
  const el = document.getElementById('honList');
  const data = filtroHon === 'todos' ? honorarios : honorarios.filter(h => h.estatus === filtroHon);
  el.innerHTML = data.map(h => `
    <div class="hon-item">
      <div class="hon-left">
        <div class="hon-id">${h.id}</div>
        <div class="hon-concepto">${h.concepto || h.tipo || '—'}</div>
        <div class="hon-meta">👤 ${h.cliente} ${h.exp ? '· Exp. ' + h.exp : ''}</div>
        <div class="hon-fecha">📅 ${h.fecha} → Vence ${h.vence}</div>
      </div>
      <div class="hon-right">
        <div class="hon-monto">${fmtMoney(h.monto)}</div>
        <span class="hon-badge hon-${h.estatus}">${h.estatus === 'cobrado' ? '✅ Cobrado' : h.estatus === 'pendiente' ? '⏳ Pendiente' : '🔴 Vencido'}</span>
        ${h.metodo ? `<div class="hon-metodo">${h.metodo}</div>` : ''}
        ${h.estatus !== 'cobrado' ? `<button class="btn-cobrar" onclick="cobrarHonorario('${h.id}')">Marcar cobrado</button>` : ''}
      </div>
    </div>
  `).join('') || '<p style="color:var(--text-m);font-size:.85rem">Sin registros.</p>';

  // Update summary
  const cobrado   = honorarios.filter(h=>h.estatus==='cobrado').reduce((s,h)=>s+h.monto,0);
  const porCobrar = honorarios.filter(h=>h.estatus==='pendiente').reduce((s,h)=>s+h.monto,0);
  const vencido   = honorarios.filter(h=>h.estatus==='vencido').reduce((s,h)=>s+h.monto,0);
  document.getElementById('fin-cobrado').textContent   = fmtMoney(cobrado);
  document.getElementById('fin-por-cobrar').textContent = fmtMoney(porCobrar);
  document.getElementById('fin-vencido').textContent   = fmtMoney(vencido);
}

function filtrarHonorarios(val, btn) {
  filtroHon = val;
  document.querySelectorAll('#sec-honorarios .pill').forEach(p => p.classList.remove('active'));
  btn?.classList.add('active');
  renderHonorarios();
}

function cobrarHonorario(id) {
  const h = honorarios.find(x => x.id === id);
  if (!h) return;
  h.estatus = 'cobrado';
  h.metodo  = 'Transferencia';
  save(); renderHonorarios(); updateKPIs();
  showToast('✅ Honorario marcado como cobrado');
}

// ══════════════════════ GASTOS ═══════════════════════════
function renderGastos() {
  const el = document.getElementById('gastosList');
  const data = filtroGas === 'todos' ? gastos : gastos.filter(g => g.categoria === filtroGas);
  el.innerHTML = data.map(g => `
    <div class="gasto-item">
      <div class="gasto-cat-icon">${g.categoria === 'arancel' ? '🏛' : g.categoria === 'operativo' ? '🏢' : '📋'}</div>
      <div class="gasto-body">
        <div class="gasto-concepto">${g.concepto}</div>
        <div class="gasto-meta">${g.fecha} ${g.cliente ? '· 👤 '+g.cliente : ''} ${g.exp ? '· Exp. '+g.exp : ''}</div>
      </div>
      <div class="gasto-right">
        <div class="gasto-monto">${fmtMoney(g.monto)}</div>
        <span class="gasto-cat-badge cat-${g.categoria}">${cap(g.categoria)}</span>
      </div>
    </div>
  `).join('') || '<p style="color:var(--text-m);font-size:.85rem">Sin gastos registrados.</p>';

  const total   = gastos.reduce((s,g)=>s+g.monto,0);
  const arancel = gastos.filter(g=>g.categoria==='arancel').reduce((s,g)=>s+g.monto,0);
  const oper    = gastos.filter(g=>g.categoria==='operativo').reduce((s,g)=>s+g.monto,0);
  const cobrado = honorarios.filter(h=>h.estatus==='cobrado').reduce((s,h)=>s+h.monto,0);
  document.getElementById('gas-mes').textContent     = fmtMoney(total);
  document.getElementById('gas-arancel').textContent  = fmtMoney(arancel);
  document.getElementById('gas-oper').textContent    = fmtMoney(oper);
  document.getElementById('gas-balance').textContent  = fmtMoney(cobrado - total);
}

function filtrarGastos(val, btn) {
  filtroGas = val;
  document.querySelectorAll('#sec-gastos .pill').forEach(p => p.classList.remove('active'));
  btn?.classList.add('active');
  renderGastos();
}

// ══════════════════════ KPIs ══════════════════════════════
function updateKPIs() {
  document.getElementById('kpi-exp').textContent  = expedientes.filter(e => e.estatus === 'activo').length;
  document.getElementById('kpi-cli').textContent  = clientes.length;
  const cobrado = honorarios.filter(h=>h.estatus==='cobrado').reduce((s,h)=>s+h.monto,0);
  const pending = honorarios.filter(h=>h.estatus==='pendiente').reduce((s,h)=>s+h.monto,0);
  const gasTotal= gastos.reduce((s,g)=>s+g.monto,0);
  const tramAct = Object.values(tramites).flat().filter(t=>t.estatus !== 'concluido').length;
  document.getElementById('kpi-hon').textContent  = fmtMoney(cobrado);
  document.getElementById('kpi-pend').textContent = fmtMoney(pending);
  document.getElementById('kpi-gas').textContent  = fmtMoney(gasTotal);
  document.getElementById('kpi-tram').textContent = tramAct;
}

// ══════════════════════ GRÁFICAS ══════════════════════════
function renderBarChart() {
  const materias = [
    { label:'Civil',     val:8, color:'#22d3ee', max:10 },
    { label:'Familiar',  val:6, color:'#a78bfa', max:10 },
    { label:'Mercantil', val:4, color:'#34d399', max:10 },
    { label:'Penal',     val:3, color:'#f472b6', max:10 },
    { label:'Amparo',    val:3, color:'#fbbf24', max:10 },
  ];
  document.getElementById('barChart').innerHTML = materias.map(m => `
    <div class="bar-row">
      <span class="bar-label">${m.label}</span>
      <div class="bar-track"><div class="bar-fill" style="width:${(m.val/m.max)*100}%;background:${m.color}"></div></div>
      <span class="bar-val">${m.val}</span>
    </div>
  `).join('');
}

function renderLineChart() {
  const meses = ['Ene','Feb','Mar','Abr','May','Jun'];
  const vals  = [3, 5, 4, 7, 6, 7];
  const max   = Math.max(...vals);
  document.getElementById('lineChart').innerHTML = `
    <div class="line-bars">
      ${meses.map((m,i) => `
        <div class="line-bar-w">
          <div class="line-bar" style="height:${(vals[i]/max)*88}px"></div>
          <span class="line-label">${m}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function renderBarChartFin() {
  const el = document.getElementById('barChartFin');
  if (!el) return;
  const meses    = ['Ene','Feb','Mar','Abr','May','Jun'];
  const ingresos = [38000, 42000, 35000, 48000, 40000, 42500];
  const gastos_m = [7200,  8100,  6800,  9200,  7800,  8350];
  const max = Math.max(...ingresos);
  el.innerHTML = meses.map((m,i) => `
    <div class="bar-row">
      <span class="bar-label">${m}</span>
      <div class="bar-track-double">
        <div class="bar-fill" style="width:${(ingresos[i]/max)*100}%;background:#34d399" title="Honorarios ${fmtMoney(ingresos[i])}"></div>
        <div class="bar-fill bar-fill2" style="width:${(gastos_m[i]/max)*100}%;background:#f472b6" title="Gastos ${fmtMoney(gastos_m[i])}"></div>
      </div>
      <span class="bar-val">${fmtMoney(ingresos[i]-gastos_m[i])}</span>
    </div>
  `).join('') + `
  <div style="display:flex;gap:16px;margin-top:8px;font-size:.75rem;color:var(--text-m)">
    <span><span style="display:inline-block;width:10px;height:10px;background:#34d399;border-radius:3px;margin-right:4px"></span>Honorarios</span>
    <span><span style="display:inline-block;width:10px;height:10px;background:#f472b6;border-radius:3px;margin-right:4px"></span>Gastos</span>
  </div>`;
}

function renderBarChartTram() {
  const el = document.getElementById('barChartTram');
  if (!el) return;
  const items = [
    { label:'RPP',       val: tramites.rpp?.length || 0,      color:'#22d3ee' },
    { label:'Catastro',  val: tramites.catastro?.length || 0,  color:'#fbbf24' },
    { label:'Reg. Civil',val: tramites.regcivil?.length || 0,  color:'#a78bfa' },
    { label:'SAT',       val: tramites.sat?.length || 0,       color:'#34d399' },
    { label:'Notaría',   val: tramites.notaria?.length || 0,   color:'#f472b6' },
  ];
  const max = Math.max(...items.map(x=>x.val), 1);
  el.innerHTML = items.map(m => `
    <div class="bar-row">
      <span class="bar-label">${m.label}</span>
      <div class="bar-track"><div class="bar-fill" style="width:${(m.val/max)*100}%;background:${m.color}"></div></div>
      <span class="bar-val">${m.val}</span>
    </div>
  `).join('');
}

// ══════════════════════ MODALS ═══════════════════════════
const MODALS = {
  expediente: () => `
    <div class="modal-title">Nuevo Expediente</div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Número de Expediente</label><input class="form-input" id="f-id" placeholder="Ej. 1100/2024" /></div>
      <div class="form-group"><label class="form-label">Materia</label>
        <select class="form-select" id="f-materia">
          <option value="civil">Civil</option><option value="familiar">Familiar</option>
          <option value="penal">Penal</option><option value="amparo">Amparo</option><option value="mercantil">Mercantil</option>
        </select>
      </div>
    </div>
    <div class="form-group"><label class="form-label">Nombre del Caso / Partes</label><input class="form-input" id="f-titulo" placeholder="Ej. González vs. Constructora" /></div>
    <div class="form-group"><label class="form-label">Cliente</label><input class="form-input" id="f-cliente" placeholder="Nombre completo" /></div>
    <div class="form-group"><label class="form-label">Juzgado / Tribunal</label><input class="form-input" id="f-juzgado" placeholder="Ej. 2° Civil, Cancún" /></div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Estatus</label>
        <select class="form-select" id="f-estatus">
          <option value="activo">Activo</option><option value="sentencia">Sentencia</option>
          <option value="apelacion">Apelación</option><option value="suspendido">Suspendido</option><option value="ejecutando">Ejecutando</option>
        </select>
      </div>
      <div class="form-group"><label class="form-label">Próximo Acto Procesal</label><input class="form-input" id="f-prox" placeholder="Ej. Audiencia 15 Jun" /></div>
    </div>
    <div class="form-group"><label class="form-label">Notas</label><textarea class="form-textarea" id="f-notas" placeholder="Notas del caso..."></textarea></div>
    <div class="form-actions">
      <button class="btn-cancel" onclick="closeModalDirect()">Cancelar</button>
      <button class="btn-submit" onclick="guardarExpediente()">Guardar Expediente</button>
    </div>`,

  audiencia: () => `
    <div class="modal-title">Nueva Audiencia</div>
    <div class="form-group"><label class="form-label">Expediente</label><input class="form-input" id="fa-exp" placeholder="Número de expediente" /></div>
    <div class="form-group"><label class="form-label">Descripción</label><input class="form-input" id="fa-desc" placeholder="Ej. Audiencia de Pruebas" /></div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Fecha</label><input class="form-input" id="fa-fecha" type="date" /></div>
      <div class="form-group"><label class="form-label">Hora</label><input class="form-input" id="fa-hora" type="time" /></div>
    </div>
    <div class="form-group"><label class="form-label">Juzgado</label><input class="form-input" id="fa-juz" placeholder="Ej. 3° Civil, Cancún" /></div>
    <div class="form-actions">
      <button class="btn-cancel" onclick="closeModalDirect()">Cancelar</button>
      <button class="btn-submit" onclick="showToast('✅ Audiencia agendada');closeModalDirect()">Agendar</button>
    </div>`,

  cliente: () => `
    <div class="modal-title">Nuevo Cliente</div>
    <div class="form-group"><label class="form-label">Nombre Completo</label><input class="form-input" id="fc-nombre" placeholder="Apellidos, Nombre" /></div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Teléfono</label><input class="form-input" id="fc-tel" type="tel" placeholder="998-000-0000" /></div>
      <div class="form-group"><label class="form-label">Correo Electrónico</label><input class="form-input" id="fc-email" type="email" placeholder="correo@ejemplo.com" /></div>
    </div>
    <div class="form-group"><label class="form-label">RFC (opcional)</label><input class="form-input" id="fc-rfc" placeholder="XXXX000000000" /></div>
    <div class="form-group"><label class="form-label">Domicilio</label><textarea class="form-textarea" id="fc-dom" placeholder="Domicilio completo..."></textarea></div>
    <div class="form-actions">
      <button class="btn-cancel" onclick="closeModalDirect()">Cancelar</button>
      <button class="btn-submit" onclick="guardarCliente()">Guardar Cliente</button>
    </div>`,

  documento: () => `
    <div class="modal-title">Nuevo Documento</div>
    <div class="form-group"><label class="form-label">Título del Documento</label><input class="form-input" id="fd-titulo" placeholder="Ej. Demanda Principal" /></div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Expediente</label><input class="form-input" id="fd-exp" placeholder="Número de exp." /></div>
      <div class="form-group"><label class="form-label">Fecha de Vencimiento</label><input class="form-input" id="fd-vence" type="date" /></div>
    </div>
    <div class="form-group"><label class="form-label">Tipo</label>
      <select class="form-select" id="fd-tipo">
        <option>📄 Escrito Inicial</option><option>📋 Contestación</option>
        <option>📑 Amparo</option><option>📃 Convenio</option><option>📝 Alegatos</option>
      </select>
    </div>
    <div class="form-actions">
      <button class="btn-cancel" onclick="closeModalDirect()">Cancelar</button>
      <button class="btn-submit" onclick="showToast('📁 Documento registrado');closeModalDirect()">Registrar</button>
    </div>`,

  // Trámite genérico reusable
  rpp:      () => buildTramiteModal('RPP', 'rpp',      ['Inscripción de escritura','Cancelación de hipoteca','Búsqueda de antecedentes','Inscripción de embargo','Aviso preventivo','Certificado de libertad de gravamen']),
  catastro: () => buildTramiteModal('Catastro', 'catastro', ['Avalúo catastral','Cédula catastral','Actualización de valor','Traslado de dominio','Certificado catastral']),
  regcivil: () => buildTramiteModal('Registro Civil', 'regcivil', ['Acta de nacimiento','Acta de matrimonio','Acta de defunción','Acta de divorcio','Reconocimiento de paternidad','Rectificación de acta']),
  sat:      () => buildTramiteModal('SAT / Fiscal', 'sat', ['Obtención de RFC','Renovación e.firma','Declaración anual','Declaración mensual','Devolución de impuestos','Aclaración de adeudo','Buzón tributario']),
  notaria:  () => buildTramiteModal('Notaría Pública', 'notaria', ['Escritura de compraventa','Poder Notarial General','Poder Notarial Especial','Testamento','Protocolización de acuerdo','Fe de hechos','Ratificación de firmas']),

  honorario: () => `
    <div class="modal-title">Registrar Honorario</div>
    <div class="form-group"><label class="form-label">Cliente</label>
      <select class="form-select" id="fh-cli">
        ${clientes.map(c=>`<option>${c.nombre}</option>`).join('')}
      </select>
    </div>
    <div class="form-group"><label class="form-label">Concepto</label><input class="form-input" id="fh-concepto" placeholder="Ej. Retainer mensual, Audiencia..." /></div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Monto ($)</label><input class="form-input" id="fh-monto" type="number" placeholder="0.00" /></div>
      <div class="form-group"><label class="form-label">Fecha de Vencimiento</label><input class="form-input" id="fh-vence" type="date" /></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Expediente (opcional)</label><input class="form-input" id="fh-exp" placeholder="Núm. expediente" /></div>
      <div class="form-group"><label class="form-label">Estatus</label>
        <select class="form-select" id="fh-est">
          <option value="pendiente">Pendiente</option>
          <option value="cobrado">Cobrado</option>
          <option value="vencido">Vencido</option>
        </select>
      </div>
    </div>
    <div class="form-actions">
      <button class="btn-cancel" onclick="closeModalDirect()">Cancelar</button>
      <button class="btn-submit" onclick="guardarHonorario()">Guardar</button>
    </div>`,

  gasto: () => `
    <div class="modal-title">Registrar Gasto</div>
    <div class="form-group"><label class="form-label">Concepto</label><input class="form-input" id="fg-concepto" placeholder="Descripción del gasto" /></div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Monto ($)</label><input class="form-input" id="fg-monto" type="number" placeholder="0.00" /></div>
      <div class="form-group"><label class="form-label">Fecha</label><input class="form-input" id="fg-fecha" type="date" /></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Categoría</label>
        <select class="form-select" id="fg-cat">
          <option value="arancel">Arancel</option>
          <option value="operativo">Operativo</option>
          <option value="tramite">Trámite</option>
        </select>
      </div>
      <div class="form-group"><label class="form-label">Expediente (opc.)</label><input class="form-input" id="fg-exp" placeholder="Núm. expediente" /></div>
    </div>
    <div class="form-actions">
      <button class="btn-cancel" onclick="closeModalDirect()">Cancelar</button>
      <button class="btn-submit" onclick="guardarGasto()">Guardar Gasto</button>
    </div>`,
};

function buildTramiteModal(titulo, key, tipos) {
  return `
    <div class="modal-title">Nuevo Trámite — ${titulo}</div>
    <div class="form-group"><label class="form-label">Tipo de Trámite</label>
      <select class="form-select" id="ft-tipo">${tipos.map(t=>`<option>${t}</option>`).join('')}</select>
    </div>
    <div class="form-group"><label class="form-label">Cliente</label>
      <select class="form-select" id="ft-cli">${clientes.map(c=>`<option>${c.nombre}</option>`).join('')}</select>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Folio / Referencia</label><input class="form-input" id="ft-folio" placeholder="Folio asignado" /></div>
      <div class="form-group"><label class="form-label">Fecha de Ingreso</label><input class="form-input" id="ft-ingreso" type="date" /></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Fecha de Vencimiento</label><input class="form-input" id="ft-vence" type="date" /></div>
      <div class="form-group"><label class="form-label">Arancel / Monto ($)</label><input class="form-input" id="ft-monto" type="number" placeholder="0" /></div>
    </div>
    <div class="form-group"><label class="form-label">Estatus Inicial</label>
      <select class="form-select" id="ft-est">
        <option value="en_tramite">En Trámite</option>
        <option value="urgente">Urgente</option>
      </select>
    </div>
    <div class="form-group"><label class="form-label">Notas</label><textarea class="form-textarea" id="ft-notas" placeholder="Notas adicionales..."></textarea></div>
    <div class="form-actions">
      <button class="btn-cancel" onclick="closeModalDirect()">Cancelar</button>
      <button class="btn-submit" onclick="guardarTramite('${key}')">Guardar Trámite</button>
    </div>`;
}

function openModal(tipo) {
  document.getElementById('modalContent').innerHTML = MODALS[tipo]?.() || '';
  document.getElementById('modalOverlay').classList.add('show');
}
function closeModal(e) { if (e.target === document.getElementById('modalOverlay')) closeModalDirect(); }
function closeModalDirect() { document.getElementById('modalOverlay').classList.remove('show'); }

// ══════════════════════ GUARDAR ═══════════════════════════
function guardarExpediente() {
  const id     = document.getElementById('f-id')?.value.trim();
  const titulo = document.getElementById('f-titulo')?.value.trim();
  const cliente= document.getElementById('f-cliente')?.value.trim();
  if (!id || !titulo || !cliente) { showToast('⚠ Completa los campos requeridos'); return; }
  expedientes.unshift({
    id, cliente,
    materia:  document.getElementById('f-materia')?.value,
    titulo,
    juzgado:  document.getElementById('f-juzgado')?.value,
    estatus:  document.getElementById('f-estatus')?.value,
    proxActo: document.getElementById('f-prox')?.value || 'Por definir',
    color: '#22d3ee',
  });
  save(); renderExpCards(expedientes); renderDashboardTable(); updateKPIs();
  closeModalDirect(); showToast('✅ Expediente ' + id + ' guardado');
}

function guardarCliente() {
  const nombre = document.getElementById('fc-nombre')?.value.trim();
  if (!nombre) { showToast('⚠ El nombre es requerido'); return; }
  const colors = ['#22d3ee','#a78bfa','#f472b6','#fbbf24','#34d399'];
  clientes.unshift({ nombre, tel: document.getElementById('fc-tel')?.value, correo: document.getElementById('fc-email')?.value, exp: 0, color: colors[Math.floor(Math.random()*colors.length)] });
  save(); renderClientes(clientes); updateKPIs();
  closeModalDirect(); showToast('✅ Cliente guardado');
}

function guardarTramite(key) {
  const tipo = document.getElementById('ft-tipo')?.value.trim();
  const cli  = document.getElementById('ft-cli')?.value.trim();
  if (!tipo || !cli) { showToast('⚠ Completa los campos requeridos'); return; }
  const prefixes = { rpp:'RPP', catastro:'CAT', regcivil:'RC', sat:'SAT', notaria:'NOT' };
  const num = String((tramites[key]?.length || 0) + 1).padStart(3,'0');
  const id  = `${prefixes[key] || 'TRM'}-${num}`;
  if (!tramites[key]) tramites[key] = [];
  tramites[key].unshift({
    id, cliente: cli, tipo,
    folio:        document.getElementById('ft-folio')?.value || id,
    fecha_ingreso:document.getElementById('ft-ingreso')?.value || new Date().toISOString().slice(0,10),
    fecha_vence:  document.getElementById('ft-vence')?.value || '',
    estatus:      document.getElementById('ft-est')?.value || 'en_tramite',
    monto:        Number(document.getElementById('ft-monto')?.value) || 0,
    notas:        document.getElementById('ft-notas')?.value || '',
  });
  save(); renderTramitesGrid(key); renderTramitesUrgentes(); updateKPIs();
  closeModalDirect(); showToast('✅ Trámite ' + id + ' registrado');
}

function guardarHonorario() {
  const cli     = document.getElementById('fh-cli')?.value.trim();
  const monto   = Number(document.getElementById('fh-monto')?.value);
  if (!cli || !monto) { showToast('⚠ Completa cliente y monto'); return; }
  const id = 'HON-' + String(honorarios.length + 1).padStart(3,'0');
  honorarios.unshift({
    id, cliente: cli,
    concepto: document.getElementById('fh-concepto')?.value || 'Honorarios',
    monto,
    fecha:    new Date().toISOString().slice(0,10),
    vence:    document.getElementById('fh-vence')?.value || '',
    estatus:  document.getElementById('fh-est')?.value || 'pendiente',
    metodo:   '',
    exp:      document.getElementById('fh-exp')?.value || '',
  });
  save(); renderHonorarios(); updateKPIs();
  closeModalDirect(); showToast('✅ Honorario registrado');
}

function guardarGasto() {
  const concepto = document.getElementById('fg-concepto')?.value.trim();
  const monto    = Number(document.getElementById('fg-monto')?.value);
  if (!concepto || !monto) { showToast('⚠ Completa concepto y monto'); return; }
  const id = 'GAS-' + String(gastos.length + 1).padStart(3,'0');
  gastos.unshift({
    id, concepto, monto,
    fecha:     document.getElementById('fg-fecha')?.value || new Date().toISOString().slice(0,10),
    categoria: document.getElementById('fg-cat')?.value || 'operativo',
    exp:       document.getElementById('fg-exp')?.value || '',
    cliente:   '',
  });
  save(); renderGastos(); updateKPIs();
  closeModalDirect(); showToast('✅ Gasto registrado');
}

// ══════════════════════ NOTIFICACIONES ════════════════════
function toggleNotif() { document.getElementById('notifPanel').classList.toggle('show'); }
document.addEventListener('click', e => {
  if (!e.target.closest('.notif-bell')) document.getElementById('notifPanel')?.classList.remove('show');
});

// ══════════════════════ TOAST ═════════════════════════════
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ══════════════════════ UTILS ════════════════════════════
function cap(str)       { return str ? str.charAt(0).toUpperCase() + str.slice(1) : ''; }
function fmtMoney(n)    { return '$' + Number(n || 0).toLocaleString('es-MX'); }
