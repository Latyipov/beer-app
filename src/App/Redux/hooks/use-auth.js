import { useSelector } from 'react-redux';

export function useAuthorization() {
  const { email, name, token, id } = useSelector((state) => state.user);
  return {
    isAuthorized: !!email,
    userEmail: email,
    userName: name,
    userToken: token,
    userId: id,
  };
}
