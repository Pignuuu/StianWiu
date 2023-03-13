// Set up express server
const app = require('./app')
var expressWs = require('express-ws')(app);
const port = process.env.PORT || '8132'

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

