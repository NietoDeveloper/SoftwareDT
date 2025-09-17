// frontend/components/auth/withAdminAuth.js
import withAuth from './withAuth';

// Simple wrapper around withAuth specifically for admin role
const withAdminAuth = (WrappedComponent) => {
  return withAuth(WrappedComponent, { requiredRole: 'admin' });
};

export default withAdminAuth;