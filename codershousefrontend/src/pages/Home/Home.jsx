import React from 'react'
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import Card from '../../Components/shared/Card/Card';
import Button from '../../Components/shared/Button/Button';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const linkstyle = {
    color: '#06b8f4',
    textDecoration: "none",
    fontWeight: "bold",
    marginLeft: "10px",
  }

  const navigate = useNavigate();
  const startRegistration = (e) => {
    e.preventDefault();
    navigate("/authenticate");
  }
  return (
    <div class="container">
      <div class="row mb-5">
        <div class="col-md-12">
          <div className={styles.cardWrapper}>
            <Card title="Welcome to CodersHub" icon="logo">
              <p className={styles.text}>
                The Coder's House is a user contribution driven approach and gives an excellent platform to coding enthusiasts and professionals to share and showcase their work .
              </p>
              <div>
                <Button text="Let's Go"
                  onClick={startRegistration}
                ></Button>
              </div>
              <div className={styles.signinwrapper}>
                <span className={styles.signintext}>
                  Have a Invite text?
                </span>
                <Link to="/login" style={linkstyle}>
                  Sign In
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
