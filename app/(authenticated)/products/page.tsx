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
import { ProductService } from "@/lib/services/product";

export default async function Page() {
  const session = await getServerSession();
  invariant(session?.user, "User must be logged in");
  const products = await ProductService.getProductsForUser(session.user.id);

  return (
    <div className="px-4 sm:px-6 lg:px-8 text-white">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold">Products</h1>
          <p className="mt-2 text-sm text-gray-400">Product details</p>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <Table className="resource-index-table">
                <TableHeader>
                  <TableRow className="border-0">
                    <TableHead>Product ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Supplier</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <Link href={`/products/${product.id}`}>
                          {product.externalProductId}
                        </Link>
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.description || "-"}</TableCell>
                      <TableCell>
                        <Link href={`/categories/${product.category.id}`}>
                          {product.category.name}
                        </Link>
                      </TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>
                        <Link href={`/suppliers/${product.supplier.id}`}>
                          {product.supplier.name}
                        </Link>
                      </TableCell>
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
