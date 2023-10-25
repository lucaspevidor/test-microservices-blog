import PostCreate from "./components/post-create";
import PostList from "./components/post-list";

const App = () => {
  return (<div className="container">
    <h1>Create post!</h1>
    <PostCreate />
    <hr />
    <h1>Posts</h1>
    <PostList />
  </div>);
}
 
export default App;