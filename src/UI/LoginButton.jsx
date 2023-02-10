import { useSession, signIn, signOut } from "next-auth/react";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";

const LoginButton = ({ className }) => {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className={className}>
        <LogoutIcon onClick={() => signOut()} />
      </div>
    );
  }
  return (
    <div className={className}>
      <PersonIcon onClick={() => signIn()} />
    </div>
  );
};

export default LoginButton;
