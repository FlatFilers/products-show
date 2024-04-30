import { ProductService } from "@/lib/services/product";
import Link from "next/link";
import invariant from "ts-invariant";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: {
    productId: string;
  };
}) {
  invariant(params.productId, "Product ID not found");
  const productId = params.productId;
  const product = await ProductService.getProduct(productId);
  invariant(product, "Product not found");

  return (
    <div className="px-4 sm:px-6 lg:px-8 w-1/2">
      <div className="resource-show">
        <div className="space-y-2">
          <h3>{product.name}</h3>
          <p>Product details</p>
        </div>
        <div>
          <dl>
            <div>
              <dt>Product ID</dt>
              <dd>{product.externalProductId}</dd>
            </div>
            <div className="space-x-4">
              <dt>Description</dt>
              <dd className="text-wrap text-right mr-0">
                {product.description || "-"}
              </dd>
            </div>
            <div>
              <dt>Category</dt>
              {product.category && (
                <Link
                  className="underline"
                  href={`/categories/${product.category.id}`}
                >
                  {product.category.name}
                </Link>
              )}
            </div>
            <div>
              <dt>Price</dt>
              <dd>{product.price}</dd>
            </div>
            <div>
              <dt>Quantity</dt>
              <dd>{product.quantity}</dd>
            </div>
            <div>
              <dt>Supplier</dt>
              {product.supplier && (
                <Link
                  className="underline"
                  href={`/suppliers/${product.supplier.id}`}
                >
                  {product.supplier.name}
                </Link>
              )}
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
