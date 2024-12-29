import { useState } from "react";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { verifyUser } from "@/store/auth-slice";
import { useNavigate } from "react-router-dom";

function VerifyPage() {
  const [formData, setFormData] = useState({ email: "", code: "" });
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch the verifyUser action with email and verification code
    dispatch(verifyUser({email: formData.email, code: formData.code})).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Verification successful",
          style: {
            backgroundColor: "white",
            color: "black",
          },
          duration: 3000,
        });
        navigate("/auth/login"); // Navigate to the login page after successful verification
      } else {
        toast({
          title: data?.payload?.message || "Verification failed",
          variant: "destructive",
          style: {
            backgroundColor: "white",
            color: "black",
          },
          duration: 3000,
        });
      }
    });
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Verify Your Account
        </h1>
        <p className="mt-2">
          Please enter your email and the verification code sent to your email.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="code"
          value={formData.code}
          onChange={handleChange}
          placeholder="Enter verification code"
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Verify
        </button>
      </form>
    </div>
  );
}

export default VerifyPage;
