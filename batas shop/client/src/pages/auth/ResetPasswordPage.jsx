import { useState } from "react";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { resetPassword } from "@/store/auth-slice";
import { useNavigate, useParams } from "react-router-dom";

function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams(); // Extract token from URL using useParams
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        variant: "destructive",
        style: {
          backgroundColor: "white",
          color: "black",
        },
        duration: 3000,
      });
      return;
    }

    try {
      const result = await dispatch(resetPassword({ token, newPassword })).unwrap();

      if (result.success) {
        toast({
          title: "Password reset successfully",
          style: {
            backgroundColor: "white",
            color: "black",
          },
          duration: 3000,
        });
        navigate("/auth/login"); // Redirect to login after successful reset
      } else {
        toast({
          title: result.message || "Failed to reset password",
          variant: "destructive",
          style: {
            backgroundColor: "white",
            color: "black",
          },
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        title: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
        style: {
          backgroundColor: "white",
          color: "black",
        },
        duration: 3000,
      });
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Reset Your Password
        </h1>
        <p className="mt-2">Enter your new password below.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="password"
          name="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ResetPasswordPage;
