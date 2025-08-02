
const verifyToken = async (token) => {
  try {
    const response = await fetch('http://localhost:8000/api/auth/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    if (!response.ok) {
      throw new Error('Token no válido');
    }
    const data = await response.json();
    
    return data;
  }
  catch (error) {
    console.error('Error al verificar el token:', error);
    
    return false;
  }
}
 
export default verifyToken;
