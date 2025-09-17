// frontend/components/products/ProductList.js
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
  if (!products || products.length === 0) {
    return <p className="text-center text-gray-500">No products to display.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;