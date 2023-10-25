import { useState } from "react";
import axios from "axios";

const CommentCreate = ({postId}) => {
  const [comment, setComment] = useState("");

  function onSubmit(e) {
    e.preventDefault();

    axios.post(`http://posts.com/posts/${postId}/comments`, {
      content: comment
    })
    .catch(error => console.error(error))
    .finally(() => setComment(""))
  }
  
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group" style={{marginBottom: "10px"}}>
          <label htmlFor="commentInput">New comment</label>
          <input type="text" id="commentInput" className="form-control" value={comment} onChange={e => setComment(e.target.value)}/>
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
 
export default CommentCreate;