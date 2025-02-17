"use client";

import { useEffect, useState } from "react";
import Product from "./components/Product";
import CtaSlider from "./components/CtaSlider";
import Filters from "./components/Filters";

function MockShopProducts() {
  const [products, setProducts] = useState(null);
  const [collections, setCollections] = useState(null);
  const [productsLoading, setProductsLoading] = useState(true);
  const [collectionsLoading, setCollectionsLoading] = useState(true);
  const [sortDirection, setSortDirection] = useState("ascending");
  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    fetch("https://mock.shop/api?query={products(first:%2020){edges%20{node%20{id%20title%20description%20featuredImage%20{id%20url}%20variants(first:%203){edges%20{node%20{price%20{amount%20currencyCode}}}}}}}}")
      .then((response) => response.json())
      .then((json) => {
        setProducts(json.data.products.edges)
        setProductsLoading(false)
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetch("https://mock.shop/api?query={collections(first:%2010){edges%20{cursor%20node%20{id%20handle%20title%20description%20image%20{id%20url}}}}}")
      .then((response) => response.json())
      .then((json) => {
        setCollections(json.data.collections.edges)
        setCollectionsLoading(false)
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (products?.length > 0) {
      let sortedData = products.slice().sort((a, b) =>
        sortDirection === "ascending"
          ? parseFloat(a.node.variants.edges[0]?.node.price.amount) -
            parseFloat(b.node.variants.edges[0]?.node.price.amount)
          : parseFloat(b.node.variants.edges[0]?.node.price.amount) -
            parseFloat(a.node.variants.edges[0]?.node.price.amount)
      );
      
      setSortedProducts(sortedData);
    }
  }, [sortDirection, products]);

  const handleSortDirectionChange = (filterValue) => {
    setSortDirection(filterValue);
  };

  return (
    <>
      {collectionsLoading || productsLoading ? (
        <div className="flex justify-center items-center h-screen">
          <i className="fas fa-spinner fa-spin text-4xl text-blue-500"></i>
        </div>
      ) : (
        <>
          {collections?.length > 0 ? (
            <CtaSlider collections={collections} />
          ) : (
            <p>No collections available</p>
          )}

          <Filters onSortDirectionChange={handleSortDirectionChange} />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 m-8">
            {sortedProducts?.length > 0 ? (
              sortedProducts.map((item) => (
                <Product key={item.node.id} item={item} />
              ))
            ) : (
              <p>No products available</p>
            )}
          </div>
        </>
      )}
    </>
);

}

export default MockShopProducts;