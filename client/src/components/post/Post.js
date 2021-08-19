import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import CommentForm from "../../components/post/CommentForm";
import CommentItem from "../../components/post/CommentItem";
import { getPost } from "../../actions/post";

const Post = ({ match }) => {
  const dispatch = useDispatch();
  const { post, loading } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPost(match.params.id));
  }, [dispatch, match]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container">
        <Link to="/posts" className="btn">
          Back to Posts
        </Link>
        <PostItem post={post} showActions={false} />
        <CommentForm postId={post._id} />
        <div className="comments">
          {post.comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              postId={post._id}
            />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
};

export default Post;
