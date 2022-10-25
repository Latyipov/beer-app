import { useSelector } from 'react-redux';

export function useAuthentication() {
  const { email, name, token, id } = useSelector((state) => state.user);
  return {
    isAuthorized: !!email,
    userEmail: email,
    userName: name,
    userToken: token,
    userId: id,
  };
}
