import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { FaGoogle } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../lib/AuthProvider";
import { useNotifications } from "../utils/useNotifications";

const LoginSignup = () => {
  const navigate = useNavigate();
  const { login, signup, signInWithGoogle } = useAuth();
  const { currentUser } = useAuth()
  const {sendNotification} = useNotifications();
  // redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      toast.error("You are already logged in");
      navigate("/");
    }
  }, []);

  // -------- Login state & handler --------
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoadingLogin(true);
    try {
      await login(loginEmail, loginPassword);
      toast.success("Logged in successfully!");
      
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Login failed");
    } finally {
      setLoadingLogin(false);
    }
  };

  // -------- Signup state & handler --------
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [loadingSignup, setLoadingSignup] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoadingSignup(true);
    try {
      await signup(signupEmail, signupPassword);
      toast.success("Account created!");
     
      navigate("/onboarding");
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Signup failed");
    } finally {
      setLoadingSignup(false);
    }
  };

  // placeholder for Google login — implement in AuthProvider and call here
  const handleGoogle = async (e) => {
    e.preventDefault();
    setLoadingSignup(true);
    try {
      await signInWithGoogle();
      toast.success("Account created!");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Signup failed");
    } finally {
      setLoadingSignup(false);
    }
  };

  return (
    <div className="flex w-full h-screen justify-center items-center px-2">
      <Tabs
        className="w-full flex justify-center items-center"
        defaultValue="login"
      >
        <TabsList className="w-full max-w-sm">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>

        {/* ---------------- LOGIN ---------------- */}
        <TabsContent
          value="login"
          className="w-full flex justify-center items-center"
        >
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email & password to continue
              </CardDescription>
            </CardHeader>

            <CardContent>
              {/* NOTE: button must be inside this form or use form=... attribute */}
              <form
                id="loginForm"
                onSubmit={handleLogin}
                className="flex flex-col gap-6"
              >
                <div className="grid gap-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="login-password">Password</Label>
                    <button
                      type="button"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-neutral-400"
                      onClick={() => toast("Reset flow not implemented")}
                    >
                      Forgot your password?
                    </button>
                  </div>
                  <Input
                    id="login-password"
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="flex flex-col gap-2 mt-2">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={loadingLogin}
                  >
                    {loadingLogin ? "Logging in..." : "Login"}
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    className="w-full"
                    onClick={handleGoogle}
                  >
                    <FaGoogle className="mr-2" /> Login with Google
                  </Button>
                </div>
              </form>
            </CardContent>

            <CardFooter className="flex-col gap-2">
              <div className="text-xs text-neutral-500">
                Don&apos;t have an account?{" "}
                <Link to="#signup" className="text-yellow-400">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* ---------------- SIGNUP ---------------- */}
        <TabsContent
          value="signup"
          className="w-full flex justify-center items-center"
        >
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Create Account</CardTitle>
              <CardDescription>
                Enter your details to create an account
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form
                id="signupForm"
                onSubmit={handleSignup}
                className="flex flex-col gap-6"
              >
                <div className="grid gap-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    type="text"
                    placeholder="Your display name"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="flex flex-col gap-2 mt-2">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={loadingSignup}
                  >
                    {loadingSignup ? "Creating..." : "Signup"}
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    className="w-full"
                    onClick={handleGoogle}
                  >
                    <FaGoogle className="mr-2" /> Signup with Google
                  </Button>
                </div>
              </form>
            </CardContent>

            <CardFooter className="flex-col gap-2">
              <div className="text-xs text-neutral-500">
                Already have an account?{" "}
                <Link to="#login" className="text-yellow-400">
                  Login
                </Link>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoginSignup;
