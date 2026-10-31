import { useState, useEffect } from "react";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState({
    fetch: false,
    create: false,
    update: false,
    delete: false,
  });

  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "user" });
  const [editingUser, setEditingUser] = useState(null);

  // Mock API base URL
  const API_BASE = "https://jsonplaceholder.typicode.com";

  //Generic API call function
  const apiCall = async (endpoint, options = {}) => {
    const url = `${API_BASE}${endpoint}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  };

  // Fetch all users
  const fetchUsers = async () => {
    setLoading((prev) => ({ ...prev, fetch: true }));
    setError(null);

    try {
      const userData = await apiCall("/users");
      setUsers(userData);
    } catch (err) {
      setError(`Failed to fetch users: ${err.message}`);
    } finally {
      setLoading((prev) => ({ ...prev, fetch: false }));
    }
  };

  // Create new user
  const createUser = async (userData) => {
    setLoading((prev) => ({ ...prev, create: true }));
    setError(null);

    try {
      const newUserData = await apiCall("/users", {
        method: "POST",
        body: JSON.stringify(userData),
      });

      // Since JSONPlaceholder doesn't actually create users,
      // we'll simulate it by adding to local state
      const userWithId = { ...userData, id: Date.now() };
      setUsers((prev) => [...prev, userWithId]);
      setNewUser({ name: "", email: "", role: "user" });

      return userWithId;
    } catch (err) {
      setError(`Failed to create user: ${err.message}`);
      throw err;
    } finally {
      setLoading((prev) => ({ ...prev, create: false }));
    }
  };

  // Update user
  const updateUser = async (userId, userData) => {
    setLoading((prev) => ({ ...prev, update: true }));
    setError(null);

    try {
      const updatedUser = await apiCall(`/users/${userId}`, {
        method: "PUT",
        body: JSON.stringify(userData),
      });

      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, ...userData } : user,
        ),
      );
      setEditingUser(null);

      return updatedUser;
    } catch (err) {
      setError(`Failed to update user: ${err.message}`);
      throw err;
    } finally {
      setLoading((prev) => ({ ...prev, update: false }));
    }
  };

  // Load users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    if (!newUser.name || !newUser.email) {
      setError("Name and email are required");
      return;
    }

    try {
      await createUser(newUser);
    } catch (err) {
      // Error already handled in createUser
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    if (!editingUser.name || !editingUser.email) {
      setError("Name and email are required");
      return;
    }

    try {
      await updateUser(editingUser.id, editingUser);
    } catch (err) {
      // Error already handled in updateUser
    }
  };

  const deleteUser = async (userId) => {
    setLoading((prev) => ({ ...prev, delete: true }));
    setError(null);

    try {
      await apiCall(`/users/${userId}`, { method: "DELETE" });
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    } catch (err) {
      setError(`Failed to delete user: ${err.message}`);
    } finally {
      setLoading((prev) => ({ ...prev, delete: false }));
    }
  };

  return (
    <div>
      <h2>User Management System</h2>

      {error && (
        <div className="error-banner">
          <p>❌ {error}</p>
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      {/* Create User Form */}
      <div className="card">
        <h3>Add New User</h3>
        <form onSubmit={handleCreateSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) =>
              setNewUser((prev) => ({ ...prev, name: e.target.value }))
            }
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) =>
              setNewUser((prev) => ({ ...prev, email: e.target.value }))
            }
            required
          />
          <select
            value={newUser.role}
            onChange={(e) =>
              setNewUser((prev) => ({ ...prev, role: e.target.value }))
            }
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
          </select>
          <button type="submit" disabled={loading.create}>
            {loading.create ? "Creating..." : "Create User"}
          </button>
        </form>
      </div>

      {/* Users List */}
      <div className="card">
        <div className="section-header">
          <h3>Users ({users.length})</h3>
          <button onClick={fetchUsers} disabled={loading.fetch}>
            {loading.fetch ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {loading.fetch && users.length === 0 ? (
          <div className="loading">Loading users...</div>
        ) : (
          <div className="users-grid">
            {users.map((user) => (
              <div key={user.id} className="user-card">
                {editingUser?.id === user.id ? (
                  <form onSubmit={handleUpdateSubmit}>
                    <input
                      type="text"
                      value={editingUser.name}
                      onChange={(e) =>
                        setEditingUser((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      required
                    />
                    <input
                      type="email"
                      value={editingUser.email}
                      onChange={(e) =>
                        setEditingUser((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      required
                    />
                    <div className="edit-actions">
                      <button type="submit" disabled={loading.update}>
                        {loading.update ? "Saving..." : "Save"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingUser(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <h4>{user.name}</h4>
                    <p>{user.email}</p>
                    <p>Role: {user.role || "user"}</p>
                    <div className="user-actions">
                      <button onClick={() => setEditingUser(user)}>Edit</button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        disabled={loading.delete}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {users.length === 0 && !loading.fetch && (
          <div className="empty-state">
            <p>No users found. Create your first user above!</p>
          </div>
        )}
      </div>
    </div>
  );
}
