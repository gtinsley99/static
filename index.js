const express = require("express");
const app = express();
const port = 5001;

app.use("/public", express.static("public"));

app.listen(port, () => console.log(`Server is listening on port ${port}`));