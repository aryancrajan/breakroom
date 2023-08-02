import { momentsData } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
const momentInput = document.getElementById('moment-input')
// const celebrateBtn = document.getElementById('celebrate-btn')

document.addEventListener('click', function(e){
    if (e.target.dataset.likes)
       handleLikeClick(e.target.dataset.likes)
    else if(e.target.id === 'celebrate-btn'){
        handleCelebrateBtnClick()
    }   
})

function handleLikeClick(momentId){
   const targetMomentObj=momentsData.filter(function(moment){
    return moment.uuid==momentId
   })[0]
   if(targetMomentObj.isLiked)
        targetMomentObj.likes--
    else if(!targetMomentObj.isLiked)
        targetMomentObj.likes++
    targetMomentObj.isLiked=!targetMomentObj.isLiked
   console.log(targetMomentObj.likes)
   render()
}

function handleCelebrateBtnClick(){
    momentsData.unshift({
        handle: `@Scrimba`,
        profilePic: 'assets/logo/logo.jpeg' ,
        likes: 0,
        retweets: 0,
        tweetText: momentInput.value,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: uuidv4()
    })
    render()
}

function getFeedHtml(){
    let feedHtml = ``
    momentsData.forEach(function(m){
        let likeIconClass = ''
        if(m.isLiked)
            { likeIconClass='like'} 
        feedHtml += `
<div class="moment">
    <div class="moment-inner">
         <img src="${m.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${m.handle}</p>
            <p class="moment-text">${m.tweetText}</p>
            <div class="moment-details">
                <span class="moment-detail">
                    <i class="fa-regular fa-comment-dots"></i>
                    ${m.replies.length}
                </span>
                <span class="moment-detail">
                    <i class="fa-solid fa-heart ${likeIconClass}" data-likes="${m.uuid}"></i>
                    ${m.likes}
                </span>
                
            </div>   
        </div>            
    </div>
</div>
`

{/* <span class="moment-detail">
                    <i class="fa-solid fa-retweet"></i>
                    ${moment.retweets}
                </span> */}
   })
   return feedHtml 
}

function render(){
    document.getElementById('feed').innerHTML = getFeedHtml()
}

render()

