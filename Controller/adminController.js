const passport = require('passport');
const admin = require('../Model/admin')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const Admins = require('../Model/admin');
class adminController {

    // form(req, res, next) {
    //     res.json({
    //         "hi": "vu"
    //     })
    // }
    // signup(req, res, next) {
    //     const { username, password } = req.body;
    //     let errors = []
    //     if (!username || !password) {
    //         errors.push({ msg: 'Please input all fields' })
    //     }
    //     if (password.length < 6) {
    //         errors.push({ msg: 'Password must be at least 6 characters' })
    //     }
    //     if (errors.length > 0) {
    //         res.render('signup', {
    //             errors: errors,
    //             username,
    //             password
    //         });

    //     } else {
    //         Users.findOne({ username: username }).then(account => {
    //             if (account) {
    //                 errors.push({ msg: 'Username is already taken' })
    //                 res.statusCode = 400
    //                 res.render('signup', {
    //                     errors: errors,
    //                     username,
    //                     password
    //                 });
    //             } else {
    //                 const newAccount = new Users({
    //                     username,
    //                     password
    //                 })
    //                 bcrypt.hash(newAccount.password, 4, function (err, hash) {
    //                     if (err) {
    //                         throw err
    //                     }
    //                     newAccount.password = hash
    //                     newAccount.save()
    //                         .then((account) => {
    //                             res.redirect('/users/login')
    //                         })
    //                 });
    //             }

    //         })

    //     }
    // }

    // login(req, res, next) {

    //     res.render('login')
    // }
    signin(req, res, next) {
        console.log(req.params)
        Admins.findOne({ username: req.params.username }).then(user => {
            if (!user) {
                return res.status(401).send({
                    success: false,
                    message: "could not find user"
                })
            }

            if (!bcrypt.compareSync(req.params.password, user.password)) {
                return res.status(401).send({
                    success: false,
                    message: "Incorrect password"
                })
            }

            const payload = {
                username: user.username,
                id: user._id,
                isAdmin: user.isAdmin

            }

            const token = jwt.sign(payload, "Random string", { expiresIn: "1d" })

            return res.status(200).send({
                success: true,
                message: "Logged in successfull ",
                token: "Bearer " + token,
                data: {
                    role: user.isAdmin,
                    id: user._id,
                    username: user.username,
                    
                }
                
            })
        })
    }

    signout(req, res) {
        req.logout(function (err) {
            if (err) throw err
            req.flash('success_msg', 'log out success')
            res.redirect('/users/login')
        })
    }
    editInfo(req, res, next) {
        Users.updateOne({ _id: req.params.userId }, req.body)
            .then(() => {
                const newPassword = req.body.passChange;
                bcrypt.hash(newPassword, 4, function (err, hash) {
                    if (err) {
                        throw err;
                    }
                    Users.updateOne({ _id: req.params.userId }, { password: hash })
                        .then(() => {
                            res.json({ msg: 'success' });
                        })
                        .catch((error) => {
                            res.json({ msg: 'fail' });
                        });
                });
            })
            .catch((error) => {
                res.redirect("/error");
            });
    }
    dashboard(req, res, next) {
        if (req.user.isAdmin == true) {
            Orchids.find({}).populate("category", "categoryName")
                .then((orchids) => {
                    Categories.find({}).then((categories) => {
                        res.render("admin", {
                            user: req.user,
                            orchidData: orchids,
                            categoryData: categories
                        })
                    })
                }).catch(next)
        } else if (req.user.isAdmin == false) {
            Orchids.find({}).populate("category", "categoryName")
                .then((orchids) => {
                    res.render('user', {
                        title: "List of orchids",
                        user: req.user,
                        orchidData: orchids,
                    })
                }).catch(next)
        }

    }

    // signout(req, res) {
    //     req.logout(function (err) {
    //         if (err) throw err
    //         req.flash('success_msg', 'log out success')
    //         res.redirect('/accounts/login')
    //     })
    // }
}
module.exports = new adminController()