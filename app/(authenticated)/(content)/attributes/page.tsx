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
import { AttributeService } from "@/lib/services/attribute";

export default async function Page() {
  const session = await getServerSession();
  invariant(session?.user, "User must be logged in");
  const attributes = await AttributeService.getAll({ userId: session.user.id });

  return (
    <div className="px-4 lg:px-0">
      <div className="">
        <div className="">
          <h1 className="text-xl font-semibold">Attributes</h1>
          <p className="mt-2 text-sm text-gray-400">Attribute details.</p>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <Table className="resource-index-table">
                <TableHeader>
                  <TableRow className="border-0">
                    <TableHead>Attribute ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Unit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attributes.map((attribute) => (
                    <TableRow key={attribute.id}>
                      <TableCell>
                        <Link href={`/attributes/${attribute.id}`}>
                          {attribute.externalAttributeId}
                        </Link>
                      </TableCell>
                      <TableCell>{attribute.name}</TableCell>
                      <TableCell>{attribute.value}</TableCell>
                      <TableCell>{attribute.unit || "-"}</TableCell>
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
