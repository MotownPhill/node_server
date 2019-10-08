// users hardcoded for simplicity, store in a db for production applications
const users = [{ id: 1, username: 'abc', password: 'pass', firstName: 'abc', lastName: 'pass' }];

module.exports = {
    authenticate,
    getAll
};

async function authenticate({ username, password }) {

    console.log("username---", username);
    console.log("password----", password);
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const { password, ...userWithoutPassword } = user;
        console.log("user111111",userWithoutPassword);
        return userWithoutPassword;
    }
}

async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}
