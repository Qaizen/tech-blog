const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

// GET all users
router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] }
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET user by id
router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Post,
        attributes: ['id', 'title', 'post_body', 'createdAt']
      },
      {
        model: Comment,
        include: {
          model: Post,
          attributes: ['title']
        }
      }
    ]
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// POST /api/users
router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
  })
  .then((dbUserData) => {
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json(dbUserData);
    });
  });
});

//POST login page
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: "No user with that username!" });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }

    req.session.save(() => {
      // declare session variables
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: "You are now logged in!" });
    });
  });
});

//POST /logout page
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }
});


// PUT update a user
// router.put("/:id", (req, res) => {
// 
  // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
//   User.update(req.body, {
//     individualHooks: true,
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((dbUserData) => {
//       if (!dbUserData[0]) {
//         res.status(404).json({ message: "No user found with this id" });
//         return;
//       }
//       res.json(dbUserData);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// DELETE a user
// router.delete("/:id", (req, res) => {
//   User.destroy({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((dbUserData) => {
//       if (!dbUserData) {
//         res.status(404).json({ message: "No user found with this id" });
//         return;
//       }
//       res.json({ message: "User was deleted!" });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// Export the router
module.exports = router;