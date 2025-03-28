import { FormInputs } from "@/types/formTypes";
import { Jobdata } from "@/types/jobTypes";
import { ApiResponse } from "@/types/apiTypes";

// Communicates with server directly
async function signup(userInfo : FormInputs) {

    const { email, password } = userInfo;

    // Using try/catch in case the server is not responding
    try {

        const response = await fetch("http://localhost:3001/users/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        });

        const data = await response.json();
        
        // Object including status code from server response
        const responseData = {status: response.status, ...data};

        return responseData;

    } catch (error) {
        console.error(`Error: ${error}`);
        return {status: 500, message: "Server error"};
    }
}

// Communicates with server directly
async function signin(userInfo : FormInputs) : Promise<ApiResponse | undefined> {
    
    const { email, password } = userInfo;

    // Using try/catch in case the server is not responding
    try {
        
        const response = await fetch("http://localhost:3001/users/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        });

        const data = await response.json();

        // Object including status code from server response
        const responseData = {status: response.status, ...data};

        return responseData;
    
    } catch (error) {
        console.error(`Error: ${error}`);
        return {status: 500, message: "Server error"};
    }
}

async function saveJob(job : Jobdata) {

    const token = localStorage.getItem("jobchaserToken")

    try {

        const response = await fetch("http://localhost:3001/jobs", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                jobtechId: job.id.toString(),
                companyName: job.company_name,
                jobHeadline: job.headline,
                companyURL: job.company_url
            })
        })

        const data = await response.json()
        const responseData = {status: response.status, ...data}

        return responseData;

    } catch (error) {
        console.error("Error from saveJob function: ", error);
    }
}

async function getJobs() {
    
    try {

        const response = await fetch("http://localhost:3001/jobs/favourites")
        
        const data = await response.json();
        const responseData = {status: response.status, ...data};

        return responseData;
        
    } catch (error) {
        console.error("Error: ", error);
        return {status: 500, message: "Server error"}
    }
    
}

export { signup, signin, saveJob };