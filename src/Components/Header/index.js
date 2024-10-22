import React, { useEffect } from 'react';
import "./styles.css";
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import userImg from "../../Assets/user.svg"

function Header() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard"); 
    }
  }, [user, loading, navigate]);  

  function logoutFnc() {
    try{
      signOut(auth).then(() => {
        // Sign-out successful.
        toast.success("Logout Successful");
        navigate("/")
      }).catch((error) => {
        toast.error(error.message);
        // An error happened.
      });
    }
    catch(e){
      toast.error(e.message);
    }
  }

  return (
    <div className="navbar">
      <p className="logo">ProfitPath</p>
      {user && (
        <div style={{display:"flex",alignItems:"center",gap:"0.8rem"}}>

        <img 
        src={user.photoURL ? user.photoURL : userImg}
        style={{height:"1.5rem" , width:"1.5rem",borderRadius:"50%"}} 
        />
        
      <p className="logo link" onClick={logoutFnc}>Logout</p>
      </div>
      )}
    </div>
  );
}

export default Header;
