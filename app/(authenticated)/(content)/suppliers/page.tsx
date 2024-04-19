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
import { SupplierService } from "@/lib/services/supplier";

export default async function Page() {
  const session = await getServerSession();
  invariant(session?.user, "User must be logged in");
  const suppliers = await SupplierService.getSuppliersForUser(session.user.id);

  return (
    <div className="px-4 lg:px-0">
      <div className="">
        <div className="">
          <h1 className="text-xl font-semibold">Suppliers</h1>
          <p className="mt-2 text-sm">
            A list of all the suppliers in your account.
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <Table className="resource-index-table">
                <TableHeader>
                  <TableRow className="border-0">
                    <TableHead>Supplier ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead>Country</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {suppliers.map((supplier) => (
                    <TableRow key={supplier.id}>
                      <TableCell>
                        <Link href={`/suppliers/${supplier.id}`}>
                          {supplier.externalSupplierId}
                        </Link>
                      </TableCell>
                      <TableCell>{supplier.name}</TableCell>
                      <TableCell>{supplier.email || "-"}</TableCell>
                      <TableCell>{supplier.phone || "-"}</TableCell>
                      <TableCell>{supplier.address || "-"}</TableCell>
                      <TableCell>{supplier.city || "-"}</TableCell>
                      <TableCell>{supplier.state || "-"}</TableCell>
                      <TableCell>{supplier.country || "-"}</TableCell>
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
