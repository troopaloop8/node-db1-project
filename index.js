const server = require("./api/server.js");
const accountsRouter = require('./accountsRouter')

const PORT = process.env.PORT || 5001;

server.use('/accounts', accountsRouter);

server.listen(PORT, () => {
  console.log(`\n== API running on port ${PORT} ==\n`);
});
