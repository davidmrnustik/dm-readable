import React from 'react';
import PropTypes from 'prop-types';

const PostForm = ({ onSubmit, onChange, categories, post, category, modify }) => {
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
      {!modify && (
        <div>
          <div>
            <select
              name='category'
              value={category}
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
        </div>
      )}
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
          {modify ? 'Edit Post' : 'Add Post'}
        </button>
      </div>
    </form>
  )
}

PostForm.postTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  modify: PropTypes.bool,
  category: PropTypes.string,
  categories: PropTypes.array,
  post: PropTypes.object.isRequired
}

export default PostForm;