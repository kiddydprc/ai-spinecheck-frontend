import { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleSignIn = () => {
    if (email && password) setSignedIn(true);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadMessage("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("https://ai-spinecheck-backend.onrender.com/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setUploadMessage("Upload successful!");
      setAnalysisResult(data); // Save the AI response
    } catch (err) {
      console.error(err);
      setUploadMessage("Upload failed");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", textAlign: "center" }}>
      <h1>AI SpineCheck</h1>

      {!signedIn ? (
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: "10px", margin: "10px", width: "80%" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: "10px", margin: "10px", width: "80%" }}
          />
          <br />
          <button
            onClick={handleSignIn}
            style={{ padding: "12px 24px", marginTop: "20px", cursor: "pointer" }}
          >
            Sign In
          </button>
        </div>
      ) : (
        <div>
          <p>Welcome, {email}!</p>
          <input type="file" onChange={handleFileChange} />
          <br />
          <button
            onClick={handleUpload}
            style={{ padding: "12px 24px", marginTop: "10px", cursor: "pointer" }}
          >
            Analyze Image
          </button>
          <p>{uploadMessage}</p>

          {/* Show AI Results */}
          {analysisResult && (
            <div style={{ marginTop: "20px", textAlign: "left" }}>
              <h3>AI Analysis Result:</h3>
              <pre style={{ background: "#f4f4f4", padding: "10px", borderRadius: "6px" }}>
                {JSON.stringify(analysisResult, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
