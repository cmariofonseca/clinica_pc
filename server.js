const app = require('./src/app')

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server running on port: ${port}, open your browser on https://localhost:${port}/login`);
});
