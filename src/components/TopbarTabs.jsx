import { useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function TopbarTabs({ selected, onChange, onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = [
    "Generated Articles",
    "Published Articles",
    "Scheduled Articles",
    "Archived Articles",
  ];

  const handleSearch = () => {
    if (onSearch) onSearch(searchQuery);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="flex items-center justify-between mb-4 space-x-4">
      <Tabs defaultValue={selected} onValueChange={onChange} className="flex-1">
        <TabsList className="flex space-x-2 bg-gray-100 p-2 rounded-md">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="text-sm capitalize"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Search input + button */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          className="border rounded px-3 py-1 text-sm"
        />
        <Button variant="outline" size="sm" onClick={handleSearch}>
          Search
        </Button>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="ml-4" variant="outline" size="sm">
            Article Actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => alert('Create New Article')}>
            Create New Article
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => alert('Import from CSV')}>
            Import from CSV
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => alert('Bulk Publish')}>
            Bulk Publish
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
