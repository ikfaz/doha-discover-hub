import React, { useState, useEffect, useMemo } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import BudgetCharts from '@/components/BudgetCharts';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { Download, Plus, Trash2, Calculator, DollarSign, Users, User } from 'lucide-react';

interface ExpenseCategory {
  id: string;
  name: string;
  amount: number;
  isCustom: boolean;
}

const currencyRates: Record<string, number> = {
  QAR: 1,
  USD: 0.275,
  EUR: 0.252,
  GBP: 0.217,
  AED: 1.01,
  SAR: 1.03,
  INR: 22.94,
  PKR: 76.39,
};

const singleTemplate: ExpenseCategory[] = [
  { id: '1', name: 'Rent (1-bed apartment)', amount: 6500, isCustom: false },
  { id: '2', name: 'Utilities (electricity, water, AC)', amount: 500, isCustom: false },
  { id: '3', name: 'Groceries', amount: 1500, isCustom: false },
  { id: '4', name: 'Transportation (car/metro)', amount: 3000, isCustom: false },
  { id: '5', name: 'Mobile & Internet', amount: 350, isCustom: false },
  { id: '6', name: 'Dining Out', amount: 2000, isCustom: false },
  { id: '7', name: 'Entertainment', amount: 1000, isCustom: false },
  { id: '8', name: 'Healthcare', amount: 300, isCustom: false },
  { id: '9', name: 'Personal Care', amount: 300, isCustom: false },
  { id: '10', name: 'Savings', amount: 2000, isCustom: false },
];

const familyTemplate: ExpenseCategory[] = [
  { id: '1', name: 'Rent (3-bed villa/apartment)', amount: 14000, isCustom: false },
  { id: '2', name: 'Utilities', amount: 1500, isCustom: false },
  { id: '3', name: 'Groceries', amount: 4000, isCustom: false },
  { id: '4', name: 'School Fees (per child)', amount: 10000, isCustom: false },
  { id: '5', name: 'Transportation (2 vehicles)', amount: 5000, isCustom: false },
  { id: '6', name: 'Mobile & Internet', amount: 500, isCustom: false },
  { id: '7', name: 'Dining & Entertainment', amount: 3500, isCustom: false },
  { id: '8', name: 'Healthcare', amount: 800, isCustom: false },
  { id: '9', name: 'Domestic Help', amount: 2000, isCustom: false },
  { id: '10', name: 'Children Activities', amount: 1500, isCustom: false },
  { id: '11', name: 'Savings', amount: 5000, isCustom: false },
];

