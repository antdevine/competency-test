import { useState } from "react";
import Image from "next/image";

export default function Product ({item}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
        <div>
            {item.node.featuredImage && (
                    <Image
                      src={item.node.featuredImage.url}
                      alt={item.node.title}
                      width={150}
                      height={150}
                      className="w-full h-auto"
                    />
                  )}
                  <div className="flex justify-between border-b pt-6 pb-2 mb-6">
                    <h5 class="uppercase">{item.node.title}</h5>
                    <p>
                      {item.node.variants.edges[0]?.node.price.amount}{" "}
                      {item.node.variants.edges[0]?.node.price.currencyCode}
                    </p>
                  </div>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    Find out more
                  </button>
                  <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'h-full' : 'h-0'}`}>
                  <p>{item.node.description}</p>
                  </div>

                  </div>
                </>
    );
}