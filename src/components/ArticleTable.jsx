import { articles } from "../data/articles";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function ArticleTable({ tab, searchQuery }) {
  const filtered = articles.filter(
    (article) =>
      article.category === tab &&
      (article.title ?? "").toLowerCase().includes((searchQuery ?? "").toLowerCase())
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border text-sm">
        <thead className="bg-gray-50 text-left">
          <tr>
            <th className="p-2"><input type="checkbox" /></th>
            <th className="p-2">Article Title</th>
            <th className="p-2">Keyword [Traffic]</th>
            <th className="p-2">Words</th>
            <th className="p-2">Created On</th>
            <th className="p-2">Action</th>
            <th className="p-2">Publish</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((item, idx) => (
            <tr key={idx} className="border-t">
              <td className="p-2"><input type="checkbox" /></td>
              <td className="p-2 text-blue-600 hover:underline cursor-pointer">{item.title}</td>
              <td className="p-2">{item.keyword}</td>
              <td className="p-2">{item.words}</td>
              <td className="p-2">{item.createdOn}</td>
              <td className="p-2">
                <Button variant="outline" size="sm">View</Button>
              </td>
              <td className="p-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">Publish</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>WordPress</DropdownMenuItem>
                    <DropdownMenuItem>Medium</DropdownMenuItem>
                    <DropdownMenuItem>Save as Draft</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-sm p-4">
        Total {filtered.length} Article Titles | Show 10 entries per page
      </div>
    </div>
  );
}
