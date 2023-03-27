const { userLogin, userSignup } = require('../controllers/login')

const router = require('express').Router()

router.post('/login', userLogin)
router.post('/signup', userSignup)

// router.post('/signup', (req, res) => {
//     const full_name = req.body?.name
//     const role = String(req.body?.role);
//     const email = req.body?.email
//     const phone = req.body?.phone
//     const address = req.body?.address
//     const password = req.body?.password
//     const temp_string = role.charAt(0).toLowerCase() + "_";

//     if (full_name === undefined || email == undefined || phone == undefined || address == undefined || password == undefined || full_name === '' || email == '' || phone == '' || address == '' || password == '') {
//         res.render("signup.ejs", {invalid: 1})
//     }
//     else {
//         bcrypt.hash(password, 10, (err, hashed_password) => {
//             req.session.role = role
//             if (err) throw err;
//             con.query(`INSERT INTO ${role} (${temp_string}name,${temp_string}phone,${temp_string}email,${temp_string}addr,${temp_string}pass) VALUES ('${full_name}','${phone}', '${email}', '${address}', '${hashed_password}')`, (err, result) => {
//                 if (err) console.log(err);
//                 res.redirect("/login");
//             });
//         })
//     }
// })

// router.post('/login', (req, res) => {
//     const email = req.body?.email;
//     const password = req.body?.password;
//     const role = req.body?.role;
//     const temp_string = role.charAt(0).toLowerCase() + "_";

//     if (email == undefined || password == undefined || email == '' || password == '' ) {
//         res.render("login.ejs", {invalid: 1})
//     }
//     else {
//         req.session.role = role
//         con.query(`SELECT ${temp_string}id,${temp_string}name,${temp_string}pass FROM ${role} WHERE ${temp_string}email='${email}'`, (err, results) => {
//             if (err) throw err;
//             else {
//                 console.log(results)
//                 if (results.length === 0) {
//                     res.render("login.ejs", {invalid: 1})
//                 }
//                 else if (!results[0]) {
//                     res.render("login.ejs", {invalid: 1})
//                 }
//                 else {
//                     const hashed_password = eval(`results[0].${temp_string}pass`);
//                     bcrypt.compare(password, hashed_password, (err, comp_result) => {
//                         if (comp_result) {
//                             req.session.user_id = eval(`results[0].${temp_string}id`)
//                             req.session.user_name = eval(`results[0].${temp_string}name`)
//                             res.redirect("/home");
//                         }
//                         else res.render("login.ejs", {invalid: 1})
//                     })
//                 }
//             }
//         });
//     }
// })

module.exports = router