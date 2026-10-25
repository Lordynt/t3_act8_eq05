import { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import { SearchIcon, FilterIcon } from '../components/Icons';
import useProductsQuery, { LIMIT_OPTIONS } from '../hooks/useProductsQuery';
import { getCategories, getProducts } from '../services/productService';
import '../styles/ProductsPage.css';

const STOCK_STATUS = {
  'In Stock': { label: 'Disponible', className: 'status-available' },
  'Low Stock': { label: 'Pocas unidades', className: 'status-low' },
  'Out of Stock': { label: 'Agotado', className: 'status-out' },
};

export default function ProductsPage() {
  const { query, updateQuery } = useProductsQuery();

  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadCount, setReloadCount] = useState(0);

  const [searchText, setSearchText] = useState(query.search);
  const [showFilters, setShowFilters] = useState(Boolean(query.category));

  const totalPages = Math.ceil(totalProducts / query.limit);

  // Categorías para el filtro (se cargan una sola vez)
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(
          data.map((category) =>
            typeof category === 'string' ? { slug: category, name: category } : category
          )
        );
      } catch {
        setCategories([]); // si falla, el filtro simplemente queda vacío
      }
    };
    loadCategories();
  }, []);

  // Productos: se vuelven a pedir cada vez que cambia la página, el límite o los filtros
  useEffect(() => {
    let isCancelled = false;

    const loadProducts = async () => {
      setIsLoading(true);
      setError('');
      try {
        const data = await getProducts({
          limit: query.limit,
          skip: (query.page - 1) * query.limit,
          search: query.search,
          category: query.category,
        });
        if (!isCancelled) {
          setProducts(data.products);
          setTotalProducts(data.total);
        }
      } catch (err) {
        if (!isCancelled) setError(err.message);
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    };

    loadProducts();
    return () => { isCancelled = true; };
  }, [query.page, query.limit, query.search, query.category, reloadCount]);

  // Si la URL cambia (botón atrás), actualiza el texto del buscador
  useEffect(() => {
    setSearchText(query.search);
  }, [query.search]);

  // Búsqueda con espera de 400 ms para no pedir datos en cada tecla
  useEffect(() => {
    if (searchText === query.search) return undefined;
    const timeoutId = setTimeout(() => {
      updateQuery({ search: searchText.trim(), page: 1 });
    }, 400);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const handleCategoryChange = (event) => updateQuery({ category: event.target.value, page: 1 });
  const handleLimitChange = (event) => updateQuery({ limit: Number(event.target.value), page: 1 });
  const handlePageChange = (page) => updateQuery({ page });

  const renderTable = () => {
    if (isLoading) {
      return <p className="status-message">Cargando productos...</p>;
    }

    if (error) {
      return (
        <div className="status-message error">
          <p>{error}</p>
          <button type="button" className="retry-btn" onClick={() => setReloadCount((n) => n + 1)}>
            Reintentar
          </button>
        </div>
      );
    }

    if (products.length === 0) {
      return <p className="status-message">No se encontraron productos.</p>;
    }

    return (
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Código</th>
              <th className="cell-left">Producto</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const stock = STOCK_STATUS[product.availabilityStatus] || {
                label: product.availabilityStatus || '—',
                className: '',
              };
              return (
                <tr key={product.id}>
                  <td className="cell-code">{product.sku || product.id}</td>
                  <td className="cell-left">{product.title}</td>
                  <td>{product.category}</td>
                  <td>${product.price}</td>
                  <td className={`cell-status ${stock.className}`}>{stock.label}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="card products-card">
      <div className="table-toolbar">
        <div className="search-box">
          <SearchIcon size={16} />
          <input
            type="text"
            placeholder="Buscar..."
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
        </div>

        <button
          type="button"
          className={`filter-btn ${showFilters ? 'active' : ''}`}
          onClick={() => setShowFilters((previous) => !previous)}
          title="Filtrar por categoría"
          aria-label="Filtrar por categoría"
        >
          <FilterIcon size={18} />
        </button>

        {showFilters && (
          <select
            className="category-select"
            value={query.category}
            onChange={handleCategoryChange}
            aria-label="Categoría"
          >
            <option value="">Todas las categorías</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>{category.name}</option>
            ))}
          </select>
        )}
      </div>

      {renderTable()}

      <div className="table-footer">
        <label className="page-size">
          <span>Mostrar</span>
          <select value={query.limit} onChange={handleLimitChange}>
            {LIMIT_OPTIONS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <span>registros</span>
        </label>

        <Pagination
          currentPage={query.page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}