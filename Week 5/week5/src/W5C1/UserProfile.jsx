import { useState, useEffect } from "react";
import avatar1 from "../assets/1.png";
import avatar2 from "../assets/2.png";

export default function UserProfile({ userId, onSelectUser }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState({
    user: false,
    posts: false,
  });
  const [error, setError] = useState({
    user: null,
    posts: null,
  });

  // Fetch user data when userId changes
  useEffect(() => {
    if (!userId) {
      setUser(null);
      return;
    }

    const abortController = new AbortController();

    const fetchUser = async () => {
      setLoading((prev) => ({ ...prev, user: true }));
      setError((prev) => ({ ...prev, user: null }));

      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const response = await fetch(`/api/users/${userId}`, {
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError((prev) => ({ ...prev, user: err.message }));
        }
      } finally {
        setLoading((prev) => ({ ...prev, user: false }));
      }
    };

    fetchUser();

    return () => {
      abortController.abort();
    };
  }, [userId]);

  // Fetch user posts when user changes
  useEffect(() => {
    if (!user) {
      setPosts([]);
      return;
    }

    const abortController = new AbortController();

    const fetchPosts = async () => {
      setLoading((prev) => ({ ...prev, posts: true }));
      setError((prev) => ({ ...prev, posts: null }));

      try {
        await new Promise((resolve) => setTimeout(resolve, 800));

        const response = await fetch(`/api/users/${user.id}/posts`, {
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch posts: ${response.status}`);
        }

        const postsData = await response.json();
        setPosts(postsData);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError((prev) => ({ ...prev, posts: err.message }));
        }
      } finally {
        setLoading((prev) => ({ ...prev, posts: false }));
      }
    };

    fetchPosts();

    return () => {
      abortController.abort();
    };
  }, [user]);

  useEffect(() => {
    if (user) {
      document.title = `Profile: ${user.name}`;
    } else {
      document.title = `User Profile`;
    }

    return () => {
      document.title = "React App";
    };
  }, [user]);

  //Simulate real API responses
  useEffect(() => {
    //Mock API Setup

    const mockUsers = {
      1: {
        id: 1,
        name: "Raddkun City",
        email: "john@example.com",
        avatar: avatar1,
      },
      2: {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        avatar: avatar2,
      },
    };

    const mockPosts = {
      1: [
        {
          id: 1,
          title: "My First Post",
          content: "Skibid skibid skibid skibid",
          date: "2024-01-15",
        },
        {
          id: 2,
          title: "what kind of -ism you have?",
          content: "it's raaaayyyy--",
          date: "2024-01-16",
        },
      ],
      2: [
        {
          id: 3,
          title: "Javascript Tricks",
          content: "Async/await is great!",
          date: "2024-01-17",
        },
      ],
    };

    // Override fetch for demo
    const originalFetch = window.fetch;
    window.fetch = async (url, options) => {
      if (options?.signal?.aborted) {
        const error = new Error("The user aborted a request.");
        error.name = "AbortError";
        throw error;
      }

      if (url.includes("/api/users/") && !url.includes("/posts")) {
        const userId = parseInt(url.split("/").pop());
        const user = mockUsers[userId];

        if (user) {
          return {
            ok: true,
            json: async () => user,
          };
        } else {
          return { ok: false, status: 404 };
        }
      }

      if (url.includes("/posts")) {
        const userId = parseInt(url.split("/")[3]);
        const posts = mockPosts[userId] || [];

        return {
          ok: true,
          json: async () => posts,
        };
      }

      return originalFetch(url, options);
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  if (!userId) {
    return (
      <div className="user-profile" style={{ textAlign: "center" }}>
        <p>Please select a user to view their profile.</p>
        {/* Clickable Image Choices */}
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            gap: "20px",
            margin: "15px 0",
          }}
        >
          <a
            href="#user1"
            onClick={(e) => {
              e.preventDefault();
              onSelectUser?.(1);
            }}
            style={{ textDecoration: "none", textAlign: "center" }}
          >
            <img
              src={avatar1}
              alt="User 1"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            />
            <div>User 1</div>
          </a>

          <a
            href="#user2"
            onClick={(e) => {
              e.preventDefault();
              onSelectUser?.(2);
            }}
            style={{ textDecoration: "none", textAlign: "center" }}
          >
            <img
              src={avatar2}
              alt="User 2"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            />
            <div>User 2</div>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="user-profile">
      <div className="user-section">
        <h2>User Profile</h2>

        {loading.posts && <div className="loading">Loading user...</div>}

        {error.user && (
          <div className="error">
            Error loading user: {error.user}
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        )}

        {user && !loading.user && (
          <div className="user-info">
            <img
              src={user.avatar}
              alt={user.name}
              style={{ height: "100px" }}
            />
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        )}
        <button onClick={() => onSelectUser?.(0)}>Choose another user</button>
      </div>

      <div className="posts-section">
        <h3>User Posts</h3>

        {loading.posts && <div className="loading">Loading posts...</div>}

        {error.posts && (
          <div className="error">Error loading posts: {error.posts}</div>
        )}

        {posts.length > 0 && !loading.posts && (
          <div className="posts-lists">
            {posts.map((post) => (
              <div key={post.id} className="post-card">
                <h4>{post.title}</h4>
                <p>{post.content}</p>
                <small>{post.date}</small>
              </div>
            ))}
          </div>
        )}

        {posts.length === 0 && !loading.posts && !error.posts && user && (
          <p>No posts found for this user.</p>
        )}
      </div>
    </div>
  );
}
