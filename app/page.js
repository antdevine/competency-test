"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

function MockShopProducts() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    fetch("https://mock.shop/api?query={products(first:%2020){edges%20{node%20{id%20title%20description%20featuredImage%20{id%20url}%20variants(first:%203){edges%20{node%20{price%20{amount%20currencyCode}}}}}}}}")
      .then((response) => response.json())
      .then((json) => setProducts(json.data.products.edges))
      .catch((error) => console.error(error));
  }, []);

  console.log(products, 'products')

  return (
    <>
    <div className="grid grid-col-12 lg:grid-cols-3 gap-x-8 gap-y-4">
        {products?.length > 0 ? (
          products.map((item) => (
            <div key={item.node.id}>
              {item.node.featuredImage && (
                <Image
                  src={item.node.featuredImage.url}
                  alt={item.node.title}
                  width={180}
                  height={180}
                />
              )}
              <h5>{item.node.title}</h5>
              <p>{item.node.description}</p>
              <p>
                {item.node.variants.edges[0]?.node.price.amount}{" "}
                {item.node.variants.edges[0]?.node.price.currencyCode}
              </p>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default MockShopProducts;