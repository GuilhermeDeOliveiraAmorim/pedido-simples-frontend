import { useQuery } from "@tanstack/react-query";

export const useAccessToken = () => {
  const { data } = useQuery({
    queryKey: ["accessToken"],
    queryFn: () => {
      return localStorage.getItem("access_token") || null;
    },
  });

  const setAccessToken = (token: string) => {
    localStorage.setItem("access_token", token);
  };

  const clearAccessToken = () => {
    localStorage.removeItem("access_token");
  };

  return { accessToken: data, setAccessToken, clearAccessToken };
};
