const User = require("../models/User");
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Get All products
const index = async (req, res) => {
    try {
        const products = await User.find();
        res.json(products);
      } catch (error) {
        res.json({ message: error });
      }
};

// Single product
const show = async (req, res) => {
    try {
        const product = await User.findById(req.params.id);
        res.json(product);
      } catch (error) {
        res.json({ message: error });
      }
};

// Add New product
const store = async (req, res) => {
    User.findOne({
      email: req.body.email
    }).then(user => {

      if(user) {
        return res.status(400).json({
            email: 'Email already exists'
        });
      }else{

        const avatar = gravatar.url(req.body.email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password ,
        avatar,
      });
      try {
        bcrypt.genSalt(10, (err, salt) => {
          if(err) console.error('There was an error', err);
          else {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if(err) console.error('There was an error', err);
                  else {
                      newUser.password = hash;
                      newUser.save()
                          .then(user => {
                              res.json(user)
                          }); 
                  }
              });
          }
        });
        // const savedUser = await user.save();
        // res.send(savedUser);
      } catch (error) {
        res.status(400).send(error);
      }
    }

  })
  
};

// Update product
const update = async (req, res) => {
    try {
        const user = {
          name: req.body.name,
          email: req.body.email,
        };
    
        const updatedProduct = await User.findByIdAndUpdate(
          { _id: req.params.id },
          user
        );
        res.json(updatedProduct);
      } catch (error) {
        res.json({ message: error });
      }
};

// Delete product
const destroy = async (req, res) => {
    try {
        const removeProduct = await User.findByIdAndDelete(req.params.id);
        res.json(removeProduct);
      } catch (error) {
        res.json({ message: error });
      }
};

module.exports = {
    index, 
    show, 
    store, 
    update, 
    destroy
  }