import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useAutoLogout(timeout = 15 * 60 * 1000) {
  const navigate = useNavigate();

  useEffect(() => {
    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userData');
        localStorage.removeItem('adminToken');
        navigate('/');
      }, timeout);
    };

    const events = ['mousemove', 'keydown', 'click'];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer();

    return () => {
      clearTimeout(timer);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [navigate, timeout]);
}
