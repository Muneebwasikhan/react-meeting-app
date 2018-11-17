const reducers = (state = {},action) => {
    switch(action.type){
        case "UPDATE_USER": {
            return {...state,user: action.user}
        }
        case "USER_ID": {
            return {...state,id: action.id}
        }
        case "USER_NAME": {
            return {...state,name: action.name}
        }
        case "USER-DATA": {
            return {...state,data: action.data}
        }
        case "REMOVE_USER": {
            return {...state,user: action.user}
        }
        case "EVENT_DATA": {
            return {...state,data: action.data}
        }
        default: {
            return state;
        }
        
    }
}

export default reducers;