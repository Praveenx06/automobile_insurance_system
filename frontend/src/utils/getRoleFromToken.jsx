// import { jwtDecode } from 'jwt-decode';

// export const getRoleFromToken = () => {
//   const token = localStorage.getItem('token');
//   if (!token) return 'USER'; // default fallback

//   try {
//     const decoded = jwtDecode(token);
//     console.log("Decoded"+JSON.stringify(decoded));
//     return decoded.role || 'USER';
//   } catch (err) {
//     console.error('Invalid token:', err);
//     return 'USER';
// }
// };
import { jwtDecode } from 'jwt-decode';

export const getRoleFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null; // no role if not logged in

  try {
    const decoded = jwtDecode(token);
    console.log("Decoded:", decoded);
    return decoded.role || null; // role comes from JWT payload
  } catch (err) {
    console.error('Invalid token:', err);
    return null;
  }
};
