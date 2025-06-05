
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SecretKeyLoginProps {
  onAuthentication: (success: boolean) => void;
}

const SecretKeyLogin = ({ onAuthentication }: SecretKeyLoginProps) => {
  const [secretKey, setSecretKey] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (secretKey === "Wearazaro#") {
      onAuthentication(true);
      setError("");
    } else {
      setError("Access Denied - Invalid Secret Key");
      setSecretKey("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-light">Product Management</CardTitle>
          <p className="text-gray-600">Enter secret key to access</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="Enter secret key"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              className="text-center"
            />
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <Button type="submit" className="w-full bg-black hover:bg-gray-800">
              Access Dashboard
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecretKeyLogin;
