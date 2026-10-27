import { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import UserModal from '../components/UserModal'; 
import { SearchIcon, FilterIcon } from '../components/Icons';
import useProductsQuery, { LIMIT_OPTIONS } from '../hooks/useProductsQuery';
import { getUsers, createUser, updateUser, deleteUser } from '../services/productService'; 
import '../styles/ProductsPage.css';

export default function ProductsPage() {
  const { query, updateQuery } = useProductsQuery();

  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadCount, setReloadCount] = useState(0);

  const [searchText, setSearchText] = useState(query.search);
  const [showFilters, setShowFilters] = useState(Boolean(query.category));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  const totalPages = Math.ceil(totalUsers / query.limit);

  useEffect(() => {
    let isCancelled = false;

    const loadUsers = async () => {
      setIsLoading(true);
      setError('');
      try {
        const data = await getUsers({
          limit: query.limit,
          skip: (query.page - 1) * query.limit,
          search: query.search,
          role: query.category,
        });
        if (!isCancelled) {
          setUsers(data.users);
          setTotalUsers(data.total);
        }
      } catch (err) {
        if (!isCancelled) setError(err.message);
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    };

    loadUsers();
    return () => { isCancelled = true; };
  }, [query.page, query.limit, query.search, query.category, reloadCount]);

  useEffect(() => {
    setSearchText(query.search);
  }, [query.search]);

  useEffect(() => {
    if (searchText === query.search) return undefined;
    const timeoutId = setTimeout(() => {
      updateQuery({ search: searchText.trim(), page: 1 });
    }, 400);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const handleSaveUser = async (formData) => {
    try {
      if (userToEdit) {
        if (!window.confirm('¿Estás seguro de editar este usuario?')) return;
        const updated = await updateUser(userToEdit.id, formData);
        setUsers(users.map(u => u.id === userToEdit.id ? { ...u, ...updated } : u));
      } else {
        const added = await createUser(formData);
        setUsers([added, ...users]);
        setTotalUsers(prev => prev + 1);
      }
      setIsModalOpen(false);
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleDeleteUser = async (user) => {
    if (!window.confirm(`¿Estás seguro de eliminar a "${user.firstName} ${user.lastName}"?`)) return;
    try {
      await deleteUser(user.id);
      setUsers(users.filter(u => u.id !== user.id));
      setTotalUsers(prev => prev - 1);
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const renderTable = () => {
    if (isLoading) {
      return <p className="status-message">Cargando usuarios...</p>;
    }

    if (error) {
      return (
        <div className="status-message error">
          <p>{error}</p>
          <button type="button" className="retry-btn" onClick={() => setReloadCount(n => n + 1)}>
            Reintentar
          </button>
        </div>
      );
    }

    if (users.length === 0) {
      return <p className="status-message">No se encontraron usuarios.</p>;
    }

    return (
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th className="cell-left">Nombre Completo</th>
              <th>Edad</th>
              <th>Correo Electrónico</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="cell-code">{user.id}</td>
                <td className="cell-left">{user.firstName} {user.lastName}</td>
                <td>{user.age}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`badge-${user.role === 'admin' ? 'admin' : 'user'}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <button 
                    className="action-btn btn-edit"
                    onClick={() => { setUserToEdit(user); setIsModalOpen(true); }}
                  >
                    Editar
                  </button>
                  <button 
                    className="action-btn btn-delete"
                    onClick={() => handleDeleteUser(user)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="card products-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '20px', color: 'var(--color-primary)', margin: 0 }}>
          Usuarios del Sistema
        </h2>
        <button 
          className="btn-save"
          onClick={() => { setUserToEdit(null); setIsModalOpen(true); }}
        >
          + Agregar Usuario
        </button>
      </div>

      <div className="table-toolbar">
        <div className="search-box">
          <SearchIcon size={16} />
          <input
            type="text"
            placeholder="Buscar usuario por nombre..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <button
          type="button"
          className={`filter-btn ${showFilters ? 'active' : ''}`}
          onClick={() => setShowFilters(!showFilters)}
          title="Filtrar por rol"
        >
          <FilterIcon size={18} />
        </button>

        {showFilters && (
          <select
            className="category-select"
            value={query.category}
            onChange={(e) => updateQuery({ category: e.target.value, page: 1 })}
          >
            <option value="">Todos los roles</option>
            <option value="admin">Administrador</option>
            <option value="moderator">Moderador</option>
            <option value="user">Usuario</option>
          </select>
        )}
      </div>

      {renderTable()}

      <div className="table-footer">
        <label className="page-size">
          <span>Mostrar</span>
          <select value={query.limit} onChange={(e) => updateQuery({ limit: Number(e.target.value), page: 1 })}>
            {LIMIT_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <span>registros</span>
        </label>

        <Pagination
          currentPage={query.page}
          totalPages={totalPages}
          onPageChange={(page) => updateQuery({ page })}
        />
      </div>

      <UserModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveUser}
        userToEdit={userToEdit}
      />
    </div>
  );
}