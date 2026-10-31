import { useState, useMemo } from "react";

function ProductCatalog() {
    const [products] = useState([
        { id: 1, name: 'Laptop', price: 999, category: 'electronics', inStock: true, rating: 4.5 },
        { id: 2, name: 'Phone', price: 699, category: 'electronics', inStock: true, rating: 4.2 },
        { id: 3, name: 'Shirt', price: 29, category: 'clothing', inStock: true, rating: 4.0 },
        { id: 4, name: 'Shoes', price: 89, category: 'clothing', inStock: true, rating: 4.7 },
        { id: 5, name: 'Book', price: 15, category: 'books', inStock: true, rating: 4.3 },
        { id: 6, name: 'Headphones', price: 199, category: 'electronics', inStock: true, rating: 4.1 }
    ]);

    const [filters, setFilters] = useState({
        category: 'all',
        inStock: false,
        minPrice: 0,
        maxPrice: 1000,
        searchTerm: ''
    });

    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');

    const filteredAndSortedProducts = useMemo(() => {
        let filtered = products.filter(product => {
            const matchesCategory = filters.category === 'all' || product.category === filters.category;
            const matchesStock = !filters.inStock || product.inStock;
            const matchesPrice = product.price >= filters.minPrice && product.price <= filters.maxPrice;
            const matchesSearch = product.name.toLowerCase().includes(filters.searchTerm.toLowerCase());

            return matchesCategory && matchesStock && matchesPrice && matchesSearch;
        });

        filtered.sort((a, b) => {
            let comparison = 0;

            if (sortBy == 'price' || sortBy === 'rating') {
                comparison = a[sortBy] - b[sortBy];
            } else {
                comparison = [sortBy].localeCompare(b[sortBy]);
            }

            return sortOrder === 'asc' ? comparison : -comparison;
        });

        return filtered;
    }, [products, filters, sortBy, sortOrder]);

    const updateFilter = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const clearFilters = () => {
        setFilters({
            category: 'all',
            inStock: false,
            minPrice: 0,
            maxPrice: 1000,
            searchTerm: ''
        });
    };

    const categories = ['all', ...new Set(products.map(p => p.category))];

    return(
        <div className="product-catalog">
            <div className="filters">
                <h3>Filters</h3>

                <input
                    type="text"
                    placeholder="Search products..."
                    value={filters.searchTerm}
                    onChange={(e) => updateFilter('searchTerm', e.target.value)}
                />

                <select
                    value={filters.category}
                    onChange={(e) => updateFilter('category', e.target.value)}
                >
                    {categories.map(category => (
                        <option key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                    ))}
                </select>

                <label>
                    <input
                        type="checkbox"
                        checked={filters.inStock}
                        onChange={(e) => updateFilter('inStock', e.target.checked)}
                    />
                    In Stock Only
                </label> 
                {/* Slide 4.5 page 15 */}
            </div>
        </div>
    )
}