function App() {
  return (
    <div style={{
      maxWidth: "600px",
      margin: "40px auto",
      textAlign: "center",
      fontFamily: "Arial, sans-serif"
    }}>
      <h1>AI SpineCheck</h1>
      <p>Upload a photo of your back for scoliosis screening.</p>

      <button style={{
        padding: "12px 24px",
        marginTop: "20px",
        fontSize: "16px",
        borderRadius: "8px",
        border: "none",
        backgroundColor: "#0070f3",
        color: "#fff",
        cursor: "pointer"
      }}>
        Upload Image
      </button>
    </div>
  );
}

export default App;
