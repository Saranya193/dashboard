import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
} from "@/components/ui";

const initialUpdates = [
  {
    id: 1,
    title: "Version 1.2 Released",
    date: "2025-05-10",
    content:
      "New features added including AI Keyword to Article and improved backlink tracker.",
  },
  {
    id: 2,
    title: "Scheduled Maintenance",
    date: "2025-05-15",
    content:
      "The platform will be down for maintenance on May 20th from 1AM to 3AM UTC.",
  },
  {
    id: 3,
    title: "New Help Center Added",
    date: "2025-05-18",
    content:
      "Check out the new Help Center for FAQ and support resources.",
  },
];

export default function Updates() {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    // Load saved dismissed updates from localStorage or show all initially
    const savedDismissed = JSON.parse(localStorage.getItem("dismissedUpdates") || "[]");
    const filtered = initialUpdates.filter((u) => !savedDismissed.includes(u.id));
    setUpdates(filtered);
  }, []);

  const dismissUpdate = (id) => {
    setUpdates((prev) => prev.filter((u) => u.id !== id));
    const dismissed = JSON.parse(localStorage.getItem("dismissedUpdates") || "[]");
    dismissed.push(id);
    localStorage.setItem("dismissedUpdates", JSON.stringify(dismissed));
  };

  if (updates.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Updates</CardTitle>
        </CardHeader>
        <CardContent>No new updates.</CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Updates & Announcements</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {updates.map(({ id, title, date, content }) => (
            <li
              key={id}
              className="border rounded-md bg-gray-50 p-4 relative"
            >
              <div className="text-sm text-gray-500 mb-1">{date}</div>
              <h3 className="font-semibold mb-1">{title}</h3>
              <p className="mb-2">{content}</p>
              <Button
                size="sm"
                variant="destructive"
                className="absolute top-2 right-2"
                onClick={() => dismissUpdate(id)}
              >
                Dismiss
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
