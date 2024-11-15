const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const knex = require('knex');
const bcrypt = require('bcryptjs');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        database: 'citfitdatabase'
    }
})

const app = express ();

let initialPath = path.join(__dirname, "public");

app.use(bodyParser.json());
app.use(express.static(initialPath));

app.get('/index', (req, res) => {
    res.sendFile(path.join(initialPath, "index.html"));
})

app.get('/home', (req, res) => {
    res.sendFile(path.join(initialPath, "pages", "home.html"));
})

app.get('/signup', (req, res) => {
    res.sendFile(path.join(initialPath, "pages", "signup.html"));
})

app.get('/material', (req, res) => {
    res.sendFile(path.join(initialPath, "pages", "material.html"));
})

app.get('/tracker', (req, res) => {
    res.sendFile(path.join(initialPath, "pages", "tracker.html"));
})

app.post('/signup-user', (req, res) => {
    const { username, email, password } = req.body;

    if (!username.length || !password.length) {
        return res.status(400).json('Fill all the fields');
    }

    bcrypt.hash(password, 10)
        .then(hashedPassword => {
            db('users')
                .where({ username })
                .first()
                .then(existingUser => {
                    if (existingUser) {
                        return res.status(400).json('Username already exists');
                    }
                    
                    db('users')
                        .insert({ username, email, password: hashedPassword })
                        .returning(['username'])
                        .then(data => {
                            res.json(data[0]);
                        })
                        .catch(err => {
                            console.error('Error during registration:', err);
                            res.status(500).json('Internal server error');
                        });
                })
                .catch(err => {
                    console.error('Error checking username existence:', err);
                    res.status(500).json('Internal server error');
                });
        })
        .catch(err => {
            console.error('Error hashing password:', err);
            res.status(500).json('Internal server error');
        });
})


app.post('/login-user', (req, res) => {
    const { username, password } = req.body;

    if (!username.length || !password.length) {
        return res.status(400).json('Fill all the fields');
    }

    db.select('username', 'password', 'pushups', 'situps', 'backups', 'squats')
        .from('users')
        .where({ username })
        .first()
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) {
                        return res.status(500).json('Internal server error');
                    }
                    if (isMatch) {
                        const { pushups, situps, backups, squats } = user;
                        res.json({ username: user.username, pushups, situps, backups, squats });
                    } else {    
                        res.status(400).json('Username or Password is Incorrect');
                    }
                });
            } else {
                res.status(400).json('Username or Password is Incorrect');
            }
        })
        .catch(err => {
            console.error('Error during login:', err);
            res.status(500).json('Internal server error');
        });
});

app.post('/submit-results', (req, res) => {
    const { username, pushUps, sitUps, backUps, squats } = req.body;

    if (!username || isNaN(pushUps) || isNaN(sitUps) || isNaN(backUps) || isNaN(squats)) {
        return res.status(400).json('Invalid data');
    }

    // Find user in the database
    db('users')
        .where({ username })
        .first()
        .then(user => {
            if (!user) {
                return res.status(404).json('User not found');
            }

            // Update the user's highest results if the new ones are greater
            const updatedResults = {
                pushups: Math.max(user.pushups, pushUps),
                situps: Math.max(user.situps, sitUps),
                backups: Math.max(user.backups, backUps),
                squats: Math.max(user.squats, squats)
            };

            // Update user in the database
            db('users')
                .where({ username })
                .update(updatedResults)
                .then(() => {
                    res.json({ message: 'Results updated successfully', updatedResults });
                })
                .catch(err => {
                    console.error('Error updating results:', err);
                    res.status(500).json('Internal server error');
                });
        })
        .catch(err => {
            console.error('Error finding user:', err);
            res.status(500).json('Internal server error');
        });
});




app.listen(3000, (req, res) => {
    console.log('listening on port 3000......')
});