# Recipe Nutrition App (Frontend)

This project is a frontend for managing recipes and checking nutritional information using a custom-built nutrition API.

## 📋 Requirements
- Node.js (v18 or above recommended)
- Angular CLI (`npm install -g @angular/cli`)
- A modern browser

## 🚀 Installation & Running Locally

Clone the repo:

```bash
git clone https://github.com/your-username/recipe-nutrition-app.git
cd recipe-nutrition-app
```

Install dependencies:

```bash
npm install
```

Start the Angular app:

```bash
ng serve
```

Then open your browser at [http://localhost:4200](http://localhost:4200)

## 🔁 API Integration Notes
Originally, the project was intended to integrate with the mock Interview Nutrition API provided in the coding challenge.

However, due to repeated 401 Unauthorized errors and lack of working credentials, I created a custom temporary backend instead.

### ✅ Replacement API
`https://api.abdulhabeeb.de/api/ingredients`

#### 🔹 Supported Methods
- **GET** `/api/ingredients?ingredient=apple`
  - Returns nutritional values for the given ingredient.
- **POST** `/api/ingredients`
  - Accepts a JSON body like:

```json
{
  "name": "ingredient-name",
  "carbs": 10.0,
  "fat": 2.0,
  "protein": 3.5
}
```

## 🧠 Tools Used
- Angular (frontend)
- Supabase (backend DB)
- Vercel (API hosting)
- Cursor (AI code editor)
- ChatGPT (AI guidance and code generation)

## 🗓️ Date
Built on: June 30, 2025

## Features

### 🍳 Recipe Management
- **Dynamic Recipe Form**: Create recipes with title, ingredients, and cooking steps
- **Dynamic Lists**: Add/remove ingredients and steps dynamically
- **Form Validation**: Comprehensive validation for all required fields
- **Edit & Delete**: Full CRUD operations for saved recipes

### 🥕 Ingredients Management
- **Dynamic Ingredient List**: Add unlimited ingredients with amounts and units
- **Unit Selection**: Predefined units (grams, kilograms, milliliters, liters, teaspoons, tablespoons, cups, pieces, slices)
- **Nutrition Integration**: Fetch nutritional information for each ingredient

### 📊 Nutrition Features
- **Nutrition API Integration**: Fetch real nutritional data using Basic Auth
- **Per-Ingredient Nutrition**: Individual nutrition info for each ingredient
- **Total Nutrition Calculation**: Automatic calculation of total recipe nutrition
- **Nutrition Display**: Beautiful nutrition cards with detailed breakdown

### 💾 Data Persistence
- **localStorage Support**: All recipes are automatically saved to browser storage
- **Data Recovery**: Recipes persist across browser sessions
- **Export/Import Ready**: Easy to extend for data export functionality

### 🎨 Modern UI/UX
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Beautiful Interface**: Modern gradient design with smooth animations
- **Loading States**: Visual feedback during API calls
- **Accessibility**: Proper focus states and screen reader support

## Technology Stack

- **Angular 17**: Latest Angular framework with standalone components
- **TypeScript**: Type-safe development
- **Reactive Forms**: Dynamic form handling
- **HTTP Client**: API integration
- **localStorage**: Client-side data persistence
- **CSS Grid/Flexbox**: Modern layout techniques

## Setup Instructions

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd recipe-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

   ```
   
   If you don't configure the API, the application will use mock data for demonstration purposes.

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200`

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Usage Guide

### Creating a Recipe

1. **Enter Recipe Title**: Provide a descriptive name for your recipe
2. **Add Ingredients**: 
   - Click "Add Ingredient" to add new ingredients
   - Enter ingredient name, amount, and select unit
   - Click "🍎 Nutrition" to fetch nutritional information
3. **Add Cooking Steps**:
   - Click "Add Step" to add cooking instructions
   - Numbered steps are automatically generated
4. **Save Recipe**: Click "Save Recipe" to store in localStorage

### Managing Recipes

- **View All Recipes**: Click "📋 View All Recipes" to see saved recipes
- **Edit Recipe**: Click the edit button on any recipe card
- **Delete Recipe**: Click the delete button to remove a recipe
- **Nutrition Summary**: View total nutrition information for each recipe

### Nutrition Information

- **Individual Ingredients**: Each ingredient can have its own nutrition data
- **Automatic Calculation**: Total nutrition is calculated automatically
- **API Integration**: Real nutrition data is fetched when available
- **Fallback Data**: Mock data is used when API is unavailable

## Project Structure

```
src/
├── app/
│   ├── recipe-form/
│   │   └── recipe-form.component.ts    # Main recipe form component
│   ├── services/
│   │   └── nutrition.service.ts        # Nutrition API service
│   ├── app.component.ts                # Root application component
│   ├── app.config.ts                   # Application configuration
│   └── app.routes.ts                   # Routing configuration
├── styles.css                          # Global styles
├── main.ts                             # Application entry point
└── index.html                          # Main HTML file
```

## API Integration

### Nutrition API Configuration

The application is configured to work with nutrition APIs that support Basic Authentication. The current implementation includes:

- **Edamam Food Database API**: Popular nutrition database
- **Basic Auth Support**: Secure API authentication
- **Error Handling**: Graceful fallback to mock data
- **Loading States**: Visual feedback during API calls

### Customizing the API

To integrate with a different nutrition API:

1. Update the `API_BASE_URL` in `nutrition.service.ts`
2. Modify the `parseNutritionResponse()` method to match your API's response format
3. Update the authentication method if needed
4. Adjust the nutrition data structure as required

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Local Storage

All recipe data is stored in the browser's localStorage with the key `recipes`. The data structure includes:

```typescript
interface Recipe {
  id: string;
  title: string;
  ingredients: Ingredient[];
  steps: string[];
  createdAt: Date;
  totalNutrition?: NutritionInfo;
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or issues:
- Check the documentation above
- Review the code comments
- Open an issue in the repository

## Future Enhancements

- [ ] Recipe categories and tags
- [ ] Recipe search and filtering
- [ ] Recipe sharing functionality
- [ ] Image upload for recipes
- [ ] Recipe scaling (serving size adjustment)
- [ ] Export to PDF/print functionality
- [ ] Recipe ratings and reviews
- [ ] Meal planning calendar
- [ ] Shopping list generation
- [ ] Recipe import from URLs 