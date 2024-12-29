import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyUser } from "@/store/auth-slice"; // Add this action to verify the code
import { useToast } from "@/hooks/use-toast"; // Assuming you have a custom toast hook

function AuthVerify() {
  const [verificationCode, setVerificationCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Track form submission state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast(); // Use toast for notifications

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!verificationCode) {
      toast({
        title: "Please enter a verification code.",
        variant: "destructive",
        style: { backgroundColor: "white", color: "black" },
        duration: 3000,
      });
      return;
    }

    setIsSubmitting(true);
    const formData = { verificationCode }; // Send verification code to server

    dispatch(verifyUser(formData))
      .then((data) => {
        setIsSubmitting(false);
        if (data?.payload?.success) {
          toast({
            title: "Verification successful!",
            style: { backgroundColor: "white", color: "black" },
            duration: 3000,
          });
          navigate("/auth/login");
        } else {
          toast({
            title: data?.payload?.message || "Verification failed",
            variant: "destructive",
            style: { backgroundColor: "white", color: "black" },
            duration: 3000,
          });
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
        toast({
          title: "An error occurred. Please try again.",
          variant: "destructive",
          style: { backgroundColor: "white", color: "black" },
          duration: 3000,
        });
      });
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Verify Your Email
        </h1>
        <p className="mt-2">Enter the verification code sent to your email.</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="verificationCode" className="block text-sm font-medium">
            Verification Code
          </label>
          <input
            type="text"
            id="verificationCode"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting} // Disable the button while submitting
          className="mt-6 w-full py-2 bg-blue-600 text-white rounded-md"
        >
          {isSubmitting ? "Verifying..." : "Verify"}
        </button>
      </form>
    </div>
  );
}

export default AuthVerify;
