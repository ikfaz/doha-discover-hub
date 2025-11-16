import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar, CheckCircle2, AlertCircle, Download } from "lucide-react";
import { format, addMonths, addDays, differenceInDays } from "date-fns";

interface ChecklistItem {
  id: string;
  task: string;
  timeframe: string;
  daysBeforeTravel: number;
  completed: boolean;
}

const PetImportChecklist = () => {
  const [travelDate, setTravelDate] = useState<string>("");
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { id: "1", task: "Verify pet breed is not prohibited in Qatar", timeframe: "3-6 months before", daysBeforeTravel: 180, completed: false },
    { id: "2", task: "Ensure pet has ISO-compliant microchip (15-digit)", timeframe: "3-6 months before", daysBeforeTravel: 180, completed: false },
    { id: "3", task: "Update rabies vaccination (must be at least 21 days old)", timeframe: "3-6 months before", daysBeforeTravel: 150, completed: false },
    { id: "4", task: "Conduct rabies titer test at OIE-approved laboratory", timeframe: "3-6 months before", daysBeforeTravel: 120, completed: false },
    { id: "5", task: "Research and select airline with pet transport policy", timeframe: "2-3 months before", daysBeforeTravel: 90, completed: false },
    { id: "6", task: "Purchase IATA-compliant travel crate", timeframe: "2-3 months before", daysBeforeTravel: 75, completed: false },
    { id: "7", task: "Apply for Qatar import permit through WOQOD system", timeframe: "1 month before", daysBeforeTravel: 30, completed: false },
    { id: "8", task: "Gather all vaccination records and documentation", timeframe: "1 month before", daysBeforeTravel: 30, completed: false },
    { id: "9", task: "Book airline cargo/cabin space for pet", timeframe: "1 month before", daysBeforeTravel: 30, completed: false },
    { id: "10", task: "Schedule pre-travel veterinary examination", timeframe: "10-14 days before", daysBeforeTravel: 12, completed: false },
    { id: "11", task: "Obtain health certificate from government veterinarian", timeframe: "Within 10 days", daysBeforeTravel: 8, completed: false },
    { id: "12", task: "Administer parasite treatment (internal & external)", timeframe: "Within 48 hours", daysBeforeTravel: 2, completed: false },
    { id: "13", task: "Reconfirm flight and pet transport with airline", timeframe: "2-3 days before", daysBeforeTravel: 3, completed: false },
    { id: "14", task: "Prepare all original documents for customs", timeframe: "1 day before", daysBeforeTravel: 1, completed: false },
  ]);

  const toggleItem = (id: string) => {
    setChecklist(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const completedCount = checklist.filter(item => item.completed).length;
  const totalCount = checklist.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  const getDaysUntilTravel = () => {
    if (!travelDate) return null;
    return differenceInDays(new Date(travelDate), new Date());
  };

  const getItemStatus = (daysBeforeTravel: number) => {
    const daysUntil = getDaysUntilTravel();
    if (daysUntil === null) return "neutral";
    if (daysUntil > daysBeforeTravel) return "upcoming";
    if (daysUntil <= daysBeforeTravel && daysUntil >= 0) return "urgent";
    return "overdue";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "urgent": return "text-amber-600";
      case "overdue": return "text-destructive";
      case "upcoming": return "text-muted-foreground";
      default: return "text-muted-foreground";
    }
  };

  const downloadChecklist = () => {
    const checklistText = checklist
      .map(item => `${item.completed ? "✓" : "☐"} ${item.task} (${item.timeframe})`)
      .join("\n");
    
    const blob = new Blob([`Pet Import Checklist for Qatar\n\nTravel Date: ${travelDate || "Not set"}\n\n${checklistText}`], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "qatar-pet-import-checklist.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="w-full my-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Pet Import Checklist Generator
        </CardTitle>
        <CardDescription>
          Track your pet import requirements and get personalized deadline reminders
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="travel-date">Your Travel Date to Qatar</Label>
          <Input
            id="travel-date"
            type="date"
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
            min={format(new Date(), "yyyy-MM-dd")}
          />
          {travelDate && (
            <p className="text-sm text-muted-foreground">
              {getDaysUntilTravel()! > 0 
                ? `${getDaysUntilTravel()} days until travel`
                : `Travel date has passed`}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium">Progress: {completedCount}/{totalCount} completed</p>
              <div className="w-full bg-secondary h-2 rounded-full mt-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={downloadChecklist}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>

          <div className="space-y-3">
            {checklist.map((item) => {
              const status = getItemStatus(item.daysBeforeTravel);
              return (
                <div
                  key={item.id}
                  className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                    item.completed 
                      ? "bg-secondary/50 border-secondary" 
                      : status === "urgent" 
                      ? "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900" 
                      : status === "overdue"
                      ? "bg-destructive/10 border-destructive/20"
                      : "bg-background border-border"
                  }`}
                >
                  <Checkbox
                    id={item.id}
                    checked={item.completed}
                    onCheckedChange={() => toggleItem(item.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label
                      htmlFor={item.id}
                      className={`cursor-pointer ${item.completed ? "line-through text-muted-foreground" : ""}`}
                    >
                      {item.task}
                    </Label>
                    <p className={`text-xs mt-1 ${getStatusColor(status)}`}>
                      {item.timeframe}
                      {travelDate && status === "urgent" && !item.completed && (
                        <span className="ml-2 font-semibold">⚠ Due soon!</span>
                      )}
                      {travelDate && status === "overdue" && !item.completed && (
                        <span className="ml-2 font-semibold">⚠ Overdue!</span>
                      )}
                    </p>
                  </div>
                  {item.completed && <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />}
                  {!item.completed && status === "urgent" && <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0" />}
                  {!item.completed && status === "overdue" && <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />}
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-4 bg-secondary rounded-lg">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Important Reminders
          </h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Health certificate must be issued within 10 days of travel</li>
            <li>• Rabies vaccination must be at least 21 days old</li>
            <li>• Parasite treatment required within 48 hours before departure</li>
            <li>• Import permit approval typically takes 3-7 business days</li>
            <li>• Book pet cargo space early - limited availability on flights</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default PetImportChecklist;
