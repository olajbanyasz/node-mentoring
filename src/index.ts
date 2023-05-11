import express = require('express');
import bodyParser = require('body-parser');
import userRouter from "./routers/user-router";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/', userRouter);
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
