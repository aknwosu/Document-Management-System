import app from './server/app';

const port = process.env.PORT;

// Start server
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});