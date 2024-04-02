import { SupplierService } from "@/lib/services/supplier";
import invariant from "ts-invariant";

export default async function Page({
  params,
}: {
  params: {
    supplierId: string;
  };
}) {
  invariant(params.supplierId, "Supplier id not found");
  const supplierId = params.supplierId;
  const supplier = await SupplierService.getSupplier(supplierId);
  invariant(supplier, "Supplier not found");

  return (
    <div className="px-4 sm:px-6 lg:px-8 w-1/2">
      <div className="resource-show">
        <div>
          <h3>{supplier.name}</h3>
          <p>Supplier details</p>
        </div>
        <div>
          <dl>
            <div>
              <dt>Supplier ID</dt>
              <dd>{supplier.externalSupplierId || "-"}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{supplier.email}</dd>
            </div>
            <div>
              <dt>Phone Number</dt>
              <dd>{supplier.phone || "-"}</dd>
            </div>
            <div>
              <dt>Address</dt>
              <dd>{supplier.address || "-"}</dd>
            </div>
            <div>
              <dt>City</dt>
              <dd>{supplier.city || "-"}</dd>
            </div>
            <div>
              <dt>State</dt>
              <dd>{supplier.state || "-"}</dd>
            </div>
            <div>
              <dt>Country</dt>
              <dd>{supplier.country || "-"}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
