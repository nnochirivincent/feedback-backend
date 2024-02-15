const bcrypt = require('bcryptjs')

async function auth () {
    const salt = await bcrypt.genSalt(10)
}