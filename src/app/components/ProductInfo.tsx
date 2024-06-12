import React from "react";
import Link from "next/link";

const ProductInfo = ({ product }: { product: any }) => {
  return (
    <>
      {product.map((product: any, key: any) => (
        <tbody
          key={key}
          className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
        >
          <tr className="text-gray-700 dark:text-gray-400">
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={product.coverImage}
                    alt=""
                  />
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium">{product.name}</div>
                </div>
              </div>
            </td>

            <td className="px-6 py-4 whitespace-nowrap">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                {product.category}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {product.price}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <Link
                href={`product/${product.id}`}
                className="text-indigo-600 hover:text-indigo-900"
              >
                Edit
              </Link>
            </td>
          </tr>
        </tbody>
      ))}
    </>
  );
};

export default ProductInfo;
