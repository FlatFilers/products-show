import { ProductService } from "@/lib/services/product";
import Link from "next/link";
import invariant from "ts-invariant";

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
        <div>
          <h3>{product.name}</h3>
          <p>Product details</p>
        </div>
        <div>
          <dl>
            <div>
              <dt>Product ID</dt>
              <dd>{product.externalProductId}</dd>
            </div>
            <div>
              <dt>Description</dt>
              <dd>{product.description || "-"}</dd>
            </div>
            <div>
              <dt>Category</dt>
              <Link
                className="underline"
                href={`/categories/${product.category.id}`}
              >
                {product.category.name}
              </Link>
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
              <Link
                className="underline"
                href={`/suppliers/${product.supplier.id}`}
              >
                {product.supplier.name}
              </Link>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
