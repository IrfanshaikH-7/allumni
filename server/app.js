require('dotenv').config();
const express = require('express');
const cors = require("cors");
const passport= require("passport");
const cookieSession = require("cookie-session");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passportStrategy = require("./passport");
const authRoutes = require("./routes/auth");
require('dotenv').config();

const contactRoute = require('./routes/contact-routes');
const adminRoute = require('./routes/admin-routes');



const app= express();

const User = require('./model/user.model');
const mongoose = require("mongoose");



// app.use(
//     cookieSession({
//         name :"session",
//         keys:["IES IPS"],
//         maxAge: 24 * 60 * 60 * 100,
//     })
// );

// app.use(passport.initialize());
// app.use(passport.session());
//app.use("./passport",passportSetup)


app.use(express.json());
app.use(cors());
app.use("/api/admin",adminRoute);


 //app.use("/auth",authRoutes)
app.get("/", (req, res) => {
    res.send("Hello ");

})

app.post('/api/auth/update/:id', (req, res) => {
    const { id } = req.params;
    const { clg_email, type_of_job, date_of_joining, department, role, yearOfjoining, current_designation } = req.body;
  
    User.findByIdAndUpdate(id, {
     
        clg_email: clg_email,
        type_of_job: type_of_job,
        date_of_joining: date_of_joining,
        department: department,
        role: role,
        yearOfjoining: yearOfjoining,
        current_designation: current_designation,
      
    }, { new: true })
      .then(updatedUser => {
        if (updatedUser) {
          res.json({ message: 'User updated successfully', user: updatedUser });
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      })
      .catch(error => {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating user' });
      });
  });

app.post('/api/auth/google', (req, res) => {
const { name, email, picture } = req.body;
    User.findOne({ email })
      .then(existingUser => {
        if (existingUser) {
          return res.status(200).json({ message: 'User already exists', user: existingUser });
        }
        const user = new User({ name, email, picture });
        return user.save()
          .then(savedUser => res.json({ message: 'User created suceessfully', user: existingUser }))
          .catch(err => res.status(500).json({ error: err }));
      })
      .catch(err => res.status(500).json({ error: err }));
});


const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate the JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expires in 1 hour
    });

    // Send the token in the response
    return res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;


// Function to create admin user
const createAdmin = async () => {
    // Hash the admin password
    const hashedPassword = await bcrypt.hash('admin123', 10);
  
    // Create new admin user
    const admin = new User({
      name: 'ips',
      email: 'ips2024@gmail.com',
      password: hashedPassword ,
     
    });
  
    // Save admin to MongoDB
    try {
      await admin.save();
      console.log('Admin user created successfully');
    } catch (error) {
      console.error('Error creating admin user:', error);
    } finally {
      mongoose.connection.close();  // Close the connection after the script runs
    }
  };
  
  // Call the function to create the admin user
  createAdmin();





const PORT = process.env.PORT ||8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });
  });