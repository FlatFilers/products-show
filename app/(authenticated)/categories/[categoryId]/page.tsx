import { CategoryService } from "@/lib/services/category";
import invariant from "ts-invariant";

export default async function Page({
  params,
}: {
  params: {
    categoryId: string;
  };
}) {
  invariant(params.categoryId, "Category id not found");
  const categoryId = params.categoryId;
  const category = await CategoryService.getCategory(categoryId);
  invariant(category, "Category not found");

  return (
    <div className="px-4 sm:px-6 lg:px-8 w-1/2">
      <div className="resource-show">
        <div>
          <h3>{category.name}</h3>
          <p>Category details</p>
        </div>
        <div>
          <dl>
            <div>
              <dt>Category ID</dt>
              <dd>{category.externalCategoryId}</dd>
            </div>
            <div>
              <dt>Description</dt>
              <dd>{category.description}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
