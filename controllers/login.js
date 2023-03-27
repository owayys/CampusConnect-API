exports.userLogin = (req, res) => {
    const {username, password} = req.body
    res.send("Logged login")
}

exports.userSignup = (req, res) => {
    const {username, email, password} = req.body
    res.send("Logged signup")
}