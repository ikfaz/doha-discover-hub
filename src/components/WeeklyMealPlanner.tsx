import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, ShoppingBasket, TrendingDown, ChefHat } from "lucide-react";

interface Ingredient {
  name: string;
  amount: string;
  category: string;
  carrefourPrice: number;
  luluPrice: number;
}

interface Recipe {
  id: string;
  name: string;
  servings: number;
  ingredients: Ingredient[];
}

export const WeeklyMealPlanner = () => {
  const [meals, setMeals] = useState<Record<string, string>>({
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
  });

  const recipes: Recipe[] = [
    {
      id: "chicken-rice",
      name: "Chicken with Rice",
      servings: 4,
      ingredients: [
        { name: "Chicken Breast", amount: "1kg", category: "Meat", carrefourPrice: 26, luluPrice: 22 },
        { name: "Rice", amount: "500g", category: "Staples", carrefourPrice: 4.5, luluPrice: 3.8 },
        { name: "Onions", amount: "500g", category: "Produce", carrefourPrice: 2.5, luluPrice: 2 },
        { name: "Tomatoes", amount: "500g", category: "Produce", carrefourPrice: 4.5, luluPrice: 3.75 },
        { name: "Cooking Oil", amount: "200ml", category: "Staples", carrefourPrice: 2, luluPrice: 1.7 },
      ],
    },
    {
      id: "pasta-tomato",
      name: "Pasta with Tomato Sauce",
      servings: 4,
      ingredients: [
        { name: "Pasta", amount: "500g", category: "Staples", carrefourPrice: 8, luluPrice: 7 },
        { name: "Tomatoes", amount: "1kg", category: "Produce", carrefourPrice: 9, luluPrice: 7.5 },
        { name: "Onions", amount: "250g", category: "Produce", carrefourPrice: 1.25, luluPrice: 1 },
        { name: "Garlic", amount: "100g", category: "Produce", carrefourPrice: 2, luluPrice: 1.5 },
        { name: "Cooking Oil", amount: "100ml", category: "Staples", carrefourPrice: 1, luluPrice: 0.85 },
      ],
    },
    {
      id: "beef-curry",
      name: "Beef Curry",
      servings: 4,
      ingredients: [
        { name: "Beef", amount: "1kg", category: "Meat", carrefourPrice: 48, luluPrice: 45 },
        { name: "Potatoes", amount: "1kg", category: "Produce", carrefourPrice: 4, luluPrice: 3.25 },
        { name: "Onions", amount: "500g", category: "Produce", carrefourPrice: 2.5, luluPrice: 2 },
        { name: "Yogurt", amount: "500g", category: "Dairy", carrefourPrice: 6, luluPrice: 5.25 },
        { name: "Rice", amount: "500g", category: "Staples", carrefourPrice: 4.5, luluPrice: 3.8 },
      ],
    },
    {
      id: "fish-vegetables",
      name: "Grilled Fish with Vegetables",
      servings: 4,
      ingredients: [
        { name: "Fish", amount: "1kg", category: "Meat", carrefourPrice: 35, luluPrice: 32 },
        { name: "Mixed Vegetables", amount: "1kg", category: "Produce", carrefourPrice: 10, luluPrice: 8 },
        { name: "Potatoes", amount: "500g", category: "Produce", carrefourPrice: 2, luluPrice: 1.6 },
        { name: "Cooking Oil", amount: "100ml", category: "Staples", carrefourPrice: 1, luluPrice: 0.85 },
      ],
    },
    {
      id: "vegetable-stir-fry",
      name: "Vegetable Stir-Fry",
      servings: 4,
      ingredients: [
        { name: "Mixed Vegetables", amount: "1.5kg", category: "Produce", carrefourPrice: 15, luluPrice: 12 },
        { name: "Rice", amount: "500g", category: "Staples", carrefourPrice: 4.5, luluPrice: 3.8 },
        { name: "Onions", amount: "250g", category: "Produce", carrefourPrice: 1.25, luluPrice: 1 },
        { name: "Cooking Oil", amount: "150ml", category: "Staples", carrefourPrice: 1.5, luluPrice: 1.3 },
      ],
    },
    {
      id: "chicken-shawarma",
      name: "Chicken Shawarma",
      servings: 4,
      ingredients: [
        { name: "Chicken Breast", amount: "1kg", category: "Meat", carrefourPrice: 26, luluPrice: 22 },
        { name: "Arabic Bread", amount: "1 pack", category: "Bakery", carrefourPrice: 4, luluPrice: 3.5 },
        { name: "Tomatoes", amount: "500g", category: "Produce", carrefourPrice: 4.5, luluPrice: 3.75 },
        { name: "Yogurt", amount: "500g", category: "Dairy", carrefourPrice: 6, luluPrice: 5.25 },
        { name: "Onions", amount: "250g", category: "Produce", carrefourPrice: 1.25, luluPrice: 1 },
      ],
    },
    {
      id: "biryani",
      name: "Chicken Biryani",
      servings: 4,
      ingredients: [
        { name: "Chicken Breast", amount: "1kg", category: "Meat", carrefourPrice: 26, luluPrice: 22 },
        { name: "Rice", amount: "1kg", category: "Staples", carrefourPrice: 9, luluPrice: 7.6 },
        { name: "Onions", amount: "500g", category: "Produce", carrefourPrice: 2.5, luluPrice: 2 },
        { name: "Tomatoes", amount: "500g", category: "Produce", carrefourPrice: 4.5, luluPrice: 3.75 },
        { name: "Yogurt", amount: "500g", category: "Dairy", carrefourPrice: 6, luluPrice: 5.25 },
        { name: "Cooking Oil", amount: "200ml", category: "Staples", carrefourPrice: 2, luluPrice: 1.7 },
      ],
    },
  ];

  const days = [
    { key: "monday", label: "Monday" },
    { key: "tuesday", label: "Tuesday" },
    { key: "wednesday", label: "Wednesday" },
    { key: "thursday", label: "Thursday" },
    { key: "friday", label: "Friday" },
    { key: "saturday", label: "Saturday" },
    { key: "sunday", label: "Sunday" },
  ];

  const handleMealChange = (day: string, recipeId: string) => {
    setMeals(prev => ({ ...prev, [day]: recipeId }));
  };

  const clearPlan = () => {
    setMeals({
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
      saturday: "",
      sunday: "",
    });
  };

  const generateShoppingList = () => {
    const ingredientMap = new Map<string, Ingredient>();

    Object.values(meals).forEach(recipeId => {
      if (!recipeId) return;
      const recipe = recipes.find(r => r.id === recipeId);
      if (!recipe) return;

      recipe.ingredients.forEach(ingredient => {
        const existing = ingredientMap.get(ingredient.name);
        if (existing) {
          // For simplicity, we're adding prices (in real app, would handle quantities properly)
          ingredientMap.set(ingredient.name, {
            ...existing,
            carrefourPrice: existing.carrefourPrice + ingredient.carrefourPrice,
            luluPrice: existing.luluPrice + ingredient.luluPrice,
            amount: `${existing.amount} + ${ingredient.amount}`,
          });
        } else {
          ingredientMap.set(ingredient.name, { ...ingredient });
        }
      });
    });

    return Array.from(ingredientMap.values());
  };

  const calculateTotals = (shoppingList: Ingredient[]) => {
    const carrefourTotal = shoppingList.reduce((sum, item) => sum + item.carrefourPrice, 0);
    const luluTotal = shoppingList.reduce((sum, item) => sum + item.luluPrice, 0);
    const savings = carrefourTotal - luluTotal;
    const savingsPercentage = carrefourTotal > 0 ? (savings / carrefourTotal * 100).toFixed(1) : 0;

    return { carrefourTotal, luluTotal, savings, savingsPercentage };
  };

  const shoppingList = generateShoppingList();
  const totals = calculateTotals(shoppingList);
  const categories = Array.from(new Set(shoppingList.map(item => item.category)));
  const mealsPlanned = Object.values(meals).filter(m => m !== "").length;

  return (
    <Card className="my-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChefHat className="w-6 h-6" />
          Weekly Meal Planner & Shopping List Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            Plan your weekly meals and automatically generate a shopping list with price comparisons between Carrefour and Lulu. 
            Select a recipe for each day to see total costs and savings.
          </p>
        </div>

        {/* Meal Planning Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <CalendarDays className="w-5 h-5" />
              Weekly Meal Plan
            </h3>
            {mealsPlanned > 0 && (
              <Button onClick={clearPlan} variant="outline" size="sm">
                Clear Plan
              </Button>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {days.map(day => (
              <div key={day.key} className="space-y-2">
                <Label htmlFor={day.key} className="font-semibold">{day.label}</Label>
                <Select value={meals[day.key]} onValueChange={(value) => handleMealChange(day.key, value)}>
                  <SelectTrigger id={day.key} className="bg-background">
                    <SelectValue placeholder="Select a meal" />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    <SelectItem value="">No meal</SelectItem>
                    {recipes.map(recipe => (
                      <SelectItem key={recipe.id} value={recipe.id}>
                        {recipe.name} ({recipe.servings} servings)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </div>

        {/* Shopping List */}
        {shoppingList.length > 0 && (
          <div className="space-y-4 pt-6 border-t">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <ShoppingBasket className="w-5 h-5" />
              Your Shopping List ({shoppingList.length} items)
            </h3>

            <div className="space-y-4">
              {categories.map(category => {
                const categoryItems = shoppingList.filter(item => item.category === category);
                return (
                  <div key={category} className="space-y-2">
                    <h4 className="font-semibold text-sm text-primary pb-1 border-b">{category}</h4>
                    <div className="space-y-2">
                      {categoryItems.map((item, idx) => (
                        <div key={`${item.name}-${idx}`} className="p-3 bg-muted/30 rounded-lg">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-xs text-muted-foreground">{item.amount}</p>
                            </div>
                            <div className="flex gap-4 text-sm">
                              <div className="text-right">
                                <p className="text-xs text-muted-foreground">Carrefour</p>
                                <p className="font-semibold">QAR {item.carrefourPrice.toFixed(2)}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-xs text-muted-foreground">Lulu</p>
                                <p className="font-semibold text-green-600">QAR {item.luluPrice.toFixed(2)}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Cost Summary */}
        {shoppingList.length > 0 && (
          <div className="p-6 bg-primary/5 rounded-lg border-2 border-primary/20 space-y-4">
            <h3 className="text-xl font-bold">Weekly Shopping Cost Comparison</h3>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-background rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Meals Planned</p>
                <p className="text-2xl font-bold">{mealsPlanned}/7 days</p>
              </div>

              <div className="p-4 bg-background rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Carrefour Total</p>
                <p className="text-2xl font-bold">QAR {totals.carrefourTotal.toFixed(2)}</p>
              </div>

              <div className="p-4 bg-background rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Lulu Total</p>
                <p className="text-2xl font-bold text-green-600">QAR {totals.luluTotal.toFixed(2)}</p>
              </div>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Weekly Savings with Lulu</p>
                    <p className="text-3xl font-bold text-green-600">QAR {totals.savings.toFixed(2)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Savings Percentage</p>
                  <p className="text-2xl font-bold text-green-600">{totals.savingsPercentage}%</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-800">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Monthly Savings (4 weeks)</p>
                    <p className="text-xl font-bold text-green-600">QAR {(totals.savings * 4).toFixed(0)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Annual Savings (52 weeks)</p>
                    <p className="text-xl font-bold text-green-600">QAR {(totals.savings * 52).toFixed(0)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {shoppingList.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            <CalendarDays className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Select meals for the week to generate your shopping list</p>
          </div>
        )}

        {/* Tips */}
        {shoppingList.length > 0 && (
          <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold mb-2 text-sm">Smart Shopping Tips:</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Shop at Lulu for these ingredients to maximize savings</li>
              <li>• Buy staples (rice, oil) in bulk for additional savings</li>
              <li>• Check weekly promotions before shopping - prices may be even lower</li>
              <li>• Consider meal prep on weekends to save time during the week</li>
              <li>• Adjust recipe quantities based on your family size</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
