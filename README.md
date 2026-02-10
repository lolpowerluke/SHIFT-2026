# SHIFT-2026

[live website]()

> ### !! CREATE BRANCHES
>
> FROM EITHER `FRONT-main` OR `BACK-main` AS `[base]/f/[featName]`  
> Replace `[base]` with `FRONT` or `BACK`  
> Replace `[featName]` with your branch name

> !! Create HTML elements in different pages:
>
> > use .fragment.html as extension instead of .html

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
