import { Button, ButtonGroup } from "@mui/material";
import styles from "./index.module.css";
import Logo from "../../images/Logo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Header() {
  const { logedIn } = useSelector((state: RootState) => state.user);
  return (
    <header className={styles.header}>
      <Link to="/">
        <img className={styles.logo} src={Logo} alt="not found" />
      </Link>
      <div className={styles.signSection}>
        {logedIn ? (
          <Link to="/profile">
            <Button startIcon={<AccountCircleIcon />} variant="contained">
              Profile
            </Button>
          </Link>
        ) : (
          <ButtonGroup>
            <Link to="/signin">
              <Button variant="contained">Sign in</Button>
            </Link>
            <Link to="/signup">
              <Button variant="contained" color="success">
                Sign up
              </Button>
            </Link>
          </ButtonGroup>
        )}
      </div>
    </header>
  );
}
