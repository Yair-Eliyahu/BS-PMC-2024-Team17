const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Backend service is running on port ${port}`);
});
