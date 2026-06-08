# LexQR — Agenda Legal

Dashboard legal interactivo para gestión de expedientes, audiencias y clientes.
**Sin backend · GitHub Pages · Funciona en móvil · Sin costo**

---

## 🚀 Cómo publicar en GitHub Pages (gratis, 5 minutos)

### 1. Crear cuenta y repositorio
1. Ve a [github.com](https://github.com) y crea cuenta (gratis)
2. Clic en **"New repository"**
3. Nombre: `lexqr` (o el que quieras)
4. Marca **Public** ✅
5. Clic en **"Create repository"**

### 2. Subir los archivos
**Opción A — Desde el navegador (más fácil):**
1. En tu nuevo repo, clic en **"uploading an existing file"**
2. Arrastra los 3 archivos: `index.html`, `styles.css`, `app.js`
3. Clic en **"Commit changes"**

**Opción B — Con Git:**
```bash
git init
git add .
git commit -m "LexQR v1"
git remote add origin https://github.com/TU_USUARIO/lexqr.git
git push -u origin main
```

### 3. Activar GitHub Pages
1. Ve a **Settings** → **Pages**
2. En *Source* elige **Deploy from a branch**
3. Branch: **main** / folder: **/ (root)**
4. Clic **Save**
5. En ~2 minutos tu URL estará disponible:
   `https://TU_USUARIO.github.io/lexqr/`

### 4. Acceder desde el teléfono
- Abre esa URL en Safari o Chrome en tu celular
- Para instalarlo como app: **Compartir → Agregar a pantalla de inicio**

---

## 📱 Funcionalidades
- **Dashboard** — KPIs, audiencias del día, tabla de expedientes recientes
- **Expedientes** — Tarjetas con filtro por materia, búsqueda en tiempo real
- **Agenda** — Calendario mensual con eventos, próximas audiencias
- **Clientes** — Directorio con estadísticas
- **Documentos** — Lista con alertas de vencimiento
- **Estadísticas** — Gráficas de materias y audiencias

## 💾 Almacenamiento
Los datos se guardan en `localStorage` del navegador.
**Los datos son solo locales** — cada dispositivo tiene los suyos.

## 🎨 Tecnologías
- HTML + CSS + JS vanilla (sin frameworks, sin dependencias)
- Glassmorphism con backdrop-filter
- Fuentes: Syne + DM Sans (Google Fonts)
- 100% responsive, mobile-first
