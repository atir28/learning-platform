# Installation Instructions

## Prerequisites
✅ Node.js 18+ installed
✅ npm 9+ installed
✅ Angular CLI installed globally

If not installed:
```bash
npm install -g @angular/cli
```

## Step-by-Step Installation

### 1. Navigate to Project
```bash
cd /Users/agiri/Documents/claude
```

### 2. Install Dependencies
```bash
npm install
```

This installs:
- Angular 19
- Angular Material
- Tailwind CSS
- RxJS
- TypeScript
- All dev dependencies

### 3. Install Material (if needed)
```bash
ng add @angular/material
```

When prompted:
- Theme: `Custom`
- Prebuilt theme: `Indigo/Pink` (or your choice)
- HammerJS: `Yes`
- Animations: `Yes`

### 4. Verify Installation
```bash
ng version
```

Should show Angular 19.x.x

## Running the Project

### Development Server
```bash
ng serve
# or npm start
```

Visit: `http://localhost:4200`

### Production Build
```bash
ng build --configuration production
```

Output: `dist/learning-platform/`

### Run Tests
```bash
ng test
```

## Troubleshooting

### Port 4200 Already in Use
```bash
ng serve --port 4201
```

### Dependency Issues
```bash
rm -rf node_modules package-lock.json
npm install
```

### Material Theme Issues
Ensure `src/index.html` includes:
```html
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
```

### Tailwind Not Working
Check that `src/styles/tailwind.css` imports:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## File Structure Check

Verify these exist:
```
✓ package.json
✓ angular.json
✓ tsconfig.json
✓ tailwind.config.js
✓ postcss.config.js
✓ karma.conf.js
✓ src/main.ts
✓ src/index.html
✓ src/app/app.component.ts
✓ src/app/app.routes.ts
✓ src/app/app.config.ts
✓ src/styles/tailwind.css
```

## Environment Configuration

Default configs:
- **Development**: `http://localhost:3000/api`
- **Production**: `https://api.example.com/api`

See `src/environments/environment.ts`

## Next Steps

1. Read `QUICKSTART.md`
2. Read `ARCHITECTURE.md`
3. Run `ng serve`
4. Explore the app at `http://localhost:4200`
5. Follow `FEATURE_GUIDE.md` to add features

## Quick Commands Reference

```bash
# Start development server
ng serve

# Build for production
ng build --configuration production

# Run tests
ng test

# Generate component
ng generate component features/[role]/[feature]/[component]

# Generate service
ng generate service core/services/[service]

# Format code
ng lint

# View Angular version
ng version

# Update Angular (careful!)
ng update @angular/cli @angular/core
```

## Support

If you encounter issues:
1. Check `SETUP.md` troubleshooting section
2. Verify Node/npm versions match prerequisites
3. Try clearing cache: `rm -rf .angular/cache`
4. Reinstall dependencies: `npm install`
5. Check Angular CLI documentation: https://angular.io/cli

---

Ready to develop! 🚀
