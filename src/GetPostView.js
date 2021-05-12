import React from "react";
import "./GetPostView.css";

const GetPostView = (props) => {

  return (
    <div>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Body</th>
          </tr>
        </thead>
        <tbody>
          {props.onPostView.map((post) => (
            <tr key={post.id}>
              <th scope="row">{post.id}</th>
              <td>{post.title}</td>
              <td>{post.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetPostView;
