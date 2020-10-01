module.exports = app => {

const jsonfile = require("jsonfile");

app.get("/users", (req, res) => {
  console.log("fetching all users");

  // jsonfile reading
  jsonfile.readFile("./DB/users.json", function(err, content) {
    // send file contents back to sender
    res.send(content);
  });
});
app.post("/users/new", (req, res) => {

  let email= req.body.email
  let username = req.body.username
  // let { email, username } = req.body;
  jsonfile.readFile("./DB/users.json", function(err, content) {

    content.push({ email: email, username: username });

    console.log("added " + email + "to DB");

    jsonfile.writeFile("./DB/users.json", content, function(err) {
      console.log(err);
    });

    res.sendStatus(200);
  });
});
app.delete("/users/destroy", (req, res) => {

  let email = req.body.email;

  jsonfile.readFile("./DB/users.json", function(err, content) {

    for (var i = content.length - 1; i >= 0; i--) {

      if (content[i].email === email) {
        console.log("removing " + content[i].email + "from DB");
        delete content[i];
        content = content.filter(Boolean);
        // content.pop(i);
      }

    }
    jsonfile.writeFile("./DB/users.json", content, function(err) {
      console.log(err);
    });
    res.sendStatus(200);
  });
});
app.put("/users", (req, res) => {
  let user;
  let username = req.body.username;
  let email    = req.query.email;

  jsonfile.readFile("./DB/users.json", function(err, content) {
    for (var i = content.length - 1; i >= 0; i--) {
      if (content[i].email === req.query.email) {

        console.log("updated user " + req.query.email + " has now username : " + username);

        user = content[i];
        user.username = username;

      }
    }

    jsonfile.writeFile("./DB/users.json", content, function(err) {
      console.log(err);
    });

  });
  res.send(user);
});
app.get("/users/specific", (req, res) => {
  let user;
  let email = req.query.email;

  jsonfile.readFile("./DB/users.json", function(err, content) {
    for (var i = content.length - 1; i >= 0; i--) {
      if (content[i].email === email) {
        console.log("found user " + content[i].username);
        console.log(content[i].username);
        user = content[i].username;
      }
    }

    res.send(user);
  });
});
}