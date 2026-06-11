# SHIFT-2026

- Live Website: https://shiftfestival.be  
- Development: https://dev.shiftfestival.be  

---

## Code Repository

https://github.com/lolpowerluke/SHIFT-2026  

---

## Conventions

> ### !! CREATE BRANCHES
>
> FROM EITHER `FRONT-main` OR `BACK-main` AS `[base]/f/[featName]`  
> Replace `[base]` with `FRONT` or `BACK`  
> Replace `[featName]` with your branch name  

---

> ### !! Create HTML elements in different pages
>
> Use `.fragment.html` instead of `.html`
>
> Usage:
>
> `<load file="relativeFilePath" />`

---

> ### !! CSS variables
>
> Load variables in `style.css` since they are shared across pages.

---

> ### TESTING
>
> `FRONT-test` is used for deployment testing on:
> dev.shiftfestival.be

---

## Tech Stack

### Languages
- JavaScript (ES6+)
- HTML5
- CSS3

---

### Backend
- Runtime: Node.js v22.19.0
- Framework: Express ^5.2.1

---

### Frontend
- Build Tool: Vite ^7.3.1
- React ^19.2.6
- React DOM ^19.2.7
- React Router ^7.16.0

---

## Used Packages

### Backend
- cors ^2.8.6
- dotenv ^17.2.4
- jsonwebtoken ^9.0.3
- mysql2 ^3.16.3
- validator ^13.15.35
- bcrypt ^6.0.0
- multer ^2.1.1
- nodemailer ^8.0.4
- cloudinary ^2.10.0

---

### Frontend
- vite-plugin-html-inject ^1.1.2 (dev dependency)

---

## Services

### Cloudinary
Used for image and media storage.

- Backend: `Backend/src/utils/cloudinary.js`
- Frontend: `Frontend/src/utils/cloudinary.js`

---

### Mail Service
- Provider: Combell SMTP (smtp-auth.mailprotect.be)
- Library: Nodemailer
- Config: `Backend/src/utils/mailer.js`

---

### Database
- System: MySQL
- Access: mysql2
- Setup: Docker (docker-compose.yml)

---

## Configuration Files

### Frontend
- package.json
- vite.config.js
- .env.example

### Backend
- package.json
- docker-compose.yml
- Dockerfile (if used)
- .env (not committed)
- src/server.js

---

## Deployment

Deployment of the frontend is automated using GitHub Actions workflows located in:

`.github/workflows/`

---

### CI/CD Workflow

The project uses automated deployment pipelines:

- Pushing to `FRONT-test` triggers automatic deployment to the development environment:
  - https://dev.shiftfestival.be

- Pushing changes to `main` (from `/Frontend/`) triggers automatic deployment to production:
  - https://shiftfestival.be

These deployments ensure continuous integration and delivery of the frontend application.

---

### Manual Frontend Build (reference)

```bash
cd Frontend
npm install
npm run build