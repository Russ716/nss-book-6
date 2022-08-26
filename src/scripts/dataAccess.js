{babel: true}
const applicationState = {
    requests: [],
    plumbers: []
}
//! requests array must remain empty. 
//* This stores external data in this app.

const API = "http://localhost:8088"
//^ declares the external data location 

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        //^ fetches the data when function is run
        .then(response => response.json())
        //^ parses the returned data from json to js
        .then(
            (serviceRequests) => {
                //* then Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}
export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.plumbers = data
            }
        )
}
const mainContainer = document.querySelector("#container")
export const getRequests = () => {
    return applicationState.requests.map(request => ({ ...request }))
    //^ returns a copy of the requests state
}
export const getPlumbers = () => {
    return applicationState.plumbers.map(plumber => ({ ...plumber }))
    //^ returns a copy of the plumbers state
}
export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        //^ POST asks the API to create something new
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}
export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        //^ DELETE asks the API to delete one
        //! You can't delete an entire collection with a single HTTP request.
        //& the function that initiates the DELETE must have the primary key sent to it as an argument.
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}
export const saveCompletion = (completedThing) => {
    //^ This will perform the POST request to save the completion object to the API
    const jobDone = {
        method: "POST",
        //^ POST asks the API to create something new
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completedThing)
    }

    return fetch(`${API}/completions`, jobDone)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const fetchCompletions = () => {
    //^ This will retrieve all completion objects from the API
    return fetch(`${API}/completions`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.completions = data
            }
        )
}

