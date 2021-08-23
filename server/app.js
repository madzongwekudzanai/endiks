const express = require("express");
const next = require("next");
const connectDB = require("../config/db");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;
// const ROOT_URL = dev ? `http://localhost:${port}` : process.env.PRODUCTION_URL;
const app = next({ dev });
const handle = app.getRequestHandler();

// Connect Database
connectDB();

app.prepare().then(() => {
  const server = express();

  // Init Middleware
  server.use(express.json({ limit: "50mb", extended: false }));

  /* give all Next.js's requests to Next.js server */
  server.get("/_next/*", (req, res) => {
    handle(req, res);
  });

  // Define Routes
  server.use("/api/sellers", require("./routes/api/sellers"));
  server.use("/api/admins", require("./routes/api/admins"));
  server.use("/api/users", require("./routes/api/users"));
  server.use("/api/freights", require("./routes/api/freights"));
  server.use("/api/profile", require("./routes/api/profile"));
  server.use("/api/cargo-profile", require("./routes/api/cargo-profile"));
  server.use("/api/auth-user", require("./routes/api/auth-user"));
  server.use("/api/auth-seller", require("./routes/api/auth-seller"));
  server.use("/api/auth-admin", require("./routes/api/auth-admin"));
  server.use("/api/auth-freight", require("./routes/api/auth-freight"));
  server.use("/api/products", require("./routes/api/products"));
  server.use("/api/keywords", require("./routes/api/keywords"));
  server.use("/api/cart", require("./routes/api/cart"));
  server.use("/api/wishlist", require("./routes/api/wishlist"));
  server.use("/api/category", require("./routes/api/category"));
  server.use("/api/invites", require("./routes/api/invites"));
  server.use("/api/deposits", require("./routes/api/deposits"));
  server.use("/api/shipping-agents", require("./routes/api/shipping-agents"));
  server.use("/api/orders", require("./routes/api/orders"));
  server.use("/api/conditions", require("./routes/api/conditions"));
  server.use("/api/destinations", require("./routes/api/destinations"));
  server.use("/api/contact", require("./routes/api/contact"));

  /* default route
     - allows Next to handle all other routes
     - includes the numerous `/_next/...` routes which must be exposed for the next app to work correctly
     - includes 404'ing on unknown routes */
  server.get("*", (req, res) => {
    handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server listening on ${port}`);
  });
});
