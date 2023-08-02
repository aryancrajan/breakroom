import { momentsData } from './data.js'
const momentInput = document.getElementById('moment-input')
const celebrateBtn = document.getElementById('celebrate-btn')

celebrateBtn.addEventListener('click', function(e){
    if (e.target.dataset.size){
        console.log(e.target.dataset.size)
    }
})

document.addEventListener('click', function(e){
    if (e.target.dataset.likes)
       handleLikeClick(e.target.dataset.likes)   
})

function handleLikeClick(momentId){
   const targetMomentObj=momentsData.filter(function(moment){
    return moment.uuid==momentId
   })[0]
   targetMomentObj.likes++
   console.log(targetMomentObj)
   render()
}

function getFeedHtml(){
    let feedHtml = ``
    momentsData.forEach(function(moment){
        feedHtml += `
<div class="moment">
    <div class="moment-inner">
         <img src="${moment.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${moment.handle}</p>
            <p class="moment-text">${moment.tweetText}</p>
            <div class="moment-details">
                <span class="moment-detail">
                    <i class="fa-regular fa-comment-dots"></i>
                    ${moment.replies.length}
                </span>
                <span class="moment-detail">
                    <i class="fa-solid fa-heart" data-likes="${moment.uuid}"></i>
                    ${moment.likes}
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

