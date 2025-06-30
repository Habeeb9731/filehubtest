import { Routes } from '@angular/router';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';

export const routes: Routes = [
    { path: '', component: RecipeFormComponent },
    { path: '**', redirectTo: '' }
]; 