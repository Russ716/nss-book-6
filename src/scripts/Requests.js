import { getRequests, deleteRequest, getPlumbers, saveCompletion } from "./dataAccess.js"

export const Requests = () => {
    const requests = getRequests()
    const plumbers = getPlumbers()
    //^ this gets a copy of the requests data
    //! function to covert an object to a list item and then map it below
    const convertRequestToListElement = (eachRequestInArray) => {
        //^ this takes each request in that array, and returns it in a list
        return `
    <li>
        <select class="plumbers" id="plumbers">
        //& the button text "Delete"
            <option value="">Choose</option>
            ${plumbers.map(
            plumber => {
                return `<option value="${eachRequestInArray.id}--${plumber.id}">${plumber.name}</option>`
            }
        ).join("")}
        </select>
        ${eachRequestInArray.description}
        <aside>
            <button class="request__delete"
            id="request--${eachRequestInArray.id}">
            Delete
            </button>
            </aside>
            </li>`
        }
        let html = `
        <ul>
        ${requests.map(convertRequestToListElement).join("")}
        </ul>
        `
        
        return html
    }
    //^ grab the descriptions, and print in HTML
    //? add a button next to the description of the job
    //* attach the specific request ID to that button

const mainContainer = document.querySelector("#container")
//? click listener for each DELETE button
//& needs the ID# of the item being deleted
mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [, requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})
mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")
            /*
                ! This object should have 3 properties
                  & 1. requestId
                  ^ 2. plumberId
                  * 3. date_created
            */
            const completion = {
                requestId: parseInt(requestId),
                plumberId: parseInt(plumberId),
                dateOfCreation: Date.now(),
            }
            saveCompletion(completion)
            /*
                ^ Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */

        }
    }
)