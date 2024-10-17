function Proid(id, proid, surveytime) {
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
          body: JSON.stringify({"uid":id, "proid":proid, "surveytime":surveytime})
      };
  
      const url = 'https://www.foodcrs.com/proid';
  
      fetch(url, options)
        .then(response => response.json())
          .then(response => resolve(response.status))
          .catch(err => reject(err));
  
    })}
  
  
  export default Proid;