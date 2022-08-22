import { getRequests } from "./dataAccess.js"


export const Requests = () => {
    const requests = getRequests()
    //! function to covert an object to a list item and then map it below
    const convertRequestToListElement = (eachRequestInArray) => {
        let html = `<li>c/s says: ${eachRequestInArray.description}</li>`
        return html
    }
    let html = `
        <ul><li><div>Requests:</div></li>
        ${requests.map(convertRequestToListElement).join("")}
        </ul>
    `

    return html
}


/*
*In the following code, you will need to define the function that will be passed to the map() method.

&The function you write will convert each service request object into HTML representations. 
&Since it is wrapped with a <ul> element, make each one an <li> element showing only the description of the request to start.

The function should define 1 parameter (value will be each object in the array)
The description of the service request should be interpolated inside the <li> HTML representation.
The function should return the HTML representation.
For example, if you write a function named convertRequestToListElement, then you would update the code below to the following...

requests.map(convertRequestToListElement).join("")
*/