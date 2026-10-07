# Tycoon Motors - Cloud Computing Lab 3 (PaaS on Netlify)

A small vehicle showroom website used to demonstrate **PaaS** deployment.
Netlify builds and hosts the site and runs the serverless function. No server is managed by us.

## Project structure

```
tycoon-motors/
├── index.html                          # The website (HTML, CSS, JS)
├── netlify.toml                        # Netlify build settings
├── package.json                        # Dependencies for the function
├── functions/
│   └── api.mjs                         # Serverless function: GET /api/vehicles
└── database/
    └── migrations/
        └── 001_create_vehicles.sql     # Creates and seeds the vehicles table
```

## How to deploy

1. Create a new GitHub repository and upload **all files and folders above** to the repository root.
2. Log in to Netlify and click **Add new site -> Import an existing project**.
3. Choose **GitHub** and select your repository.
4. Leave the build settings as they are (they come from `netlify.toml`) and click **Deploy site**.
5. Open **Site settings -> Change site name** and set a custom name.
6. Open your live link.

## Database (optional)

If a Netlify Database is connected, the function reads vehicles from it and creates the table automatically.
If not, the site shows built-in sample data. The badge on the page shows which source is in use.

## SaaS vs PaaS

| | SaaS (Odoo) | PaaS (Netlify) |
|---|---|---|
| What we do | Use ready-made software | Deploy our own code |
| Who manages servers | Odoo | Netlify |
