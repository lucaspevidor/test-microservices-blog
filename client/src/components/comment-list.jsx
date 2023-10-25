const CommentList = ({comments}) => {
  const renderedComments = comments.map(c => (
    <li key={c.id}>
      {
        c.status === "pending" && "This comment is awaiting moderation"
      }
      {
        c.status === "rejected" && "This comment was rejected"
      }
      {
        c.status === "approved" && c.content
      }      
    </li>
  ))

  return ( 
    <div>
      <ul>{renderedComments}</ul>
    </div> 
  );
}

export default CommentList;