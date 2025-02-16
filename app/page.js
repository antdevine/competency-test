"use client";

import { useEffect, useState } from "react";
import Product from "./components/product";

function MockShopProducts() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://mock.shop/api?query={products(first:%2020){edges%20{node%20{id%20title%20description%20featuredImage%20{id%20url}%20variants(first:%203){edges%20{node%20{price%20{amount%20currencyCode}}}}}}}}")
      .then((response) => response.json())
      .then((json) => {
        setProducts(json.data.products.edges)
        setLoading(false)
      })
      .catch((error) => console.error(error));
  }, []);

  console.log(products, 'products')

  return (
    <div className="grid grid-col-12 lg:grid-cols-3 gap-8 m-8">
      {loading ? (
        <i className="fas fa-spinner fa-spin text-4xl"></i>
      ) : products?.length > 0 ? (
        products.map((item) => <Product key={item.node.id} item={item} />)
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
}

export default MockShopProducts;