import React from 'react'


const HomePage = (props) => {
  const { Posts } = props

  const timelineDisplayHandler = () => {
    return Posts.map((post,key) => {
      return (
        <div key={ key } className="post">
          <q>
            { post.message }
          </q>
          <cite>
            { post.user }
          </cite>
        </div>
      )
    })
  }

  const newPostAreaDisplayHandler = () => {
    return (
      <div id="new_post">
        <form>
          <textarea rows={ 3 } className="new_post_text"></textarea>
          <button>Post</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      { timelineDisplayHandler() }
      { newPostAreaDisplayHandler() }
    </div>
  )
}

export default HomePage
