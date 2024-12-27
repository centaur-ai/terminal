const cors = require("cors");
const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());
app.use(cors());

let postData = {};

app.get("/evaluate/:id", (req, res) => {
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
      content: postData.content,
      desc: postData.description,
    };

    return `data: ${JSON.stringify(data)}\n\n`;
  };

  res.write(`data: ${JSON.stringify({"type": "system", "event": "stream_start", "description": "Logical Description"})}\n\n`);

  const intervalId = setInterval(() => {
    res.write(generateData());
  }, 1000);

  req.on("close", () => {
    clearInterval(intervalId);
    console.log("Client disconnected");
  });
});

app.post("/evaluate", (req, res) => {
  const { content, pwl, file, description } = req.body;
  const id = uuidv4();

  if (content !== undefined) {
    if (!content) {
      return res.status(400).send("Content is required");
    }
    console.log("Message received:", content);
    console.log("Message received:", content);

    console.log("Message received:", content);

    if (pwl) {
      console.log("PWL value:", pwl);
    }
    postData = { content, description };
    return res
      .status(200)
      .json({ status: "Message received", content, pwl, id });
  }

  if (file !== undefined) {
    if (!file) {
      return res.status(400).send("File is required");
    }
    console.log("File received:", file);
    postData = { file, description };
    return res
      .status(200)
      .json({ status: "Message received", file, id, description });
  }

  return res.status(400).send("Either content or file is required");
});

app.listen(5000, () => {
  console.log("Server listening on port 3000");
});
