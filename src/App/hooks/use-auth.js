import { useSelector } from 'react-redux';

export function useAuthorization() {
  const { email, token, id } = useSelector((state) => state.user);
  return {
    isAuthorized: !!email,
    userEmail: email,
    userToken: token,
    userId: id,
  };
}
