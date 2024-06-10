export const getItem = (key: string): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  };
  
  export const setItem = (key: string, value: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  };
  
  export const removeItem = (key: string) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  };
  
  export const checkRefreshToken = (): string => {
    const refreshToken = getItem('refreshToken');
    if (!refreshToken) {
      // Handle case where refresh token is missing (e.g., logout)
      throw new Error('Missing refresh token');
    }
    return refreshToken;
  };
  