import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, TrendingDown, Store } from "lucide-react";

interface GroceryItem {
  name: string;
  category: string;
  carrefourPrice: number;
  luluPrice: number;
  unit: string;
}

export const GroceryPriceComparison = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const groceryItems: GroceryItem[] = [
    { name: "Milk (1L)", category: "Dairy", carrefourPrice: 7.5, luluPrice: 6.75, unit: "per liter" },
    { name: "Eggs (30 pack)", category: "Dairy", carrefourPrice: 18, luluPrice: 15.5, unit: "per pack" },
    { name: "Butter (500g)", category: "Dairy", carrefourPrice: 22, luluPrice: 20, unit: "per pack" },
    { name: "Yogurt (1kg)", category: "Dairy", carrefourPrice: 12, luluPrice: 10.5, unit: "per kg" },
    
    { name: "Chicken Breast (1kg)", category: "Meat", carrefourPrice: 26, luluPrice: 22, unit: "per kg" },
    { name: "Beef (1kg)", category: "Meat", carrefourPrice: 48, luluPrice: 45, unit: "per kg" },
    { name: "Fish (1kg)", category: "Meat", carrefourPrice: 35, luluPrice: 32, unit: "per kg" },
    
    { name: "Rice (5kg bag)", category: "Staples", carrefourPrice: 45, luluPrice: 38, unit: "per bag" },
    { name: "Flour (2kg)", category: "Staples", carrefourPrice: 12, luluPrice: 10, unit: "per bag" },
    { name: "Cooking Oil (1.8L)", category: "Staples", carrefourPrice: 18, luluPrice: 15.5, unit: "per bottle" },
    { name: "Pasta (500g)", category: "Staples", carrefourPrice: 8, luluPrice: 7, unit: "per pack" },
    
    { name: "Tomatoes (1kg)", category: "Produce", carrefourPrice: 9, luluPrice: 7.5, unit: "per kg" },
    { name: "Potatoes (2kg)", category: "Produce", carrefourPrice: 8, luluPrice: 6.5, unit: "per bag" },
    { name: "Onions (1kg)", category: "Produce", carrefourPrice: 5, luluPrice: 4, unit: "per kg" },
    { name: "Bananas (1kg)", category: "Produce", carrefourPrice: 7, luluPrice: 6, unit: "per kg" },
    { name: "Apples (1kg)", category: "Produce", carrefourPrice: 12, luluPrice: 10, unit: "per kg" },
    
    { name: "Sliced Bread", category: "Bakery", carrefourPrice: 6.5, luluPrice: 5.5, unit: "per loaf" },
    { name: "Arabic Bread (pack)", category: "Bakery", carrefourPrice: 4, luluPrice: 3.5, unit: "per pack" },
    
    { name: "Dish Soap", category: "Cleaning", carrefourPrice: 15, luluPrice: 12, unit: "per bottle" },
    { name: "Laundry Detergent (3L)", category: "Cleaning", carrefourPrice: 28, luluPrice: 24, unit: "per bottle" },
    { name: "Toilet Paper (12 roll)", category: "Cleaning", carrefourPrice: 22, luluPrice: 18, unit: "per pack" },
  ];

  const categories = Array.from(new Set(groceryItems.map(item => item.category)));

  const toggleItem = (itemName: string) => {
    setSelectedItems(prev =>
      prev.includes(itemName)
        ? prev.filter(i => i !== itemName)
        : [...prev, itemName]
    );
  };

  const selectAllInCategory = (category: string) => {
    const categoryItems = groceryItems.filter(item => item.category === category).map(item => item.name);
    const allSelected = categoryItems.every(item => selectedItems.includes(item));
    
    if (allSelected) {
      setSelectedItems(prev => prev.filter(item => !categoryItems.includes(item)));
    } else {
      setSelectedItems(prev => [...new Set([...prev, ...categoryItems])]);
    }
  };

  const calculateTotals = () => {
    const selected = groceryItems.filter(item => selectedItems.includes(item.name));
    
    const carrefourTotal = selected.reduce((sum, item) => sum + item.carrefourPrice, 0);
    const luluTotal = selected.reduce((sum, item) => sum + item.luluPrice, 0);
    const savings = carrefourTotal - luluTotal;
    const savingsPercentage = carrefourTotal > 0 ? (savings / carrefourTotal * 100).toFixed(1) : 0;

    return {
      carrefourTotal,
      luluTotal,
      savings,
      savingsPercentage,
      itemCount: selected.length,
    };
  };

  const totals = calculateTotals();

  const getSavingsColor = (carrefourPrice: number, luluPrice: number) => {
    const savings = ((carrefourPrice - luluPrice) / carrefourPrice * 100);
    if (savings >= 15) return "text-green-600 font-semibold";
    if (savings >= 10) return "text-blue-600 font-semibold";
    return "text-muted-foreground";
  };

  return (
    <Card className="my-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="w-6 h-6" />
          Grocery Price Comparison Tool
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground mb-2">
            Select items from your typical shopping list to compare total costs between Carrefour and Lulu. 
            See how much you can save by choosing the right store!
          </p>
        </div>

        {/* Item Selection by Category */}
        <div className="space-y-6">
          {categories.map((category) => {
            const categoryItems = groceryItems.filter(item => item.category === category);
            const allSelected = categoryItems.every(item => selectedItems.includes(item.name));
            
            return (
              <div key={category} className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b">
                  <h3 className="text-lg font-semibold">{category}</h3>
                  <button
                    onClick={() => selectAllInCategory(category)}
                    className="text-sm text-primary hover:underline"
                  >
                    {allSelected ? "Deselect All" : "Select All"}
                  </button>
                </div>
                
                <div className="grid gap-3">
                  {categoryItems.map((item) => {
                    const isSelected = selectedItems.includes(item.name);
                    const savings = item.carrefourPrice - item.luluPrice;
                    const savingsPercent = (savings / item.carrefourPrice * 100).toFixed(0);
                    
                    return (
                      <div
                        key={item.name}
                        className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                          isSelected ? "bg-primary/5 border-primary" : "hover:bg-muted/50"
                        }`}
                        onClick={() => toggleItem(item.name)}
                      >
                        <div className="flex items-start gap-3">
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => toggleItem(item.name)}
                            className="mt-1"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              <p className="font-medium">{item.name}</p>
                              <Badge variant="outline" className="text-xs">
                                Save {savingsPercent}%
                              </Badge>
                            </div>
                            <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground text-xs">Carrefour</p>
                                <p className="font-semibold">QAR {item.carrefourPrice.toFixed(2)}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground text-xs">Lulu</p>
                                <p className={getSavingsColor(item.carrefourPrice, item.luluPrice)}>
                                  QAR {item.luluPrice.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Totals Summary */}
        {totals.itemCount > 0 && (
          <div className="mt-8 p-6 bg-primary/5 rounded-lg border-2 border-primary/20 space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Store className="w-5 h-5" />
              Shopping Basket Comparison
            </h3>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-background rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Items Selected</p>
                <p className="text-2xl font-bold">{totals.itemCount}</p>
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
                    <p className="text-sm text-muted-foreground">You Save with Lulu</p>
                    <p className="text-3xl font-bold text-green-600">QAR {totals.savings.toFixed(2)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Savings Percentage</p>
                  <p className="text-2xl font-bold text-green-600">{totals.savingsPercentage}%</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t space-y-2">
              <h4 className="font-semibold text-sm">Annual Savings Projection:</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Weekly</p>
                  <p className="font-bold text-foreground">QAR {(totals.savings * 1).toFixed(0)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Monthly</p>
                  <p className="font-bold text-foreground">QAR {(totals.savings * 4).toFixed(0)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Yearly</p>
                  <p className="font-bold text-green-600">QAR {(totals.savings * 52).toFixed(0)}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {totals.itemCount === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Select items from the list above to see your potential savings</p>
          </div>
        )}

        {/* Shopping Strategy Tip */}
        {totals.itemCount > 0 && (
          <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold mb-2 text-sm">Smart Shopping Strategy:</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Do your main shop at Lulu for staples and fresh produce (15-20% savings)</li>
              <li>• Visit Carrefour for specialty European products and non-food items</li>
              <li>• Check weekly promotions - both stores offer rotating deals</li>
              <li>• Use loyalty cards at both stores for additional discounts</li>
              <li>• Consider local produce markets for vegetables (30-40% cheaper)</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
