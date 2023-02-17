import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";

const LoginButton = ({ className }) => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className={className}>
        <Chip
          sx={{
            "& .MuiChip-label:hover": { cursor: "pointer" },
            "@media screen and (max-width: 750px)": {
              "& .MuiChip-label": { display: "none" },
              "& .MuiSvgIcon-root": {
                zIndex: "10",
                position: "absolute",
                top: "1px",
                color: "rgb(107, 114, 128)",
              },
              bgcolor: "transparent",
              border: "none",
            },
          }}
          avatar={<Avatar alt="Natacha" src={session.user.image} />}
          label={session.user.name}
          variant="outlined"
          onDelete={() => signOut()}
        />
      </div>
    );
  }

  return (
    <div className={className} onClick={() => signIn()}>
      <Chip
        sx={{
          "& .MuiChip-label:hover": { cursor: "pointer" },
          "@media screen and (max-width: 700px)": {
            "& .MuiChip-label": { display: "none" },
            "& .MuiSvgIcon-root": {
              zIndex: "10",
              position: "absolute",
              top: "1px",
              color: "rgb(107, 114, 128)",
            },
            bgcolor: "transparent",
            border: "none",
          },
        }}
        avatar={<Avatar alt="Sign in avatar" />}
        label={"Sign in"}
        variant="outlined"
      />
    </div>
  );
};

export default LoginButton;
