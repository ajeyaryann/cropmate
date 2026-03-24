import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/FarmingCommunity.css";

function FarmingMethods() {

  const navigate = useNavigate();

  // Create Post State
  const [postText, setPostText] = useState("");
  const [image, setImage] = useState(null);

  // Default Sample Posts (so page looks loaded)
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "🌿 Organic Farming Techniques",
      description:
        "Organic farming improves soil fertility and produces chemical-free crops. Using compost and bio-fertilizers improves long-term productivity.",
      image:
        "https://images.unsplash.com/photo-1500937386664-56d1dfef3854",
      likes: 5,
      comments: ["Very useful method!", "Thanks for sharing."]
    },
    {
      id: 2,
      title: "💰 High Profit Crop Ideas",
      description:
        "Mushroom, strawberry, and garlic farming provide higher profits compared to traditional crops.",
      image:
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399",
      likes: 8,
      comments: ["Great insight!", "Will try this next season."]
    }
  ]);

  const [likedPosts, setLikedPosts] = useState({});
  const [savedPosts, setSavedPosts] = useState({});

  // Upload Image
  const handleImageUpload = (e) => {

    const file = e.target.files[0];

    if (file) {
      setImage(URL.createObjectURL(file));
    }

  };

  // Create Post
  const createPost = () => {

    if (!postText) return;

    const newPost = {

      id: Date.now(),

      title: "📝 Farmer Post",

      description: postText,

      image: image,

      likes: 0,

      comments: []

    };

    setPosts([newPost, ...posts]);

    setPostText("");
    setImage(null);

  };

  // Like
  const toggleLike = (id) => {

    const updatedPosts = posts.map((post) => {

      if (post.id === id) {

        if (likedPosts[id]) {
          post.likes -= 1;
        } else {
          post.likes += 1;
        }

      }

      return post;

    });

    setLikedPosts({
      ...likedPosts,
      [id]: !likedPosts[id]
    });

    setPosts(updatedPosts);

  };

  // Save
  const toggleSave = (id) => {

    setSavedPosts({
      ...savedPosts,
      [id]: !savedPosts[id]
    });

  };

  // Comment
  const addComment = (id, text) => {

    if (!text) return;

    const updatedPosts = posts.map((post) => {

      if (post.id === id) {

        post.comments.push(text);

      }

      return post;

    });

    setPosts(updatedPosts);

  };

  return (

    <div className="community-page">

      {/* Back Button */}
      <button
        className="back-btn"
        onClick={() => navigate("/")}
      >
        ← Back to Dashboard
      </button>

      <div className="feed-container">

        {/* Title */}
        <h1 className="feed-title">
          🌱 Farming Community
        </h1>

        {/* PROFILE SECTION */}

        <div className="profile-card">

          <div className="profile-name">
            👨‍🌾 Farmer User
          </div>

          <div className="profile-role">
            Sharing agricultural knowledge
          </div>

        </div>

        {/* CREATE POST */}

        <div className="create-post">

          <textarea
            className="post-textarea"
            placeholder="Share your farming knowledge..."
            value={postText}
            onChange={(e) =>
              setPostText(e.target.value)
            }
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ marginTop: "10px" }}
          />

          {image && (

            <img
              src={image}
              alt="preview"
              className="preview-image"
            />

          )}

          <button
            className="post-btn"
            onClick={createPost}
          >
            Post
          </button>

        </div>

        {/* CATEGORY TABS */}

        <div className="category-tabs">

          {[
            "All",
            "Organic",
            "Profit Crops",
            "Water Management",
            "Technology"
          ].map((cat, index) => (

            <button
              key={index}
              className="category-btn"
            >
              {cat}
            </button>

          ))}

        </div>

        {/* POSTS */}

        {posts.map((post) => (

          <div
            key={post.id}
            className="post-card"
          >

            {post.image && (

              <img
                src={post.image}
                alt="post"
                className="post-image"
              />

            )}

            <div className="post-content">

              <h2 className="post-title">
                {post.title}
              </h2>

              <p className="post-description">
                {post.description}
              </p>

              {/* ACTIONS */}

              <div className="post-actions">

                <button
                  className={`action-btn ${
                    likedPosts[post.id]
                      ? "liked"
                      : ""
                  }`}
                  onClick={() =>
                    toggleLike(post.id)
                  }
                >
                  👍 {post.likes}
                </button>

                <button
                  className={`action-btn ${
                    savedPosts[post.id]
                      ? "saved"
                      : ""
                  }`}
                  onClick={() =>
                    toggleSave(post.id)
                  }
                >
                  ⭐ Save
                </button>

                <button
                  className="action-btn"
                >
                  🔗 Share
                </button>

              </div>

              {/* COMMENTS */}

              <input
                className="comment-input"
                placeholder="Write a comment..."
                onKeyDown={(e) => {

                  if (e.key === "Enter") {

                    addComment(
                      post.id,
                      e.target.value
                    );

                    e.target.value = "";

                  }

                }}
              />

              {post.comments.map(
                (comment, index) => (

                  <p
                    key={index}
                    className="comment-text"
                  >
                    💬 {comment}
                  </p>

                )
              )}

            </div>

          </div>

        ))}

        {/* TRENDING */}

        <div className="trending-box">

          <div className="trending-title">
            🔥 Trending Topics
          </div>

          <ul style={{ color: "#94a3b8" }}>

            <li>🌿 Organic Farming Guide</li>

            <li>💰 Top High Profit Crops</li>

            <li>💧 Water Saving Techniques</li>

            <li>🤖 Smart Farming Tools</li>

          </ul>

        </div>

      </div>

    </div>

  );

}

export default FarmingMethods;