const BudgetPlanner = () => {
  const [template, setTemplate] = useState<'single' | 'family'>('single');
  const [currency, setCurrency] = useState<string>('QAR');
  const [expenses, setExpenses] = useState<ExpenseCategory[]>(singleTemplate);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [salary, setSalary] = useState<number>(20000);
  const faqItems = useMemo(
    () => [
      {
        question: 'What monthly salary is enough for a single expat in Doha?',
        answer:
          'It depends on rent and lifestyle, but many single professionals target a salary that allows at least a 20% savings rate after essentials.',
      },
      {
        question: 'How much should families budget for living in Doha?',
        answer:
          'Families usually spend most on housing, schooling, and transport. Use the family template as a baseline, then adjust to your neighborhood and school choices.',
      },
      {
        question: 'Are the exchange rates in this planner exact?',
        answer:
          'Rates are approximate planning values. For final financial decisions, verify rates with your bank or transfer provider on the day you transact.',
      },
      {
        question: 'Does this planner include Qatar income tax?',
        answer:
          'No personal income tax is applied in Qatar. The planner focuses on monthly living expenses and savings potential.',
      },
    ],
    [],
  );

  useEffect(() => {
    setExpenses(template === 'single' ? singleTemplate : familyTemplate);
    setSalary(template === 'single' ? 20000 : 45000);
  }, [template]);

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remainingBudget = salary - totalExpenses;
  const savingsRate = salary > 0 ? ((remainingBudget / salary) * 100).toFixed(1) : 0;

  const convertCurrency = (amount: number) => {
    return (amount * currencyRates[currency]).toFixed(2);
  };
  const toolJsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Doha Expat Budget Planner',
      url: 'https://experiencedoha.com/budget-planner',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      description:
        'Interactive Doha budget calculator for expats to estimate monthly costs, compare templates, and plan savings.',
    }),
    [],
  );
  const faqJsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    }),
    [faqItems],
  );

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a category name',
        variant: 'destructive',
      });
      return;
    }

    const newCategory: ExpenseCategory = {
      id: Date.now().toString(),
      name: newCategoryName,
      amount: 0,
      isCustom: true,
    };

    setExpenses([...expenses, newCategory]);
    setNewCategoryName('');
    toast({
      title: 'Success',
      description: 'Category added successfully',
    });
  };

  const handleDeleteCategory = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
    toast({
      title: 'Deleted',
      description: 'Category removed',
    });
  };

  const handleUpdateAmount = (id: string, amount: number) => {
    setExpenses(expenses.map(expense =>
      expense.id === id ? { ...expense, amount: Math.max(0, amount) } : expense
    ));
  };

  const handleDownload = () => {
    const currencySymbol = currency === 'QAR' ? 'QAR' : currency;
    const data = [
      '=== DOHA EXPAT BUDGET PLANNER ===',
      `Template: ${template === 'single' ? 'Single Professional' : 'Family of Four'}`,
      `Currency: ${currency}`,
      `Monthly Salary: ${convertCurrency(salary)} ${currencySymbol}`,
      '',
      '=== MONTHLY EXPENSES ===',
      ...expenses.map(exp => `${exp.name}: ${convertCurrency(exp.amount)} ${currencySymbol}`),
      '',
      `Total Expenses: ${convertCurrency(totalExpenses)} ${currencySymbol}`,
      `Remaining Budget: ${convertCurrency(remainingBudget)} ${currencySymbol}`,
      `Savings Rate: ${savingsRate}%`,
      '',
      '=== NOTES ===',
      '- All amounts are monthly estimates',
      '- Actual costs may vary based on lifestyle and location',
      '- Consider employer benefits and allowances',
      '- Qatar has no personal income tax',
      '',
      `Generated: ${new Date().toLocaleDateString()}`,
    ].join('\n');

    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `doha-budget-${template}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: 'Downloaded',
      description: 'Your budget plan has been downloaded',
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="Doha Budget Planner 2026: Estimate Expat Living Costs Free"
        description="Free Doha budget planner for expats. Estimate rent, food, transport, and school fees, then track your monthly savings target."
        jsonLd={[toolJsonLd, faqJsonLd]}
      />
      <NavBar />
      
      <main className="flex-grow bg-gradient-to-b from-muted/30 to-background">
        <div className="content-container">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-primary mb-4">
              Doha Expat Budget Planner
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Plan your monthly expenses and calculate your savings potential with our interactive budget planner.
              Choose a template, customize categories, and convert currencies.
            </p>
          </div>

          {/* Template Selection */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Choose Your Template
              </CardTitle>
              <CardDescription>
                Select a budget template that matches your situation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={template} onValueChange={(v) => setTemplate(v as 'single' | 'family')}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="single" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Single Professional
                  </TabsTrigger>
                  <TabsTrigger value="family" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Family of Four
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>

          {/* Budget Visualization Charts */}
          <BudgetCharts 
            expenses={expenses}
            currency={currency}
            convertCurrency={convertCurrency}
            totalExpenses={totalExpenses}
          />

          <div className="grid lg:grid-cols-3 gap-8 mt-8">
            {/* Budget Input */}
            <div className="lg:col-span-2 space-y-6">
              {/* Salary & Currency */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Income & Currency
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="salary">Monthly Salary (QAR)</Label>
                    <Input
                      id="salary"
                      type="number"
                      value={salary}
                      onChange={(e) => setSalary(Number(e.target.value))}
                      min={0}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="currency">Display Currency</Label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger id="currency" className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="QAR">QAR - Qatari Riyal</SelectItem>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                        <SelectItem value="AED">AED - UAE Dirham</SelectItem>
                        <SelectItem value="SAR">SAR - Saudi Riyal</SelectItem>
                        <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                        <SelectItem value="PKR">PKR - Pakistani Rupee</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Expense Categories */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Expenses</CardTitle>
                  <CardDescription>
                    Adjust amounts to match your expected lifestyle
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {expenses.map((expense) => (
                      <div key={expense.id} className="flex items-center gap-3">
                        <div className="flex-grow">
                          <Label htmlFor={expense.id} className="text-sm font-medium">
                            {expense.name}
                          </Label>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-muted-foreground w-12">QAR</span>
                            <Input
                              id={expense.id}
                              type="number"
                              value={expense.amount}
                              onChange={(e) => handleUpdateAmount(expense.id, Number(e.target.value))}
                              min={0}
                              className="flex-grow"
                            />
                            <span className="text-sm font-medium text-foreground w-32 text-right">
                              {convertCurrency(expense.amount)} {currency}
                            </span>
                          </div>
                        </div>
                        {expense.isCustom && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteCategory(expense.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>

                  <Separator className="my-6" />

                  {/* Add Custom Category */}
                  <div className="space-y-3">
                    <Label htmlFor="newCategory">Add Custom Category</Label>
                    <div className="flex gap-2">
                      <Input
                        id="newCategory"
                        placeholder="e.g., Gym Membership, Sports Club, etc."
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && newCategoryName.trim() && handleAddCategory()}
                        className="flex-1"
                      />
                      <Button 
                        onClick={handleAddCategory} 
                        className="flex items-center gap-2"
                        disabled={!newCategoryName.trim()}
                      >
                        <Plus className="h-4 w-4" />
                        Add
                      </Button>
                    </div>
                    {newCategoryName.trim() && (
                      <p className="text-xs text-muted-foreground">
                        ✓ Ready to add "{newCategoryName}"
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Summary Sidebar */}
            <div className="space-y-6">
              {/* Budget Summary */}
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Budget Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Monthly Salary</span>
                      <span className="font-semibold">{convertCurrency(salary)} {currency}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Total Expenses</span>
                      <span className="font-semibold text-destructive">-{convertCurrency(totalExpenses)} {currency}</span>
                    </div>
                    <Separator className="my-3" />
                    <div className="flex justify-between text-base mb-1">
                      <span className="font-semibold">Remaining</span>
                      <span className={`font-bold text-lg ${remainingBudget >= 0 ? 'text-green-600' : 'text-destructive'}`}>
                        {convertCurrency(remainingBudget)} {currency}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-muted-foreground">Savings Rate</span>
                      <Badge variant={Number(savingsRate) >= 20 ? 'default' : 'secondary'}>
                        {savingsRate}%
                      </Badge>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-xs text-muted-foreground mb-2">
                      <span>Expenses</span>
                      <span>{((totalExpenses / salary) * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-secondary/20 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all ${
                          totalExpenses > salary ? 'bg-destructive' : 'bg-primary'
                        }`}
                        style={{ width: `${Math.min((totalExpenses / salary) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Download Button */}
                  <Button onClick={handleDownload} className="w-full flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download Budget Plan
                  </Button>

                  {/* Tips */}
                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <h4 className="font-semibold text-sm">💡 Budget Tips</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Aim for 20-30% savings rate</li>
                      <li>• Qatar has no income tax</li>
                      <li>• Negotiate housing allowances</li>
                      <li>• Consider employer benefits</li>
                      <li>• Shop at local markets to save</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Exchange Rate Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Current Exchange Rates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-xs">
                    {Object.entries(currencyRates).map(([curr, rate]) => (
                      <div key={curr} className="flex justify-between">
                        <span className="text-muted-foreground">1 QAR =</span>
                        <span className="font-medium">{rate.toFixed(3)} {curr}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    Rates are approximate and updated periodically
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <section className="py-12">
          <div className="content-container">
            <h2 className="text-3xl font-bold font-heading mb-6 text-primary">Budget Planner FAQs</h2>
            <div className="space-y-4">
              {faqItems.map((faq) => (
                <article key={faq.question} className="rounded-lg border bg-background p-5">
                  <h3 className="text-lg font-semibold text-foreground">{faq.question}</h3>
                  <p className="mt-2 text-muted-foreground">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BudgetPlanner;
