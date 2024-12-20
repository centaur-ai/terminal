import cors from "cors";
import express from "express";

const app = express();

app.use(cors());

app.get("/evaluate", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  const generateData = () => {
    const axioms = ["Axiom 1", "Axiom 2", "Axiom 3"];
    const descriptions = ["Description 1", "Description 2", "Description 3"];

    const data = {
      axiom: axioms[Math.floor(Math.random() * axioms.length)],
      description:
        descriptions[Math.floor(Math.random() * descriptions.length)],
      data: Math.random() * 100,
      rate: Math.random() * 10,
    };

    return `data: ${JSON.stringify(data)}\n\n`;
  };

  const intervalId = setInterval(() => {
    res.write(generateData());
  }, 1000);

  req.on("close", () => {
    clearInterval(intervalId);
    console.log("Client disconnected");
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
