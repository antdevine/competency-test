import { useState, useEffect } from "react";

export default function Filters({ onSortDirectionChange, defaultSortDirection = "ascending" }) {

    const [filtersOpen, setfiltersOpen] = useState(false);
    const [sortDirection, setSortDirection] = useState(defaultSortDirection);

    useEffect(() => {
        setSortDirection(defaultSortDirection);
      }, [defaultSortDirection]);
    
        const applyFilters = (event) => {
          event.preventDefault();
          const sortActive = event.target.querySelector("input[name='sort']:checked")?.value;
          setSortDirection(sortActive);
          onSortDirectionChange(sortActive);
        };
    
    return (
        <>
        <div className="p-4 m-8 mb-0 w-auto inline-block bg-gray-100">
        <button
            className="px-4 py-2 bg-blue-500 text-white rounded flex items-center"
            onClick={() => setfiltersOpen(!filtersOpen)}
            >
            <span className="mr-2">Filters</span>
            <i className="fa-solid fa-bars"></i>
        </button>
            <div className={filtersOpen ? 'block w-auto inline-flex mt-4' : 'hidden'}>
                <form className="space-y-4" onSubmit={applyFilters}>
                    <div>
                    <label className="flex items-center space-x-2">
                        <input type="radio" name="sort" value="ascending" checked={sortDirection === "ascending"}
                onChange={(e) => setSortDirection(e.target.value)} className="w-4 h-4" />
                        <span>Price Ascending</span>
                    </label>
                    </div>

                    <div>
                    <label className="flex items-center space-x-2">
                        <input type="radio" name="sort" value="descending" checked={sortDirection === "descending"}
                onChange={(e) => setSortDirection(e.target.value)} className="w-4 h-4" />
                        <span>Price Descending</span>
                    </label>
                    </div>

                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
                    Apply
                    </button>
                </form>
            </div>
        </div>
        </>
    )
};