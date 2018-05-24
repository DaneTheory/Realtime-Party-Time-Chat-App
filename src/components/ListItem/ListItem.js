import React, { Component } from 'react'
import moment from 'moment-es6'

import VerifiedUserIcon from '../Icons/VerifiedUserIcon'
import LinkIcon from '../Icons/LinkIcon'


export default class ListItem extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    // const { FetchPreview } = this.props
    // FetchPreview('https://imgur.com/lHbnGQ2')
  }

  render() {
  const { Posts, Users, FetchPreview } = this.props
  const mapUserData = (userData) => Object.keys(Users).map(user => Users[user]).filter((user,index) => userData == Object.keys(Users)[index])
  const verificationContent = (bool,userData,key) => <div key={ key } className="avatar__wrapper">{ bool ? <span><VerifiedUserIcon /></span> : null }<span><h5>{ userData }</h5></span></div>
  const urlPreviewContent = (link) => link ? link : null
  const userPostMethods = (userData) => {
    return {
      uName: mapUserData(userData).map(user => user.username).toString(),
      avatar: mapUserData(userData).map(user => `../../public/images/users/${user.username}/${user.username}.jpg`).toString(),
      vContent: mapUserData(userData).map((user,i) => user.verified ? verificationContent(true,user.real_name,i) : verificationContent(false,user.real_name,i)),
      tStamp: moment.unix(userData).fromNow().toString(),
      msg: userData,
      url: mapUserData(userData).map(user => urlPreviewContent(user.url)).toString(),
      imagePreviewSrc: userData
    }
  }

  const userReplyContentDisplayHandler = (filteredPostData,postID,postData) => {

      const replyMethods = (postData) => {
        return {
          postID: postData.id,
          user: postData.user,
          replyID: postData.reply_to,
          msg: postData.message,
          tStamp: postData.ts
        }
      }

      return filteredPostData === postID ? replyMethods(postData) : null

  }

  const userReplyDisplayHandler = (userData) => Posts
                                                  .map(post => post.reply_to)
                                                  .filter((post,i,arr) => userReplyContentDisplayHandler(post,userData,Posts[i]))





                                                  const replyDataMap = (existingPostNode) => {
                                                    return Object.keys(Posts).map(post => Posts[post])
                                                                .filter(post => post.reply_to === existingPostNode)
                                                                .map(post => {
                                                                  return {
                                                                    postID: post.id,
                                                                    replyID: post.reply_to,
                                                                    userID: post.user,
                                                                    uName: userPostMethods(post.user).uName,
                                                                    avatar: userPostMethods(post.user).avatar,
                                                                    vContent: userPostMethods(post.user).vContent,
                                                                    tStamp: userPostMethods(post.ts).tStamp,
                                                                    msg: post.message,
                                                                    imagePreviewSrc: post.imagePreviewSrc
                                                                  }
                                                                })
                                                  }


  const replyContentNodeHandler = (userData) => {
    return replyDataMap(userData).map((reply,key) => {
      return (
        <div id={ reply.postID } key={ key } className="timeline__reply__item">
          <div className="item__left">
            <img className="user__avatar" src={ reply.avatar } />
          </div>
          <div className="item__right">
            <div className="user__info">
              { reply.vContent }
              <div className="user__info__spacer"> - </div>
                <div className="user__displayName">
                  <h5>@{ reply.uName }</h5>
                </div>
              <div className="post__date">
                <h6>{ reply.tStamp }</h6>
              </div>
            </div>
            <div className="post__message">
              <p>{ reply.msg }</p>
            </div>
          </div>
        </div>
      )
    })
  }


  // const userReplyDisplayMethods = (postID) => {
  //     return {
  //       fullNode: createPostObjectRepliesArray(postID).map(node => node),
  //       replyId: createPostObjectRepliesArray(postID).map(node => node.reply_to),
  //       avatar: createPostObjectRepliesArray(postID).map(node => userPostDisplayMethods(node.user).avatar),
  //       vStatus: createPostObjectRepliesArray(postID).map(node => userPostDisplayMethods(node.user).vStatus),
  //       username: createPostObjectRepliesArray(postID).map(node => userPostDisplayMethods(node.user).username),
  //       timestamp: createPostObjectRepliesArray(postID).map(node => userPostDisplayMethods(node.user).timestamp),
  //       message: createPostObjectRepliesArray(postID).map(node => userPostDisplayMethods(node.user).message)
  //     }
  // }

  // const userReplyDisplayHandler = (postID) => {
    // console.log(
    //   Object.keys(userReplyDisplayMethods(postID)).map(reply => userReplyDisplayMethods(postID)[reply])
    //     .filter(reply => {
    //       console.log(reply);
    //       return reply.length !== 0
    //     })
    //     .map(reply => {
    //       return reply
    //     })
    // )



    // console.log(postID)
    // console.log(Number(userReplyDisplayMethods().map(method => method.replyId)));
    // console.log(
    //   userReplyDisplayMethods().map(method => {
    //     return method
    //   })
    //   .filter(reply => {
    //     console.log(reply.replyId === postID);
    //     return reply.replyId === postID ?
    //     <div>hello</div>
    //     :
    //     null
    //   })
    // );

    // console.log(Number(userReplyDisplayMethods().map(method => method.replyId)) === postID ? 'hello' : null);
    // return Number(userReplyDisplayMethods().map(method => method.replyId)) === postID ?
    //     <div className="timeline__list__reply">
    //       <div className="item__left">
    //         <img className="user__avatar" src={ userReplyDisplayMethods().map(method => method.avatar) } />
    //       </div>
    //       <div className="item__right">
    //         <div className="user__info">
    //           { userReplyDisplayMethods().map(method => method.vStatus) }
    //           <div className="user__info__spacer"> - </div>
    //             <div className="user__displayName">
    //               <h5>@{ userReplyDisplayMethods().map(method => method.username) }</h5>
    //             </div>
    //           <div className="post__date">
    //             <h6>{ userReplyDisplayMethods().map(method => method.timestamp) }</h6>
    //           </div>
    //         </div>
    //         <div className="post__message">
    //           <p>{ userReplyDisplayMethods().map(method => method.message) }</p>
    //         </div>
    //       </div>
    //     </div>
    //   : null
    // return userReplyDisplayMethods().map(method => method.replyId).filter(replyID => {
    //   console.log(replyID)
    //   return replyID === postID ? 'hello' : null
    // })
          // .filter(reply => {
          //   console.log(reply.replyId === postID);
          //   return reply.replyId === postID ?
          //     <div>hello</div>
          //     :
          //     null
          // })

    // return demo.filter(replyID => {
    //         // console.log(replyID)
    //         return replyID === postID ? 'hello' : null
    //       })
          // .map(post => {
          //   console.log(post)
          //   return post
          // })

          // return 'HELLLOOO'

  // }

  // console.log(userReplyDisplayMethods().map(method => {
  //   return method.avatar
  // }));

  // return replyIdTag === postId ? 'hello' : null

  // const userDisplayHandler = (userKey) => {
  //   const userDataMap = Object.keys(Users).map(user => Users[user]).filter((user,index,arr) => userKey == Object.keys(Users)[index])
  //   return {
  //     avatar: userDataMap.map(user => `../../public/images/users/${user.username}/${user.username}.jpg`).toString(),
  //     verificationStatus: userDataMap.map((user,key) => user.verified ? <div key={ key } className="avatar__wrapper"><span><VerifiedUserIcon /></span><span><h5>{ user.real_name }</h5></span></div> : <div key={ key } className="avatar__wrapper"><span><h5>{ user.real_name }</h5></span></div>),
  //     displayName: userDataMap.map(user => user.username).toString()
  //   }
  // }


  // const replyDisplayHandler = (postId) => {
  //   const replyIdTag = Number(Object.keys(Posts).map(post => Posts[post].reply_to).filter(item => item !== undefined))
  //   const userReplyNode = (() => Posts.map(post => post).filter(post => post.reply_to !== undefined).map(post => post))()
  //
  //   const replyUser = Number((() => userReplyNode.map(node => node.user))())
  //   const replyUserAvatar = () => userDisplayHandler(replyUser).avatar
  //   const replyUserVerificationStatus = () => userDisplayHandler(replyUser).verificationStatus
  //   const replyUserDisplayName = () => userDisplayHandler(replyUser).displayName
  //   const replyTimestamp = () => Number(userReplyNode.map(node => node.ts))
  //   const replyMessage = () => userReplyNode.map(node => node.message).toString()
  //
  //   // console.log(replyUser)
  //   // console.log(replyUserAvatar())
  //   // console.log(replyUserVerificationStatus())
  //   // console.log(replyUserDisplayName())
  //   // console.log(replyTimestamp())
  //   // console.log(replyMessage())
  //
  //   const userReplyObject = {
  //     user: replyUser,
  //     avatar: replyUserAvatar(),
  //     verificationStatus: replyUserVerificationStatus(),
  //     displayName: replyUserDisplayName(),
  //     timestamp: replyTimestamp(),
  //     message: replyMessage()
  //   }
  //
  //
  //   console.log(userReplyObject)
  //
  //   return replyIdTag === postId ? 'hello' : null
  // }

  // const verificationContent = (userData) => {
  //   return userPostMethods(userPost.user).vStatus ?
  //     <div className="avatar__wrapper">
  //       <span>
  //         <VerifiedUserIcon />
  //       </span>
  //       <span>
  //         <h5>{ userPostMethods(userData).vTrue }</h5>
  //       </span>
  //     </div>
  //     :
  //     <div className="avatar__wrapper">
  //       <span>
  //         <h5>{ userPostMethods(userData).vFalse }</h5>
  //       </span>
  //     </div>
  // }

  const linkPreviewDisplayHandler = (link) => {
    return link !== undefined ? <img className="user__image" src={ FetchPreview(userPostMethods(link).url) } /> : null
  }

  const completePostItemDisplayHandler = (userPost,postKey) => {
    console.log(userPost)
    // userReplyDisplayHandler(userPost.id)
      return !userPost.reply_to ? (
      <div id={ userPost.id } key={ postKey } className="timeline__list__wrapper">
        <div className="timeline__list__item">
          <div className="item__left">
            <img className="user__avatar" src={ userPostMethods(userPost.user).avatar } />
          </div>
          <div className="item__right">
            <div className="user__info">
              { userPostMethods(userPost.user).vContent }
              <div className="user__info__spacer"> - </div>
                <div className="user__displayName">
                  <h5>@{ userPostMethods(userPost.user).uName }</h5>
                </div>
              <div className="post__date">
                <h6>{ userPostMethods(userPost.ts).tStamp }</h6>
              </div>
            </div>
              {
                (()=>
                  userPost.imagePreviewSrc !== undefined ?
                    <div className="post__message">
                      <p>
                        { userPostMethods(userPost.message).msg }
                        <span className="message__link">
                          <button onClick={ (()=>window.open(userPost.url,'_blank')) }>
                            <LinkIcon />
                          </button>
                        </span>
                      </p>
                      <img className="user__imageUpload"
                           src={ userPostMethods(userPost.imagePreviewSrc).imagePreviewSrc }
                           onClick={ (()=>window.open(userPost.url,'_blank')) }/>
                    </div>
                    :
                    <div className="post__message">
                      <p>{ userPostMethods(userPost.message).msg }</p>
                    </div>
                )()
              }
          </div>
        </div>
        { replyContentNodeHandler(userPost.id) }
      </div>
      )
      :
      null
  }

    return (
      Posts.map((post,key) => completePostItemDisplayHandler(post,key))
    )
  }
}

// export default ListItem
