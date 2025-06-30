import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { NutritionService, NutritionInfo } from '../services/nutrition.service';

interface Ingredient {
  name: string;
  amount: string;
  unit: string;
  nutrition?: NutritionInfo;
}

interface Recipe {
  id: string;
  title: string;
  ingredients: Ingredient[];
  steps: string[];
  createdAt: Date;
  totalNutrition?: NutritionInfo;
}

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="recipe-form-container">
      <form [formGroup]="recipeForm" (ngSubmit)="onSubmit()" class="recipe-form">
        <div class="form-header">
          <h2>{{ isEditing ? 'Edit Recipe' : 'Create New Recipe' }}</h2>
          <button type="button" class="btn-secondary" (click)="loadRecipes()">
            📋 View All Recipes
          </button>
        </div>

        <!-- Recipe Title -->
        <div class="form-group">
          <label for="title">Recipe Title *</label>
          <input 
            type="text" 
            id="title" 
            formControlName="title" 
            placeholder="Enter recipe title"
            class="form-control"
          >
          <div class="error-message" *ngIf="recipeForm.get('title')?.invalid && recipeForm.get('title')?.touched">
            Recipe title is required
          </div>
        </div>

        <!-- Ingredients Section -->
        <div class="form-section">
          <div class="section-header">
            <h3>🥕 Ingredients</h3>
            <button type="button" class="btn-add" (click)="addIngredient()">
              ➕ Add Ingredient
            </button>
          </div>
          
          <div formArrayName="ingredients" class="ingredients-list">
            <div 
              *ngFor="let ingredient of ingredientsArray.controls; let i = index" 
              [formGroupName]="i"
              class="ingredient-item"
            >
              <div class="ingredient-inputs">
                <input 
                  type="text" 
                  formControlName="name" 
                  placeholder="Ingredient name"
                  class="form-control ingredient-name"
                >
                <input 
                  type="text" 
                  formControlName="amount" 
                  placeholder="Amount"
                  class="form-control ingredient-amount"
                >
                <select formControlName="unit" class="form-control ingredient-unit">
                  <option value="">Unit</option>
                  <option value="g">grams (g)</option>
                  <option value="kg">kilograms (kg)</option>
                  <option value="ml">milliliters (ml)</option>
                  <option value="l">liters (l)</option>
                  <option value="tsp">teaspoon (tsp)</option>
                  <option value="tbsp">tablespoon (tbsp)</option>
                  <option value="cup">cup</option>
                  <option value="piece">piece</option>
                  <option value="slice">slice</option>
                </select>
                <button 
                  type="button" 
                  class="btn-nutrition" 
                  (click)="getNutritionInfo(i)"
                  [disabled]="!ingredient.get('name')?.value || loadingNutrition[i]"
                >
                  {{ loadingNutrition[i] ? '⏳' : '🍎' }} Nutrition
                </button>
                <button 
                  type="button" 
                  class="btn-remove" 
                  (click)="removeIngredient(i)"
                >
                  ❌
                </button>
              </div>
              
              <!-- Nutrition Info Display -->
              <div *ngIf="ingredient.get('nutrition')?.value" class="nutrition-info">
                <div class="nutrition-grid">
                  <div class="nutrition-item">
                    <span class="nutrition-label">Carbs:</span>
                    <span class="nutrition-value">{{ ingredient.get('nutrition')?.value?.carbs }}g</span>
                  </div>
                  <div class="nutrition-item">
                    <span class="nutrition-label">Fat:</span>
                    <span class="nutrition-value">{{ ingredient.get('nutrition')?.value?.fat }}g</span>
                  </div>
                  <div class="nutrition-item">
                    <span class="nutrition-label">Protein:</span>
                    <span class="nutrition-value">{{ ingredient.get('nutrition')?.value?.protein }}g</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Steps Section -->
        <div class="form-section">
          <div class="section-header">
            <h3>👨‍🍳 Cooking Steps</h3>
            <button type="button" class="btn-add" (click)="addStep()">
              ➕ Add Step
            </button>
          </div>
          
          <div formArrayName="steps" class="steps-list">
            <div 
              *ngFor="let step of stepsArray.controls; let i = index" 
              class="step-item"
            >
              <div class="step-input">
                <label [for]="'step-' + i">Step {{ i + 1 }}</label>
                <textarea 
                  [id]="'step-' + i"
                  [formControlName]="i" 
                  placeholder="Describe this cooking step..."
                  class="form-control step-textarea"
                  rows="3"
                ></textarea>
                <button 
                  type="button" 
                  class="btn-remove" 
                  (click)="removeStep(i)"
                >
                  ❌
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="form-actions">
          <button type="submit" class="btn-primary" [disabled]="recipeForm.invalid || isSubmitting">
            {{ isSubmitting ? 'Saving...' : (isEditing ? 'Update Recipe' : 'Save Recipe') }}
          </button>
          <button type="button" class="btn-secondary" (click)="resetForm()">
            Reset Form
          </button>
        </div>
      </form>

      <!-- Recipes List -->
      <div *ngIf="showRecipesList" class="recipes-list">
        <div class="list-header">
          <h3>📚 Saved Recipes</h3>
          <button type="button" class="btn-close" (click)="showRecipesList = false">
            ✕
          </button>
        </div>
        <div class="recipes-grid">
          <div 
            *ngFor="let recipe of recipes" 
            class="recipe-card"
            (click)="editRecipe(recipe)"
          >
            <h4>{{ recipe.title }}</h4>
            <p>{{ recipe.ingredients.length }} ingredients • {{ recipe.steps.length }} steps</p>
            <p class="recipe-date">{{ recipe.createdAt | date:'short' }}</p>
            <div class="recipe-actions">
              <button type="button" class="btn-edit" (click)="editRecipe(recipe); $event.stopPropagation()">
                ✏️ Edit
              </button>
              <button type="button" class="btn-delete" (click)="deleteRecipe(recipe.id); $event.stopPropagation()">
                🗑️ Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .recipe-form-container {
      padding: 30px;
      background: #f8f9fa;
      min-height: 100vh;
    }

    .recipe-form {
      background: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 8px 25px rgba(0,0,0,0.1);
      margin-bottom: 30px;
    }

    .form-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 2px solid #e9ecef;
    }

    .form-header h2 {
      margin: 0;
      color: #2c3e50;
      font-size: 2rem;
    }

    .form-group {
      margin-bottom: 25px;
    }

    .form-section {
      margin-bottom: 40px;
      padding: 25px;
      background: #f8f9fa;
      border-radius: 10px;
      border: 1px solid #e9ecef;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .section-header h3 {
      margin: 0;
      color: #2c3e50;
      font-size: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: #495057;
    }

    .form-control {
      width: 100%;
      padding: 12px 15px;
      border: 2px solid #e9ecef;
      border-radius: 8px;
      font-size: 16px;
      transition: border-color 0.3s ease;
      box-sizing: border-box;
    }

    .form-control:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .error-message {
      color: #dc3545;
      font-size: 14px;
      margin-top: 5px;
    }

    .ingredients-list, .steps-list {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .ingredient-item {
      background: white;
      padding: 20px;
      border-radius: 10px;
      border: 1px solid #dee2e6;
    }

    .ingredient-inputs {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr auto auto;
      gap: 10px;
      align-items: center;
      margin-bottom: 15px;
    }

    .step-item {
      background: white;
      padding: 20px;
      border-radius: 10px;
      border: 1px solid #dee2e6;
    }

    .step-input {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .step-textarea {
      resize: vertical;
      min-height: 80px;
    }

    .nutrition-info {
      background: #e8f5e8;
      padding: 15px;
      border-radius: 8px;
      border-left: 4px solid #28a745;
    }

    .nutrition-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 10px;
    }

    .nutrition-item {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #dee2e6;
    }

    .nutrition-label {
      font-weight: 600;
      color: #495057;
    }

    .nutrition-value {
      color: #28a745;
      font-weight: 600;
    }

    .nutrition-summary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 25px;
      border-radius: 10px;
      margin: 30px 0;
    }

    .nutrition-summary h3 {
      margin: 0 0 20px 0;
      text-align: center;
    }

    .nutrition-summary .nutrition-item {
      border-bottom-color: rgba(255,255,255,0.2);
    }

    .nutrition-summary .nutrition-value {
      color: white;
    }

    .form-actions {
      display: flex;
      gap: 15px;
      justify-content: center;
      margin-top: 30px;
      padding-top: 30px;
      border-top: 2px solid #e9ecef;
    }

    .btn-primary, .btn-secondary, .btn-add, .btn-remove, .btn-nutrition, .btn-edit, .btn-delete, .btn-close {
      padding: 12px 20px;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
    }

    .btn-primary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-secondary {
      background: #6c757d;
      color: white;
    }

    .btn-secondary:hover {
      background: #5a6268;
    }

    .btn-add {
      background: #28a745;
      color: white;
      padding: 8px 15px;
      font-size: 14px;
    }

    .btn-add:hover {
      background: #218838;
    }

    .btn-remove {
      background: #dc3545;
      color: white;
      padding: 8px 12px;
      font-size: 14px;
    }

    .btn-remove:hover {
      background: #c82333;
    }

    .btn-nutrition {
      background: #ffc107;
      color: #212529;
      padding: 8px 15px;
      font-size: 14px;
    }

    .btn-nutrition:hover:not(:disabled) {
      background: #e0a800;
    }

    .btn-nutrition:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .recipes-list {
      background: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 8px 25px rgba(0,0,0,0.1);
    }

    .list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 2px solid #e9ecef;
    }

    .list-header h3 {
      margin: 0;
      color: #2c3e50;
      font-size: 1.8rem;
    }

    .btn-close {
      background: #6c757d;
      color: white;
      padding: 8px 12px;
      font-size: 18px;
    }

    .recipes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }

    .recipe-card {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 10px;
      border: 1px solid #dee2e6;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .recipe-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.1);
    }

    .recipe-card h4 {
      margin: 0 0 10px 0;
      color: #2c3e50;
      font-size: 1.3rem;
    }

    .recipe-card p {
      margin: 5px 0;
      color: #6c757d;
    }

    .recipe-date {
      font-size: 14px;
      color: #adb5bd;
    }

    .recipe-actions {
      display: flex;
      gap: 10px;
      margin-top: 15px;
    }

    .btn-edit {
      background: #17a2b8;
      color: white;
      padding: 6px 12px;
      font-size: 12px;
    }

    .btn-edit:hover {
      background: #138496;
    }

    .btn-delete {
      background: #dc3545;
      color: white;
      padding: 6px 12px;
      font-size: 12px;
    }

    .btn-delete:hover {
      background: #c82333;
    }

    @media (max-width: 768px) {
      .ingredient-inputs {
        grid-template-columns: 1fr;
        gap: 15px;
      }
      
      .form-actions {
        flex-direction: column;
      }
      
      .recipes-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class RecipeFormComponent implements OnInit {
  recipeForm: FormGroup;
  recipes: Recipe[] = [];
  showRecipesList = false;
  isEditing = false;
  isSubmitting = false;
  currentRecipeId: string | null = null;
  loadingNutrition: { [key: number]: boolean } = {};

  constructor(
    private fb: FormBuilder,
    private nutritionService: NutritionService
  ) {
    this.recipeForm = this.fb.group({
      title: ['', Validators.required],
      ingredients: this.fb.array([]),
      steps: this.fb.array([])
    });
  }

  ngOnInit() {
    this.loadRecipes();
    this.addIngredient();
    this.addStep();
  }

  get ingredientsArray() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get stepsArray() {
    return this.recipeForm.get('steps') as FormArray;
  }

  addIngredient() {
    const ingredientGroup = this.fb.group({
      name: ['', Validators.required],
      amount: ['', Validators.required],
      unit: ['', Validators.required],
      nutrition: [null]
    });
    this.ingredientsArray.push(ingredientGroup);
  }

  removeIngredient(index: number) {
    this.ingredientsArray.removeAt(index);
  }

  addStep() {
    this.stepsArray.push(this.fb.control('', Validators.required));
  }

  removeStep(index: number) {
    this.stepsArray.removeAt(index);
  }

  getNutritionInfo(ingredientIndex: number) {
    const ingredientControl = this.ingredientsArray.at(ingredientIndex);
    const ingredientName = ingredientControl.get('name')?.value;

    if (!ingredientName) {
      alert('Please enter an ingredient name first');
      return;
    }

    this.loadingNutrition[ingredientIndex] = true;

    this.nutritionService.getNutritionInfo(ingredientName).subscribe({
      next: (nutritionInfo) => {
        ingredientControl.patchValue({ nutrition: nutritionInfo });
        this.loadingNutrition[ingredientIndex] = false;
      },
      error: (error) => {
        if (error && error.notFound) {
          alert('Nutritional info is not present. Please add the info.');
          const carbs = Number(prompt('Enter carbs (g):', '0'));
          const fat = Number(prompt('Enter fat (g):', '0'));
          const protein = Number(prompt('Enter protein (g):', '0'));
          if (!isNaN(carbs) && !isNaN(fat) && !isNaN(protein)) {
            this.nutritionService.addIngredient({ name: ingredientName, carbs, fat, protein }).subscribe({
              next: () => {
                alert('Ingredient added!');
                ingredientControl.patchValue({ nutrition: { carbs, fat, protein } });
                this.loadingNutrition[ingredientIndex] = false;
              },
              error: () => {
                alert('Failed to add ingredient.');
                this.loadingNutrition[ingredientIndex] = false;
              }
            });
          } else {
            alert('Invalid nutrition values.');
            this.loadingNutrition[ingredientIndex] = false;
          }
        } else if (error && error.status === 0) {
          alert('Could not connect to the nutrition API. Please check your internet connection or try again later.');
          this.loadingNutrition[ingredientIndex] = false;
        } else {
          alert('Failed to fetch nutrition information. Please try again.');
          this.loadingNutrition[ingredientIndex] = false;
        }
      }
    });
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      this.isSubmitting = true;

      const recipeData: Recipe = {
        id: this.currentRecipeId || this.generateId(),
        title: this.recipeForm.value.title,
        ingredients: this.recipeForm.value.ingredients,
        steps: this.recipeForm.value.steps,
        createdAt: new Date()
      };

      // Save to localStorage
      this.saveRecipe(recipeData);

      // Reset form
      this.resetForm();
      this.isSubmitting = false;

      alert(this.isEditing ? 'Recipe updated successfully!' : 'Recipe saved successfully!');
    }
  }

  saveRecipe(recipe: Recipe) {
    const existingRecipes = this.loadRecipesFromStorage();

    if (this.isEditing) {
      const index = existingRecipes.findIndex(r => r.id === recipe.id);
      if (index !== -1) {
        existingRecipes[index] = recipe;
      }
    } else {
      existingRecipes.push(recipe);
    }

    localStorage.setItem('recipes', JSON.stringify(existingRecipes));
    this.recipes = existingRecipes;
  }

  loadRecipes() {
    this.recipes = this.loadRecipesFromStorage();
    this.showRecipesList = true;
  }

  loadRecipesFromStorage(): Recipe[] {
    const stored = localStorage.getItem('recipes');
    if (stored) {
      const recipes = JSON.parse(stored);
      return recipes.map((recipe: any) => ({
        ...recipe,
        createdAt: new Date(recipe.createdAt)
      }));
    }
    return [];
  }

  editRecipe(recipe: Recipe) {
    this.isEditing = true;
    this.currentRecipeId = recipe.id;

    // Clear existing form arrays
    while (this.ingredientsArray.length !== 0) {
      this.ingredientsArray.removeAt(0);
    }
    while (this.stepsArray.length !== 0) {
      this.stepsArray.removeAt(0);
    }

    // Populate form with recipe data
    this.recipeForm.patchValue({
      title: recipe.title
    });

    // Add ingredients
    recipe.ingredients.forEach(ingredient => {
      const ingredientGroup = this.fb.group({
        name: [ingredient.name, Validators.required],
        amount: [ingredient.amount, Validators.required],
        unit: [ingredient.unit, Validators.required],
        nutrition: [ingredient.nutrition || null]
      });
      this.ingredientsArray.push(ingredientGroup);
    });

    // Add steps
    recipe.steps.forEach(step => {
      this.stepsArray.push(this.fb.control(step, Validators.required));
    });

    this.showRecipesList = false;
  }

  deleteRecipe(recipeId: string) {
    if (confirm('Are you sure you want to delete this recipe?')) {
      const existingRecipes = this.loadRecipesFromStorage();
      const updatedRecipes = existingRecipes.filter(recipe => recipe.id !== recipeId);
      localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
      this.recipes = updatedRecipes;
    }
  }

  resetForm() {
    this.recipeForm.reset();
    this.isEditing = false;
    this.currentRecipeId = null;
    this.loadingNutrition = {};

    // Clear arrays
    while (this.ingredientsArray.length !== 0) {
      this.ingredientsArray.removeAt(0);
    }
    while (this.stepsArray.length !== 0) {
      this.stepsArray.removeAt(0);
    }

    // Add default items
    this.addIngredient();
    this.addStep();
  }

  generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
} 