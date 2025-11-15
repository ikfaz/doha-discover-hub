import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export const TherapyCostCalculator = () => {
  const [sessionsPerMonth, setSessionsPerMonth] = useState(4);
  const [qatarCostPerSession, setQatarCostPerSession] = useState(500);
  const [onlineCostPerSession, setOnlineCostPerSession] = useState(150);
  const [insuranceCoverage, setInsuranceCoverage] = useState(0);
  const [currency, setCurrency] = useState("QAR");

  const exchangeRates: { [key: string]: number } = {
    QAR: 1,
    USD: 3.64,
    EUR: 3.98,
    GBP: 4.62,
  };

  const convertToQAR = (amount: number, fromCurrency: string) => {
    return amount * exchangeRates[fromCurrency];
  };

  const qatarMonthly = qatarCostPerSession * sessionsPerMonth;
  const qatarAfterInsurance = qatarMonthly * (1 - insuranceCoverage / 100);
  
  const onlineMonthlyInSelectedCurrency = onlineCostPerSession * sessionsPerMonth;
  const onlineMonthlyQAR = convertToQAR(onlineMonthlyInSelectedCurrency, currency);
  const onlineAfterInsurance = onlineMonthlyQAR * (1 - insuranceCoverage / 100);

  const savings = qatarAfterInsurance - onlineAfterInsurance;
  const savingsPercentage = qatarAfterInsurance > 0 ? ((savings / qatarAfterInsurance) * 100).toFixed(1) : 0;

  return (
    <Card className="my-8">
      <CardHeader>
        <CardTitle>Therapy Cost Comparison Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="sessions">Sessions per Month: {sessionsPerMonth}</Label>
              <Slider
                id="sessions"
                min={1}
                max={12}
                step={1}
                value={[sessionsPerMonth]}
                onValueChange={(value) => setSessionsPerMonth(value[0])}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="qatar-cost">In-Person Qatar (QAR per session)</Label>
              <Input
                id="qatar-cost"
                type="number"
                value={qatarCostPerSession}
                onChange={(e) => setQatarCostPerSession(Number(e.target.value))}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="online-cost">Online Therapy (per session)</Label>
              <Input
                id="online-cost"
                type="number"
                value={onlineCostPerSession}
                onChange={(e) => setOnlineCostPerSession(Number(e.target.value))}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="currency">Online Therapy Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger id="currency" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="QAR">QAR (Qatari Riyal)</SelectItem>
                  <SelectItem value="USD">USD (US Dollar)</SelectItem>
                  <SelectItem value="EUR">EUR (Euro)</SelectItem>
                  <SelectItem value="GBP">GBP (British Pound)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="insurance">Insurance Coverage: {insuranceCoverage}%</Label>
              <Slider
                id="insurance"
                min={0}
                max={100}
                step={5}
                value={[insuranceCoverage]}
                onValueChange={(value) => setInsuranceCoverage(value[0])}
                className="mt-2"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-3 text-lg">Monthly Cost Breakdown</h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">In-Person Qatar</p>
                  <p className="text-2xl font-bold text-foreground">
                    QAR {qatarMonthly.toFixed(0)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    After insurance: QAR {qatarAfterInsurance.toFixed(0)}
                  </p>
                </div>

                <div className="border-t pt-3">
                  <p className="text-sm text-muted-foreground">Online International</p>
                  <p className="text-2xl font-bold text-foreground">
                    QAR {onlineMonthlyQAR.toFixed(0)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    After insurance: QAR {onlineAfterInsurance.toFixed(0)}
                  </p>
                </div>

                <div className="border-t pt-3">
                  <p className="text-sm text-muted-foreground">Monthly Savings</p>
                  <p className={`text-2xl font-bold ${savings > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {savings > 0 ? '+' : ''}QAR {Math.abs(savings).toFixed(0)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {savings > 0 ? `Save ${savingsPercentage}% with online` : `In-person is ${Math.abs(Number(savingsPercentage))}% cheaper`}
                  </p>
                </div>

                <div className="border-t pt-3">
                  <p className="text-sm text-muted-foreground">Annual Cost Difference</p>
                  <p className={`text-xl font-semibold ${savings > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {savings > 0 ? '+' : ''}QAR {Math.abs(savings * 12).toFixed(0)}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> Online therapy platforms like BetterHelp, Talkspace typically range $60-80 USD per session. 
                Qatar in-person therapy ranges QAR 400-700 per session. Insurance coverage varies by provider.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
