

export const getUserData = (req, res) => {
    try {
        res.status(200).json("This is User router")
    } catch (error) {
        res.status(500).send(`<h1>Something went wrong</h1>`)
    }
}