function userDetails(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("getting user details from database", id);
            resolve({ userroll: "123" });
        }, 1000);
    })
}
function userSubject(userroll) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("getting user subject from database", userroll);
            resolve({ subject: "Maths" });
        }, 1000);
    })
}
function userMarks(subject) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("getting user marks from database", subject);
            resolve({ marks: "95%" });
        }, 1000);
    })
}

const fetchmydata = async () => {
    const result = await userDetails("456");
    console.log(result);
    const result1 = await userSubject(result.userroll);
    console.log(result1);
    const result2 = await userMarks(result1.subject);
    console.log(result2);
}
fetchmydata();