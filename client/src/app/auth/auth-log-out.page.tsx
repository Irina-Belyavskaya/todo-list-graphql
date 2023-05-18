import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

// ============== Graphql ==============
import { useQuery } from "@apollo/client";
import { LOG_OUT } from "app/graphql/users";
import { useEffect } from "react";

export default function AuthLogOutPage() {
  const navigate = useNavigate();

  const { data: logOut, error } = useQuery(LOG_OUT,
      {
        onCompleted(data){
          if (data.logOut) {
            Cookies.remove('jwt_token');
            Cookies.remove('expired_at');
            navigate('/', { replace: true });
          }
        }
      }
    );

  useEffect(() => {
    if (error) {
      Cookies.remove('jwt_token');
      Cookies.remove('expired_at');
      navigate('/', { replace: true });
    }
  }, [error])

  return(<></>);
}