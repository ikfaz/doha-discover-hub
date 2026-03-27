import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { PieChart as PieChartIcon, BarChart3 } from 'lucide-react';

interface ExpenseCategory {
  id: string;
  name: string;
  amount: number;
  isCustom: boolean;
}

interface BudgetChartsProps {
  expenses: ExpenseCategory[];
  currency: string;
  convertCurrency: (amount: number) => string;
  totalExpenses: number;
}

const COLORS = [
  'hsl(349, 91%, 25%)',   // Maroon (primary)
  'hsl(44, 47%, 53%)',    // Gold (secondary)
  'hsl(210, 40%, 60%)',   // Blue
  'hsl(150, 50%, 50%)',   // Green
  'hsl(280, 60%, 60%)',   // Purple
  'hsl(30, 70%, 55%)',    // Orange
  'hsl(190, 60%, 50%)',   // Cyan
  'hsl(340, 75%, 55%)',   // Pink
  'hsl(60, 70%, 60%)',    // Yellow
  'hsl(120, 45%, 50%)',   // Light Green
  'hsl(200, 60%, 55%)',   // Light Blue
];

const BudgetCharts: React.FC<BudgetChartsProps> = ({ 
  expenses, 
  currency, 
  convertCurrency,
  totalExpenses 
}) => {
  // Prepare data for pie chart - only show expenses with amounts > 0
  const pieData = expenses
    .filter(expense => expense.amount > 0)
    .map((expense, index) => ({
      name: expense.name,
      value: Number(convertCurrency(expense.amount)),
      originalAmount: expense.amount,
      percentage: ((expense.amount / totalExpenses) * 100).toFixed(1),
      color: COLORS[index % COLORS.length],
    }))
    .sort((a, b) => b.value - a.value);

  // Prepare data for bar chart - top 10 expenses
  const barData = expenses
    .filter(expense => expense.amount > 0)
    .map((expense) => ({
      name: expense.name.length > 20 ? expense.name.substring(0, 20) + '...' : expense.name,
      fullName: expense.name,
      amount: Number(convertCurrency(expense.amount)),
      originalAmount: expense.amount,
    }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 10);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-popover border border-border rounded-lg shadow-lg p-3">
          <p className="font-semibold text-sm">{data.payload.fullName || data.name}</p>
          <p className="text-sm text-primary font-medium">
            {data.value.toFixed(2)} {currency}
          </p>
          {data.payload.percentage && (
            <p className="text-xs text-muted-foreground">
              {data.payload.percentage}% of total
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percentage }: any) => {
    if (parseFloat(percentage) < 5) return null; // Don't show labels for small slices
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-xs font-semibold"
      >
        {`${percentage}%`}
      </text>
    );
  };

  if (pieData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Budget Visualization</CardTitle>
          <CardDescription>Add expenses to see visual breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            No expenses to display
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Visualization</CardTitle>
        <CardDescription>
          Interactive charts showing your expense breakdown and comparisons
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pie" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pie" className="flex items-center gap-2">
              <PieChartIcon className="h-4 w-4" />
              Expense Breakdown
            </TabsTrigger>
            <TabsTrigger value="bar" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Category Comparison
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pie" className="mt-6">
            <div className="w-full">
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomLabel}
                    outerRadius={140}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    formatter={(value, entry: any) => {
                      const item = pieData.find(d => d.name === value);
                      return `${value} (${item?.percentage}%)`;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 text-center text-sm text-muted-foreground">
                Total Monthly Expenses: {totalExpenses.toFixed(2)} QAR ({convertCurrency(totalExpenses)} {currency})
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bar" className="mt-6">
            <div className="w-full">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={barData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    tick={{ fill: 'hsl(var(--foreground))' }}
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    tick={{ fill: 'hsl(var(--foreground))' }}
                    label={{ 
                      value: `Amount (${currency})`, 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { fill: 'hsl(var(--foreground))' }
                    }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="amount" 
                    fill="hsl(var(--primary))"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 text-center text-sm text-muted-foreground">
                Top {Math.min(barData.length, 10)} expense categories by amount
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BudgetCharts;
