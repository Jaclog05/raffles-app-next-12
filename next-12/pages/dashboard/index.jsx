import axios from "axios";
import { useState, useEffect } from "react";
import styles from './dashboard.module.css'
import { useRouter } from "next/router";

function Dashboard() {
  const [user, setUser] = useState({
    email: "",
    username: "",
  });

  const getProfile = async () => {
    try {
      const profile = await axios.get("http://localhost:4000/profile", {
        withCredentials: true
      });
      setUser(profile.data);
    } catch (error) {
      console.log("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    getProfile();
  }, [])

  return (
    <div className={styles.wrapper}>
      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>
    </div>
  );
}

export default Dashboard;