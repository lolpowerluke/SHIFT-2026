# SHIFT-2026 Documentation

This document provides a comprehensive overview of the SHIFT-2026 project, including its architecture, dependencies, and configuration.

## Code Repository

TODO: Add a link to the code repository.

## Services

### Cloudinary
- **Purpose:** Used for image and media management.
- **Configuration:** `Backend/src/utils/cloudinary.js`, `Frontend/src/utils/cloudinary.js`

### Mail Service
- **Provider:** Combell (via `smtp-auth.mailprotect.be`)
- **Library:** Nodemailer `^8.0.4`
- **Configuration:** `Backend/src/utils/mailer.js`

### Database
- **Type:** MySQL
- **Version:** `8.0` (from Docker image)
- **Library:** `mysql2` `^3.16.3`
- **Configuration:** `Backend/src/config/db.js`, `Backend/docker-compose.yml`

## Configuration Files

### Frontend
- `.env.example`: Example environment variables for the frontend.
- `vite.config.js`: Vite configuration.
- `package.json`: Frontend dependencies and scripts.

### Backend
- `.env` (required, not committed): Environment variables for the backend. See `Backend/src/utils/env.js` for expected variables.
- `docker-compose.yml`: Docker configuration for the database.
- `package.json`: Backend dependencies and scripts.

### PHP
- `config/db.php`: Database connection settings.
- `config/env.php`: Environment settings.
- `config/mailer.php`: Mailer configuration.
- `composer.json`: PHP dependencies.

## Frameworks & Libraries

### Frontend
- **Framework:** React `^19.2.7`
- **Build Tool:** Vite `^8.0.0`
- **Routing:** `react-router` `^7.16.0`

### Backend
- **Framework:** Express `^5.2.1`
- **Runtime:** Node.js
    - TODO: Specify Node.js version.

### PHP
- **Library:** PHPMailer `^6.9`

## Server Details

### Operating System
- TODO: Specify the production server OS.

### Backend Server
- **Type:** Node.js with Express.
- **Configuration:** `Backend/src/server.js`

### Database Server
- **Type:** MySQL
- **Version:** 8.0
- **Configuration:** Managed via Docker as defined in `Backend/docker-compose.yml`.

## Detailed Versions

### Frontend Dependencies
- `react`: `^19.2.7`
- `vite-plugin-html-inject`: `^1.1.2`

### Frontend Dev Dependencies
- `@vitejs/plugin-react`: `^6.0.2`
- `react-dom`: `^19.2.7`
- `react-router`: `^7.16.0`
- `vite`: `^8.0.0`

### Backend Dependencies
- `bcrypt`: `^6.0.0`
- `cloudinary`: `^2.10.0`
- `cors`: `^2.8.6`
- `dotenv`: `^17.2.4`
- `express`: `^5.2.1`
- `jsonwebtoken`: `^9.0.3`
- `multer`: `^2.1.1`
- `mysql2`: `^3.16.3`
- `nodemailer`: `^8.0.4`
- `validator`: `^13.15.35`

### PHP Dependencies
- `phpmailer/phpmailer`: `^6.9`

## References & Sources

- [Countdown timer from w3](https://www.w3schools.com/howto/howto_js_countdown.asp)
- [Plus & Minus input from Codepen](https://codepen.io/Rajesh-Pal-the-scripter/pen/QWzEWjG)
- [Hamburger menu from earlier project](https://github.com/EHB-MCT/web2-course-project-front-end-JoachimGautama)
- [Display image from input file tag from W3Collective](https://w3collective.com/preview-selected-img-file-input-js/)
- [Remove `/pages/` from links and paths in build while keeping the file structure automation](https://claude.ai/share/44dab821-2592-4ca3-8bc7-5f12b0bfd702)
- [Profile Icon for default image](https.www.flaticon.com/free-icon/user_149071?related_id=149071&origin=search)
- [Claude conversation for linking & showing PDF button](https://claude.ai/share/d6f34345-02dc-420b-8cce-af09fd83e019)
