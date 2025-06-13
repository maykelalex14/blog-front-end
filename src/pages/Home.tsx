import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../services/api';
import { Post } from '../types';
import '../styles/Home.css';

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch posts');
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="container">
      <h1>Welcome to Steakz Management Information System</h1>
      <p style={{fontSize: '1.2rem', color: '#555'}}>Manage your restaurant operations, staff, menu, and more with ease.</p>
      <div style={{display: 'flex', gap: 32, flexWrap: 'wrap', margin: '32px 0'}}>
        <div style={{flex: 1, minWidth: 260, background: '#fff8f0', borderRadius: 10, padding: 24, boxShadow: '0 2px 8px #e85d0440'}}>
          <h2 style={{color: '#e85d04'}}>Menu</h2>
          <p>View and manage all menu items, prices, and categories.</p>
          <Link to="/menu"><button>Go to Menu</button></Link>
        </div>
        <div style={{flex: 1, minWidth: 260, background: '#fff8f0', borderRadius: 10, padding: 24, boxShadow: '0 2px 8px #e85d0440'}}>
          <h2 style={{color: '#e85d04'}}>Reservations</h2>
          <p>Manage table bookings and customer reservations.</p>
          <Link to="/reservations"><button>Go to Reservations</button></Link>
        </div>
        <div style={{flex: 1, minWidth: 260, background: '#fff8f0', borderRadius: 10, padding: 24, boxShadow: '0 2px 8px #e85d0440'}}>
          <h2 style={{color: '#e85d04'}}>Staff</h2>
          <p>View and manage restaurant staff and roles.</p>
          <Link to="/staff"><button>Go to Staff</button></Link>
        </div>
        <div style={{flex: 1, minWidth: 260, background: '#fff8f0', borderRadius: 10, padding: 24, boxShadow: '0 2px 8px #e85d0440'}}>
          <h2 style={{color: '#e85d04'}}>Inventory</h2>
          <p>Track and update inventory for ingredients and supplies.</p>
          <Link to="/inventory"><button>Go to Inventory</button></Link>
        </div>
        <div style={{flex: 1, minWidth: 260, background: '#fff8f0', borderRadius: 10, padding: 24, boxShadow: '0 2px 8px #e85d0440'}}>
          <h2 style={{color: '#e85d04'}}>Reports</h2>
          <p>View analytics and reports for sales, reservations, and more.</p>
          <Link to="/reports"><button>Go to Reports</button></Link>
        </div>
        <div style={{flex: 1, minWidth: 260, background: '#fff8f0', borderRadius: 10, padding: 24, boxShadow: '0 2px 8px #e85d0440'}}>
          <h2 style={{color: '#e85d04'}}>Contact</h2>
          <p>Contact Steakz for support or inquiries.</p>
          <Link to="/contact"><button>Contact Us</button></Link>
        </div>
      </div>
      <div className="post-list">
        {loading ? <div>Loading...</div> : error ? <div>{error}</div> : posts.map((post) => (
          <div key={post.id} className="post-card">
            <h2>
              <Link to={`/post/${post.id}`}>{post.title}</Link>
            </h2>
            {post.comments.length > 0 && (
              <p className="first-comment">
                First Comment: {post.comments[0].content} by {post.comments[0].userName || post.comments[0].authorId}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

// TODO: Students - Enhance the landing page with the following:
// 1. Add pagination for posts using the API's pagination support
// 2. Add search/filter functionality to filter posts by title or author
// 3. Improve error handling with retry mechanisms
// 4. Add loading skeletons for better UX
