function getToday() {
    const today = new Date();
    return today.toLocaleDateString()
}

module.exports = getToday