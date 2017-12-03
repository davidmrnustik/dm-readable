import React, { Component } from 'react';
import PropTypes from 'prop-types';

const styles = {
  modalClose: {
    position: 'absolute',
    top: 20,
    right: 20
  }
}

const PostForm = ({ onSubmit, onChange, categories, post }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <input
          type='text'
          name='title'
          value={post.title}
          onChange={onChange}
          placeholder='Post Title'/>
      </div>
      <div>
        <select
          name='category'
          onChange={onChange}
        >
          <option value=''>Select category</option>
          {categories.map(category => (
            <option
              value={category.path}
              key={category.path}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <input
          type='text'
          name='author'
          value={post.author}
          onChange={onChange}
          placeholder='Post Author'/>
      </div>
      <div>
        <textarea
          name='body'
          value={post.body}
          onChange={onChange}
          placeholder='Post text'>
        </textarea>
      </div>
      <div>
        <button
          type='submit'
        >
          Add Post
        </button>
      </div>
    </form>
  )
}

PostForm.postTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  post: PropTypes.object.isRequired
}

export default PostForm;