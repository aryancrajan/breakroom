import { momentsData } from './data.js'
const tweetInput = document.getElementById('moment-input')
const tweetBtn = document.getElementById('celebrate-btn')

tweetBtn.addEventListener('click', function(){
    console.log(tweetInput.value)
})

function getFeedHtml(){
    let feedHtml = ``
    momentsData.forEach(function(tweet){
        feedHtml += `
<div class="moment">
    <div class="moment-inner">
         <img src="${tweet.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="moment-text">${tweet.tweetText}</p>
            <div class="moment-details">
                <span class="moment-detail">
                    <i class="fa-regular fa-comment-dots"></i>
                    ${tweet.replies.length}
                </span>
                <span class="moment-detail">
                    <i class="fa-solid fa-heart"></i>
                    ${tweet.likes}
                </span>
                <span class="moment-detail">
                    <i class="fa-solid fa-retweet"></i>
                    ${tweet.retweets}
                </span>
            </div>   
        </div>            
    </div>
</div>
`
   })
   return feedHtml 
}

function render(){
    document.getElementById('feed').innerHTML = getFeedHtml()
}

render()

