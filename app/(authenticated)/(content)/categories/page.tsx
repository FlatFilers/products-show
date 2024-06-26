import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import Link from "next/link";
import { getServerSession } from "@/lib/get-server-session";
import invariant from "ts-invariant";
import { CategoryService } from "@/lib/services/category";

export default async function Page() {
  const session = await getServerSession();
  invariant(session?.user, "User must be logged in");
  const categories = await CategoryService.getCategoriesForUser(
    session.user.id
  );

  return (
    <div className="px-4 lg:px-0">
      <div className="">
        <div className="">
          <h1 className="text-xl font-semibold">Categories</h1>
          <p className="mt-2 text-sm">Category details</p>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <Table className="resource-index-table">
                <TableHeader>
                  <TableRow className="border-0">
                    <TableHead>Category ID</TableHead>
                    <TableHead>Category Name</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell>
                        <Link href={`/categories/${category.id}`}>
                          {category.externalCategoryId}
                        </Link>
                      </TableCell>
                      <TableCell>{category.name}</TableCell>
                      <TableCell>{category.description || "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
