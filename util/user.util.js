function getUserId(res) {
    const userId = res.locals.user.userId;
    return userId;
}

function getUserName() {
    const userId = res.locals.user.userId;

}

module.exports = {getUserId,getUserName};