# Recipe Manager Demo Guide

## Quick Start Demo

### 1. Start the Application
```bash
npm start
```
The application will be available at `http://localhost:4200`

### 2. Create Your First Recipe

#### Step 1: Enter Recipe Title
- Type a recipe title in the "Recipe Title" field
- Example: "Chicken Pasta Carbonara"

#### Step 2: Add Ingredients
- Click "➕ Add Ingredient" to add ingredients
- For each ingredient, fill in:
  - **Name**: "Chicken breast"
  - **Amount**: "200"
  - **Unit**: "g" (grams)
- Click "🍎 Nutrition" to fetch nutritional information
- Repeat for more ingredients:
  - "Pasta": "100g"
  - "Eggs": "2" "piece"
  - "Parmesan cheese": "50g"

#### Step 3: Add Cooking Steps
- Click "➕ Add Step" to add cooking instructions
- Enter step-by-step instructions:
  1. "Boil pasta according to package instructions"
  2. "Cook chicken breast in a pan until golden brown"
  3. "Mix eggs and cheese in a bowl"
  4. "Combine all ingredients and serve hot"

#### Step 4: Save Recipe
- Click "Save Recipe" to store in localStorage
- You'll see a success message

### 3. View and Manage Recipes

#### View All Recipes
- Click "📋 View All Recipes" to see saved recipes
- Each recipe card shows:
  - Recipe title
  - Number of ingredients and steps
  - Creation date
  - Edit and delete buttons

#### Edit a Recipe
- Click the "✏️ Edit" button on any recipe
- The form will be populated with existing data
- Make changes and click "Update Recipe"

#### Delete a Recipe
- Click the "🗑️ Delete" button
- Confirm deletion in the popup

### 4. Nutrition Features

#### Individual Ingredient Nutrition
- Each ingredient can have its own nutrition data
- Click "🍎 Nutrition" after entering an ingredient name
- View calories, protein, carbs, fat, and fiber

#### Total Recipe Nutrition
- Automatic calculation of total nutrition
- Displayed in a beautiful summary card
- Updates in real-time as you add/remove ingredients

### 5. Advanced Features

#### Dynamic Lists
- Add unlimited ingredients and steps
- Remove any item with the "❌" button
- Form validation ensures all required fields are filled

#### Responsive Design
- Test on different screen sizes
- Mobile-friendly interface
- Touch-optimized buttons

#### Data Persistence
- All recipes are saved automatically
- Data persists across browser sessions
- No data loss when refreshing the page

## Sample Recipe Ideas

### Quick Breakfast
**Title**: "Avocado Toast with Eggs"
**Ingredients**:
- Whole grain bread: 2 slices
- Avocado: 1 piece
- Eggs: 2 piece
- Salt: 1 tsp
- Black pepper: 1 tsp

**Steps**:
1. Toast the bread until golden brown
2. Mash avocado and spread on toast
3. Fry eggs to your preference
4. Place eggs on avocado toast
5. Season with salt and pepper

### Healthy Lunch
**Title**: "Quinoa Buddha Bowl"
**Ingredients**:
- Quinoa: 1 cup
- Chickpeas: 1 cup
- Sweet potato: 1 piece
- Kale: 2 cups
- Olive oil: 2 tbsp

**Steps**:
1. Cook quinoa according to package instructions
2. Roast sweet potato cubes in oven
3. Sauté kale with olive oil
4. Combine all ingredients in a bowl
5. Add your favorite dressing

## Troubleshooting

### Nutrition API Issues
- If nutrition data doesn't load, the app uses mock data
- Check browser console for API errors
- Verify API credentials in `nutrition.service.ts`

### Form Validation
- All fields marked with * are required
- Ensure ingredient amounts are numeric
- Select appropriate units for ingredients

### Data Loss
- Recipes are stored in localStorage
- Clear browser data will remove saved recipes
- Consider backing up important recipes

## Tips for Best Experience

1. **Use Descriptive Titles**: Make recipe titles specific and memorable
2. **Be Precise with Measurements**: Use consistent units for better nutrition calculation
3. **Add Detailed Steps**: Break down cooking instructions into clear, numbered steps
4. **Fetch Nutrition Data**: Always click the nutrition button for accurate nutritional information
5. **Save Frequently**: Recipes are auto-saved, but it's good practice to save after major changes

## Browser Compatibility

The application works best on:
- Chrome (latest version)
- Firefox (latest version)
- Safari (latest version)
- Edge (latest version)

For optimal experience, ensure JavaScript is enabled and localStorage is available. 