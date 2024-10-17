function homeinfo(email,gender,age,height,weight,location,contraindication,healthconcern) {
  let num = Math.floor(Math.random() * 4);
  let port = num.toString();
    return new Promise((resolve, reject) =>
    {
      const options = {
          method: 'POST',
          credentials: 'include',
          mode: 'cors',
          headers: {
              'content-type': 'application/json',
          },
          body: JSON.stringify({"email":email,"gender":gender,"age":age,"height":height,"weight":weight,"location":location,"contraindication":contraindication,"healthconcern":healthconcern})
      };
  
      const url = 'https://www.foodcrs.com/home';
  
      fetch(url, options)
        .then(response => response.json())
          .then(response => resolve(response.status))
          .catch(err => reject(err));
  
    })}
  
  
  export default homeinfo;