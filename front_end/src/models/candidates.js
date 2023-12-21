import { BASE_EVOTE_URL } from "../helper/constants";

export const getCandidates = async () => {
    const response = await fetch(BASE_EVOTE_URL + "candidate/list/");

    let jsonRes;

    console.log(response.status)
    if (response.status === 200) {
        jsonRes = await response.json();
        return jsonRes
    } else {
        return []
    }
}

export const addCandidates = async (inputs) => {
    const { full_name, party_name, qualification, age } = inputs;

    const response = await fetch(BASE_EVOTE_URL + "candidate/add/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ full_name, party_name, qualification, age })
    });

    console.log(response.status)
    if (response.status === 201) {
        return 1
    } else {
        return 0
    }
}