const updateUser = (user) => {
    return {
        type: "UPDATE_USER",
        user
    }
}
const setMeetingAppUserId = (id) => {
    return {
        type: "USER_ID",
        id
    }
}
const setMeetingAppUserName = (name) => {
    return {
        type: "USER_NAME",
        name
    }
}
const setMeetingAppUserData = (data) => {
    return {
        type: "USER_DATA",
        data
    }
}

const removeUser = () => {
    return {
        type: "UPDATE_USER"
    }
}


export {
    updateUser,removeUser,setMeetingAppUserId,setMeetingAppUserName,setMeetingAppUserData
}