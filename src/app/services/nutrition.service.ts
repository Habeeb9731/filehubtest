import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

export interface NutritionInfo {
    carbs: number;
    fat: number;
    protein: number;
}

@Injectable({
    providedIn: 'root'
})
export class NutritionService {
    private readonly API_BASE_URL = 'https://api.abdulhabeeb.de/api/ingredients';

    constructor(private http: HttpClient) { }

    /**
     * Fetch nutrition information for an ingredient
     * @param ingredientName - The name of the ingredient to search for
     * @returns Observable of NutritionInfo
     */
    getNutritionInfo(ingredientName: string): Observable<NutritionInfo> {
        const params = new HttpParams().set('ingredient', ingredientName);
        return this.http.get<any>(this.API_BASE_URL, { params }).pipe(
            map(response => this.parseNutritionResponse(response)),
            catchError(err => {
                if (err.status === 404) {
                    console.warn('Ingredient not found (404):', ingredientName);
                    return throwError(() => ({ notFound: true }));
                }
                console.error('Failed to fetch nutrition info:', err);
                return throwError(() => err);
            })
        );
    }

    /**
     * Add a new ingredient to the API
     */
    addIngredient(ingredient: { name: string; carbs: number; fat: number; protein: number }): Observable<any> {
        return this.http.post(this.API_BASE_URL, ingredient, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        }).pipe(
            catchError(err => {
                console.error('Failed to add ingredient:', err);
                return throwError(() => err);
            })
        );
    }

    /**
     * Try to get nutrition info, and if not found, add it and then fetch again
     */
    getOrAddIngredient(ingredient: { name: string; carbs: number; fat: number; protein: number }): Observable<NutritionInfo> {
        return this.getNutritionInfo(ingredient.name).pipe(
            catchError(err => {
                if (err.notFound) {
                    // Add and then fetch again
                    return this.addIngredient(ingredient).pipe(
                        switchMap(() => this.getNutritionInfo(ingredient.name))
                    );
                }
                return throwError(() => err);
            })
        );
    }

    /**
     * Parse the API response to extract nutrition information
     */
    private parseNutritionResponse(response: any): NutritionInfo {
        // The API returns a JSON object with nutritional values
        return {
            carbs: Number(response.carbs),
            fat: Number(response.fat),
            protein: Number(response.protein)
        };
    }

    /**
     * Submit two new ingredients (for demo/testing)
     */
    submitTwoIngredients(): Observable<any[]> {
        const ing1 = { name: 'DemoIngredient1', carbs: 10, fat: 2, protein: 3 };
        const ing2 = { name: 'DemoIngredient2', carbs: 20, fat: 5, protein: 7 };
        return this.addIngredient(ing1).pipe(
            switchMap(res1 => this.addIngredient(ing2).pipe(
                map(res2 => [res1, res2])
            )),
            catchError(err => {
                console.error('Error submitting demo ingredients:', err);
                return throwError(() => err);
            })
        );
    }
} 