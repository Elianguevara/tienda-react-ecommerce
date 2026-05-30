import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="app-wrapper">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
// Clickable link to file: [Layout.jsx](file:///C:/Users/elian/.gemini/antigravity/scratch/tienda-react-ecommerce/src/components/Layout.jsx)
