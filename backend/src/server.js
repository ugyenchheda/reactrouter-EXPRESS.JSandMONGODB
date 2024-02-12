import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;
import Contacts from './routes/contactRoutes';

// Use of CORS middleware
app.use(cors());

// Defining routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
app.use('/', Contacts)