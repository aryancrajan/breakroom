import { momentsData } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';


document.addEventListener('click', function(e){
    if (e.target.dataset.likes)
       handleLikeClick(e.target.dataset.likes)
    else if(e.target.id === 'celebrate-btn')
        handleCelebrateBtnClick()
    else if(e.target.dataset.reply){
        console.log('hai')
        handleReplyClick(e.target.dataset.reply)
    }   
})

function handleLikeClick(momentId){
   const targetMomentObj=momentsData.filter(function(moment){
    return moment.uuid==momentId
   })[0]
   if(targetMomentObj.isLiked)
        targetMomentObj.likes--
    else 
        targetMomentObj.likes++
    targetMomentObj.isLiked=!targetMomentObj.isLiked
   render()
}

function handleReplyClick(replyId){
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')}


function handleCelebrateBtnClick(){
if(momentInput.value){
    momentsData.unshift({
        handle: `@Scrimba`,
        profilePic: 'assets/logo/logo.jpeg' ,
        likes: 0,
        retweets: 0,
        momentText: momentInput.value,
        replies: [],
        isLiked: false,
        uuid: uuidv4()
    })
    render()
    momentInput.value=''
}
}



function getFeedHtml(){
    let feedHtml = ``
    momentsData.forEach(function(moment){
        let likeIconClass = ''
        if(moment.isLiked)
            { likeIconClass='like'} 
        let repliesHtml=''
        if(moment.replies.length > 0){
            moment.replies.forEach(function(reply){
            repliesHtml+=`
            <div class="moment-reply">
            <div class="moment-inner">
            <img src="${reply.profilePic}" class="profile-pic">
             <div>
             <p class="handle">${reply.handle}</p>
             <p class="momentt-text">${reply.momentText}</p>
         </div>
            </div>
            </div>
                `
             })
            }
        feedHtml += `
<div class="moment">
    <div class="moment-inner">
         <img src="${moment.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${moment.handle}</p>
            <p class="moment-text">${moment.momentText}</p>
            <div class="moment-details">
                <span class="moment-detail">
                    <i class="fa-regular fa-comment-dots" data-reply="${moment.uuid}"></i>
                    ${moment.replies.length}
                </span>
                <span class="moment-detail">
                    <i class="fa-solid fa-heart ${likeIconClass}" data-likes="${moment.uuid}"></i>
                    ${moment.likes}
                </span>
                
            </div>   
        </div>            
    </div>
    <div class="hidden" id="replies-${moment.uuid}">
    ${repliesHtml}
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

