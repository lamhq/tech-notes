### Hash password & set password
```
var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	createdAt: { type: Date, default: Date.now }
});

userSchema.methods.setPassword = function(value) {
	var hash = bcrypt.hashSync(value);
	this.password = hash;
};

userSchema.methods.checkPassword = function(value) {
	return bcrypt.compareSync(value, this.password);
};

var User = mongoose.model('user', userSchema);

module.exports = User;
```

### Generate Unique ID before save

```
userSchema.pre('save', async function preValidate() {
  try {
    if (this.uId) {
      return;
    }

    this.uId = await generateUserId(this);
  } catch (err) {
    throw err;
  }
});
```