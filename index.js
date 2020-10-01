const express = require("express");

const app= express();
const bodyParser  = require("body-parser");
app.use(bodyParser.json());
require("./routes/userRoutes")(app);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running`);
});
