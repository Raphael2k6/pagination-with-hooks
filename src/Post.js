import React, { useState, useEffect, Fragment } from "react";
import "./Post.css";
import GetPostView from "./GetPostView";
import Paginate from "./Paginate";

const Post = () => {
  //Declare the Post state ...This receive the Api
  const [posts, setPosts] = useState(null);
  const [badgePosts, setBadgePosts] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [offSet, setOffset] = useState(0); //Next Start for badgePost
  const [limit, setLimit] = useState(10); //Constant limit Post fetch
  const [isLoading] = useState(
    <Fragment>
      <p style={{ color: "green", fontWeight: "bold", marginTop: "100px" }}>
        Loading Post...Please Wait
      </p>
    </Fragment>
  );

  //trick if the page number is clicked (a multilication and division will have to occured with offset to get the next phase offset)
  //This triggers the Api when there is a render
  //Just like the ComponentDidMount in Class
  useEffect(() => {
    if(!posts) {
      triggerPostApi();
    }
  }, [posts]);

  const loadBadgePosts = async (posts, offSet = null, limit = null) => {
      const currentpostView = posts.slice(offSet, limit);
      setBadgePosts(currentpostView);
  };

  const handlePrevFunc = async (action) => {
    if(action) { 
      handleSwitchPage(
        pageNumber !== 1 ? pageNumber - 1 : pageNumber,
        offSet !== 0 ? offSet - 10 : offSet,
       limit !== 10 ? limit - 10 : limit
      )
    }
  }

  const handleNextFunc = async (action) => {
    if(action) { 
      handleSwitchPage(
        pageNumber + 1,
        offSet + 10,
        limit + 10
      )
    }
  }

  const handleSwitchPage = async (newPageNumber, newPageOffset , newPostLimit) => {
    console.log(Number(newPageNumber), Number(newPageOffset), Number(newPostLimit))
   if(pageNumber === newPageNumber) {
     return false
   }
   if(newPostLimit <= posts.length) {
    setPageNumber(newPageNumber)
    setOffset(newPageOffset)
    setLimit(newPostLimit)
    loadBadgePosts(posts, newPageOffset, newPostLimit)
   }
  }

  //Call the Api from the APi
  const triggerPostApi = async () => {
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);

      const result = await res.json();

      setPosts(result)
      if(result) {
        loadBadgePosts(result, offSet, limit );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {badgePosts ? <GetPostView onPostView={badgePosts} /> : isLoading}
      <br></br>
      {badgePosts ? <Paginate 
                      onNextFunc={handleNextFunc} 
                      onPrevFunc={handlePrevFunc} 
                      onCurrentPage={pageNumber}
                      onOffSet={offSet}
                      onLimit={limit}
                      onSwitchPage={handleSwitchPage}        
                /> : null}
    </div>
  );
};

export default Post;
