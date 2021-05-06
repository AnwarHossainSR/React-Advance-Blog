import axios from 'axios'

export const User = async () => {
    try {
        const response = await axios
          .get("user")
          .catch((error) => console.log(error.resp));
        //console.log(response)
          return response.data;
          
    } catch (error) {
        console.log('something error');
    }
}
