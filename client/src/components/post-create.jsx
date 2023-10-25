import { useState } from "react";
import axios from "axios"

const PostCreate = () => {
  const [title, setTitle] = useState("");

  function onSubmit(e) {
    e.preventDefault();

    axios.post("http://posts.com/posts/create", {
      title
    })
      .catch((error) => console.error(error))
      .finally(() => setTitle(""));
  }

  return ( 
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="formInput">Title</label>
          <input id="formInput" type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)}/>
        </div>
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
   );
}
 
export default PostCreate;