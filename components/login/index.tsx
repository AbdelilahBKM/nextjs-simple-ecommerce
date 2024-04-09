import { useState, FormEvent } from "react";
import Style from "./style.module.css";
import Image from "next/image";
import Link from "next/link";
import formImage from "../../public/assets/images/form-image.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/clients/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        console.log("Login successful");
        // Redirect user or perform any action after successful login
      } else {
        const data = await response.json();
        setError(data.error || "An error occurred during login.");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      setError("An error occurred during login.");
    }
  };

  return (
    <main className={Style.main}>
      <div className={Style.image}>
        <Image
          className={Style["form-image"]}
          src={formImage}
          alt="image"
          width={805}
          height={706}
        />
      </div>
      <div className={Style.form}>
        <div className={Style.container}>
          <div className={Style["form-header"]}>
            <h2>Login to exclusive</h2>
            <p>Enter your details below</p>
          </div>
          <form className={Style["register-form"]} onSubmit={handleLogin}>
            <div className={Style["form__group"]}>
              <input
                className={Style["form__field"]}
                placeholder="Email Address"
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={Style["form__group"]}>
              <input
                className={Style["form__field"]}
                placeholder="Password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={Style["form__group"]}>
              <input
                className={Style["form__field"]}
                type="submit"
                value="Login"
              />
            </div>
            {error && <p className={Style.error}>{error}</p>}
          </form>
          <div className={Style.link}>
            Don&apos;t have an Account?
            <span className={Style.login}>
              <Link href={"/register"}>Register</Link>
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
