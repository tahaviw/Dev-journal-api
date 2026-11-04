function Date() {
    const today = new Date();
    return today.toLocaleDateString()
}

module.exports = Date