const authService = require('./auth.service')

async function login(req, res) {
    const { username, password } = req.body
    try {
        const user = await authService.login(username, password)
        req.session.user = user
        res.json(user)
    } catch (err) {
        console.log('Failed to Login ' + err)
        res.status(401).send({ err: 'Failed to Login' })
    }
}

async function signup(req, res) {
    try {
        const { username, password, fullname, isAdmin } = req.body
        const account = await authService.signup(username, password, fullname, isAdmin)
        if (!req.session || !req.session.user) { // don't log in if admin created the account
            const user = await authService.login(username, password)
            req.session.user = user
            res.json(user)
        } else {
            res.send({ msg: 'Signed up successfully' })
        }
    } catch (err) {
        console.log('Failed to signup ' + err)
        res.status(500).send({ err: 'Failed to signup' })
    }
}

async function logout(req, res){
    try {
        req.session.user = null;
        res.send({ msg: 'Logged out successfully' })
    } catch (err) {
        res.status(500).send({ err: 'Failed to logout' })
    }
}

module.exports = {
    login,
    signup,
    logout
}