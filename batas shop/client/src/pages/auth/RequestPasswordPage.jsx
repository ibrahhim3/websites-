import { useState } from "react";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { requestPasswordReset } from "@/store/auth-slice";
import { useNavigate } from "react-router-dom";

function RequestPasswordPage() {
  const [formData, setFormData] = useState({ email: "" });
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(requestPasswordReset(formData.email))
      .then((data) => {
        if (data?.payload?.success) {
          toast({
            title: "Password reset email sent",
            style: {
              backgroundColor: "white",
              color: "black",
            },
            duration: 2000,
          });
          navigate("/auth/login"); // Redirect to login after successful request
        } else {
          toast({
            title: data?.payload?.message || "Failed to send email",
            variant: "destructive",
            style: {
              backgroundColor: "white",
              color: "black",
            },
            duration: 2000,
          });
        }
      })
      .catch(() => {
        toast({
          title: "Something went wrong. Please try again.",
          variant: "destructive",
          style: {
            backgroundColor: "white",
            color: "black",
          },
          duration: 2000,
        });
      });
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Request Password Reset
        </h1>
        <p className="mt-2">Enter your email to receive a reset link.</p>
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
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
}

export default RequestPasswordPage;
