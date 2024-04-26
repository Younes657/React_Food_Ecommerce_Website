import { jwtDecode } from "jwt-decode";
import { SD_Roles } from "../Utility/SD";

const withAdminAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const accessToken = localStorage.getItem("Token") ?? "";
    if (accessToken) {
      const decode : {
        role: string;
      } = jwtDecode(accessToken);
      if(decode.role !== SD_Roles.Admin){
        window.location.replace('/AccessDenied')
        return null
      }
    }else{
        window.location.replace('/Login')
        return null
    }
      return <WrappedComponent {...props}></WrappedComponent>
    }
  };
export default withAdminAuth;
