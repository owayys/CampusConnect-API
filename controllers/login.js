exports.userLogin = (req, res) => {
    const {username, password} = req.body
    res.send("Logged")
}

exports.userSignup = (req, res) => {
    const {username, password} = req.body
    res.send("Logged")
}