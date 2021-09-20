const express = require("express");
const app = express();

let a = 1;
// An example middleware function
let a_middleware_function = function (req, res, next) {
  // ... perform some operations
  console.log("called");
  a += 1;
  next(); // Call next() so Express will call the next middleware function in the chain.
};

// Function added with use() for a specific route
app.use("/someroute", a_middleware_function);

app.get("/", function (req, res) {
  console.log(2);
});
app.get("/someroute", function (req, res) {
  res.send("some route called");
  console.log("some route called");
  const a = new Promise((res, rej) => {
    res("hi");
  }).then((res) => {
    throw new Error("rror"); // built-in 된 error handling 이 있어서 맨 마지막에 실행됨 -> stack trace
  });
});
app.use(express.static("assets"));
app.listen(3000);
