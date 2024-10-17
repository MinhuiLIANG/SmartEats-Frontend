function Centertest(id, user, control, cfood) {
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
          body: JSON.stringify({"uid":id,"user":user,"control":control,"choosefood":cfood})
      };
  
      const url = 'https://www.foodcrs.com/back';
  
      fetch(url, options)
        .then(response => response.json())
          .then(response => resolve(response.chatbot))
          .catch(err => reject(err));
  
    })}
  
  
  export default Centertest;