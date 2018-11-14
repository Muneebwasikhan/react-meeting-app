const updateUser = (user) => {
    return {
        type: "UPDATE_USER",
        user
    }
}

const removeUser = () => {
    return {
        type: "UPDATE_USER"
    }
}


export default {
    updateUser,
    removeUser
}