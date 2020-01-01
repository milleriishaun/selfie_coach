const args = ["start"];
const opts = { stdio: "inherit", cwd: "public", shell: true };
require("child_process").spawn("npm", args, opts);

//"heroku-postbuild": "cd client && npm install && npm install --only=dev --no-shrinkwrap && npm run build"
