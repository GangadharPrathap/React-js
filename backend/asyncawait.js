/* Async and Await: */
function getUserdetails(id) {
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve({userRoll: "678"});
            console.log("getting user details from database",id);
        }, 2000);
    })
}
const myfun = async() =>{
    console.log("before");
    const result = await getUserdetails("123");
    console.log(result);
    console.log("after");
}
myfun();