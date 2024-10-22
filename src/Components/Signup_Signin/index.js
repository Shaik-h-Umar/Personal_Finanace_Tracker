import React, { useState } from "react";
import "./styles.css";
import Input from "../Input";
import Button from "../Buttons";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, provider } from "../../firebase";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth/web-extension";

function SignupSigninComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginForm, setLoginForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function signupWithEmail() {
    setLoading(true);

    // Validate all fields are filled
    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      // Check if passwords match
      if (password === confirmPassword) {
        // Authenticate the user or sign up using email and password
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log("User >>>", user);
            toast.success("User Created Successfully!");
            setLoading(false); // Stop loading
            setName(""); // Clear input values
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            createDoc(user); // Call function to create user doc
            navigate("/dashboard");
          })
          .catch((error) => {
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false); // Stop loading
          });
      } else {
        toast.error("Passwords do not match!");
        setLoading(false); // Stop loading
      }
    } else {
      toast('All fields are mandatory. ⚠️', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
      setLoading(false); // Stop loading
    }
  }

  function loginUsingEmail() {
    console.log("Email", email);
    console.log("Password", password);
    setLoading(true);

    if (email !== "" && password !== "") {
      //code copied from the firebase documentation
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast.success("User Logged In.!");
          console.log("User Logged in ", user);
          setLoading(false);
          navigate("/dashboard");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false);
          toast.error(errorMessage);
        });
      // till here
    } else {
      toast('All fields are mandatory. ⚠️', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
      setLoading(false);
    }
  }

  async function createDoc(user) {
    setLoading(true);
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          creditAt: new Date(),
        });
        toast.success("Doc Created!");
        setLoading(false);
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      toast.error("Doc already exists");
      setLoading(false);
    }
  }

  function googleAuth() {
    setLoading(true);
    try{
        signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log("user>>>",user);
          createDoc(user);
          setLoading(false);
          navigate("/dashboard");
          toast.success("User Authenticated!");
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        })
        .catch((error) => {
            setLoading(false);
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
          // ...
        });
    }
    catch(e){
        setLoading(false);
        toast.error(e.message);
    }
  }

  return (
    //n React, the syntax <> </> is a shorthand way to declare a fragment, which groups a list of elements without adding extra nodes to the DOM.
    <>
      {loginForm ? (
        <div className="signup-wrapper">
          <h2 className="title">
            Login on <span style={{ color: "var(--theme)" }}>ProfitPath</span>
          </h2>

          <form onSubmit={loginUsingEmail}>
            <Input
              type="email"
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"Enter Your Email Ex. Ex@gmail.com"}
            />
            <Input
              type="password"
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Enter Your Password Ex. Example123"}
            />
            <Button
              disabled={loading}
              onClick={loginUsingEmail}
              type="submit"
              text={loading ? "Loading..." : "Login using Email and Password"}
            />
            <p className="p-login"> OR </p>
            <Button
              onClick={googleAuth}
              text={loading ? "Loading..." : "Login using Google"}
              Very_dark_cyan={true}
            />
            <p
              className="p-login"
              style={{ cursor: "pointer" }}
              onClick={() => setLoginForm(!loginForm)}
            >
              New user? Create an account.{" "}
            </p>
          </form>
        </div>
      ) : (
        <div className="signup-wrapper">
          <h2 className="title">
            Sign Up on <span style={{ color: "var(--theme)" }}>ProfitPath</span>
          </h2>

          <form onSubmit={signupWithEmail}>
            <Input
              type="text"
              label={"Full Name"}
              state={name}
              setState={setName}
              placeholder={"John Doe"}
            />
            <Input
              type="email"
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"Ex@gmail.com"}
            />
            <Input
              type="password"
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Example123"}
            />
            <Input
              type="password"
              label={"Confirm Password"}
              state={confirmPassword}
              setState={setConfirmPassword}
              placeholder={"Same As Password"}
            />
            <Button
              disabled={loading}
              onClick={signupWithEmail}
              type="submit"
              text={loading ? "Loading..." : "Signup using Email and Password"}
            />
            <p className="p-signin"> OR </p>
            <Button
              onClick={googleAuth} 
              text={loading ? "Loading..." : "Signup using Google"}
              Very_dark_cyan={true}
            />
            <p
              className="p-signin"
              style={{ cursor: "pointer" }}
              onClick={() => setLoginForm(!loginForm)}
            >
              Have an existing account? Log in.{" "}
            </p>
          </form>
        </div>
      )}
    </>
  );
}

export default SignupSigninComponent;

/*kabhi ye dua ke wo mera hai faqat
  kabhi ye drr ke wo mjhse juda to nhi
  kabhi ye dua ke mil jaye sarey jahan ke khushiya
  kabhi ye drr ke wo khush mere bina to nhi
  kabhi ye tamanna ke bss jau uske nigaho mein mai
  kabhi ye drr ke uske nigaho ko kisi ne dekha to nhi
  kabhi ye khwahish ke zamana ho muntazir uska
  kabhi ye waham ke wo kisi se mila to nhi
  kabhi ye aarzu ke wo jo maangey mil jaye usey
  kabhi ye waswasa ke usne mere siwa kch maanga to nhi 
  
  Insaan ke kandhe pe insaan jaa rhe hai
  kafan mai lipte kuch armaan jaa rhe hai
  jinhey mili mohabbat mai bewafa ki thokar
  wo wafa ke talaash mai Qabristaan jaa rhe hai 
  
  we shared a universe of dreams then suddenly, silence was the 
  only language left between us*/