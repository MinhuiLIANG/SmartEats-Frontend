function getSenti(id) {
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
          body: JSON.stringify({"uid":id})
      };
  
      const url = 'https://www.foodcrs.com/senti';
  
      fetch(url, options)
        .then(response => response.json())
          .then(response => resolve(response.sentiment))
          .catch(err => reject(err));
  
    })}
  
  
  export default getSenti;