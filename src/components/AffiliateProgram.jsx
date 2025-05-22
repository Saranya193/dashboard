import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Input,
  Label,
} from "@/components/ui";

export default function AffiliateProgram() {
  const [referrals, setReferrals] = useState([]);
  const [name, setName] = useState("");
  const [earnings, setEarnings] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("affiliateReferrals");
    if (saved) setReferrals(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("affiliateReferrals", JSON.stringify(referrals));
  }, [referrals]);

  const addReferral = () => {
    if (!name.trim() || !earnings.trim() || isNaN(earnings)) {
      alert("Please enter a valid name and earnings");
      return;
    }
    setReferrals((prev) => [
      ...prev,
      { id: Date.now(), name, earnings: parseFloat(earnings) },
    ]);
    setName("");
    setEarnings("");
    setIsAdding(false);
  };

  const totalEarnings = referrals.reduce(
    (total, r) => total + r.earnings,
    0
  );

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Affiliate Program</CardTitle>
        {!isAdding && (
          <Button size="sm" onClick={() => setIsAdding(true)}>
            + Add Referral
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isAdding && (
          <div className="space-y-3 mb-4">
            <div>
              <Label htmlFor="referral-name">Referral Name</Label>
              <Input
                id="referral-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter referral name"
              />
            </div>
            <div>
              <Label htmlFor="earnings">Earnings ($)</Label>
              <Input
                id="earnings"
                value={earnings}
                onChange={(e) => setEarnings(e.target.value)}
                placeholder="Enter earnings"
                type="number"
                min="0"
                step="0.01"
              />
            </div>
            <div className="space-x-2">
              <Button variant="outline" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
              <Button onClick={addReferral}>Add</Button>
            </div>
          </div>
        )}

        {referrals.length === 0 ? (
          <p>No referrals recorded yet.</p>
        ) : (
          <ul className="space-y-2">
            {referrals.map(({ id, name, earnings }) => (
              <li
                key={id}
                className="flex justify-between border p-2 rounded-md bg-gray-50"
              >
                <span>{name}</span>
                <span>${earnings.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 font-semibold text-right">
          Total Earnings: ${totalEarnings.toFixed(2)}
        </div>
      </CardContent>
    </Card>
  );
}
