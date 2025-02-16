import Image from "next/image";

export default function Product ({item}) {

    return (
        <>
        <div className="relative group cursor-default">
            {item.node.featuredImage && (
                    <Image
                      src={item.node.featuredImage.url}
                      alt={item.node.title}
                      width={150}
                      height={150}
                      className="w-full h-auto md:opacity-100 md:group-hover:opacity-50 md:transition-opacity duration-300"
                    />
                  )}
                  <div className="flex justify-between border-b pt-6 pb-2 mb-6">
                    <h5 className="uppercase">{item.node.title}</h5>
                    <p>
                      {item.node.variants.edges[0]?.node.price.amount}{" "}
                      {item.node.variants.edges[0]?.node.price.currencyCode}
                    </p>
                  </div>
                  <div className="relative md:absolute md:bg-white md:top-50 z-2 md:p-4 md:m-4 md:top-1/2 md:transform md:-translate-y-1/2 md:opacity-0 md:group-hover:opacity-100 md:transition-opacity duration-300">
                  <p>{item.node.description}</p>
                  </div>

                  </div>
                </>
    );
}