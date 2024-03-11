import { useState } from "react";
import { Link, Outlet, useLoaderData } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Button, CssBaseline } from "@mui/material";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [{ data }, setData] = useState(useLoaderData());
  console.log(username);
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position='sticky' sx={{ flexGrow: 1 }}>
          <Toolbar>
            <img
              src={`${process.env.PUBLIC_URL}/logo64.png`}
              alt='TCG Atlas Logo'
            />
            <Typography
              noWrap
              component='div'
              href='/'
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Home
            </Typography>
            {data.map((tcg) => (
              <Typography
                sx={{
                  flexGrow: 1,
                }}
                component={Link}
                to={`/tcgs/${tcg.id}`}
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                {tcg.name}
              </Typography>
            ))}
            {username ? (
              <Button component={Link} to={"/profile"}>
                <AccountCircle /> {username}
              </Button>
            ) : (
              <Button
                component={Link}
                to={`/login`}
                style={{ color: "inherit", textDecoration: "inherit" }}
                color='inherit'
              >
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>

        <Outlet />
      </ThemeProvider>
    </div>
  );
}

export default App;
