const getMatchedUserInfo = (users, userLoggedIn) => {
 const newUser = { ...users };
 delete newUser[userLoggedIn];

//  destructuring the data from object format to array
 const [id , user] = Object.entries(newUser).flat();

 return {id , ...user};
}

export default getMatchedUserInfo