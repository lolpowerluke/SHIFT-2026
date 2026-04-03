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
> Load in variable files in style.css since these will most likely be used on every page, no need to load them into individual css files

> ### TESTING:
>
> `FRONT-test` can be used to test deploy to dev.shiftfestival.be for now

## Tech Stack

### Languages

- JavaScript (ES6+)
- HTML5
- CSS3

### Backend

- **Runtime:** Node.js 18+
- **Framework:** Express ^5.2.1

### Frontend

- **Build Tool:** Vite ^7.3.1

### Used Packages

#### Backend

- cors ^2.8.6
- dotenv ^17.2.4

#### Frontend

- [vite-plugin-html-inject](https://www.npmjs.com/package/vite-plugin-html-inject) ^1.1.2
    - Dev Dependency
    - used for modular HTML elements

## Sources

- [countdown timer from w3](https://www.w3schools.com/howto/howto_js_countdown.asp)
    - used in countdown.js

- [Plus & Minus input from Codepen](https://codepen.io/Rajesh-Pal-the-scripter/pen/QWzEWjG)
    - Used in [Ticket page (html, css & js)](Frontend/pages/tickets)

- [Hamburger Menu from Codepen](https://codepen.io/erikterwan/pen/grOZxx)
    - Used in [Style.css](Frontend/src/css/style.css) & [header.fragments.html](Frontend/htmlComponents/header.fragment.html)

- [Display image from input file tag from W3Collective](https://w3collective.com/preview-selected-img-file-input-js/)
    - Used in [project-form (html, css, js)](Frontend\login\project-form)
