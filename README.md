# SHIFT-2026

[live website]()

## Conventions

> ### !! CREATE BRANCHES
>
> FROM EITHER `FRONT-main` OR `BACK-main` AS `[base]/f/[featName]`  
> Replace `[base]` with `FRONT` or `BACK`  
> Replace `[featName]` with your branch name

> ### !! Create HTML elements in different pages:
>
> > use `.fragment.html` as extension instead of `.html`
>
> How to use:
>
> > `<load file="relativeFilePath" />`
> > `<load file="relativeFilePath" />`

> ### !! CSS variables
>
> Load in variable files in style.css since these will most likely be used on every page, no need to load them into
> individual css files

> ### TESTING:
>
> `FRONT-test` can be used to test deploy to dev.shiftfestival.be for now

## Tech Stack

### Frameworks & Libraries

#### Frontend

- **Framework:** React `^19.2.7`
- **Build Tool:** Vite `^8.0.0`
- **misc:** `react-router` `^7.16.0`

#### Backend

- **Framework:** Express `^5.2.1`
- **Runtime:** Node.js

#### PHP

- **Library:** PHPMailer `^6.9`

### Detailed Versions

#### Frontend Dependencies

- `react`: `^19.2.7`

#### Frontend Dev Dependencies

- `@vitejs/plugin-react`: `^6.0.2`
- `react-dom`: `^19.2.7`
- `react-router`: `^7.16.0`
- `vite`: `^8.0.0`

#### Backend Dependencies

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

#### PHP Dependencies

- `phpmailer/phpmailer`: `^6.9`

## Deployment

### Frontend

The frontend is built with Vite.

```bash
cd Frontend
npm install
npm run build
npm run preview
```

A `.env` file is required.

The output is in the `Frontend/dist` directory.

Deployment of the frontend branches in this repo is automated by the Github workflows in `/.github/workflows`. The frontend gets redeployed to the dev site when pushing to FRONT-test and the live website gets redeployed on a push to main with changes in `/Frontend/`.

### Backend

The backend is a Node.js application.

#### Native

```bash
cd Backend
pnpm install
pnpm start
```

A `.env` file is required.

#### Docker

```bash
cd Backend
docker-compose up --build -d
```

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

## References & Sources

- [countdown timer from w3](https://www.w3schools.com/howto/howto_js_countdown.asp)
    - used in [countdown.js](Frontend/src/js/countdown.js)

- [Plus & Minus input from Codepen](https://codepen.io/Rajesh-Pal-the-scripter/pen/QWzEWjG)
    - Used in [Ticket page (html, css & js)](Frontend/pages/tickets)

- [hamburger menu from earlier project](https://github.com/EHB-MCT/web2-course-project-front-end-JoachimGautama)
    - used in nav.css
    - used in header.fragment.html

- [Display image from input file tag from W3Collective](https://w3collective.com/preview-selected-img-file-input-js/)
    - Used in [login-3de (css, js)](Frontend/pages/login-3de)

- [remove
  `/pages/` from links and paths in build while keeping the file structure automation](https://claude.ai/share/44dab821-2592-4ca3-8bc7-5f12b0bfd702)
    - used in vite.config.js removePageSegment()

- [Profile Icon for default image](https://www.flaticon.com/free-icon/user_149071?related_id=149071&origin=search)
    - Used
      in [ProjectPageDetails.jsx](Frontend/src/projecten/details/ProjectPageDetails.jsx) & [ProjectCard.jsx](Frontend/src/projecten/ProjectCard.jsx)

- [Claude conversation for linking & showing PDF button](https://claude.ai/share/d6f34345-02dc-420b-8cce-af09fd83e019)
    - Used in  [ProjectenPage.jsx](Frontend/src/projecten/details/ProjectenPage.jsx)