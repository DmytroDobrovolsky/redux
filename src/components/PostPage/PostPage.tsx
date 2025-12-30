import { useSelector } from "react-redux";
import { usePostPage } from "./usePostPage"
import type { RootState } from "./../../app/store";
import Button from "@mui/material/Button";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import "./PostPage.css"

const PostPage = () => {

    const { usersPosts, users } = useSelector((state: RootState) => state.counter);

    const { handleChangePostInput, confirmButtClick, handleChangeSelect, likeButtClick, commentButtClick, repostButtClick, userPost, status, selectVal } = usePostPage(users);

    return (
        <div className="postsPage">
                <form className="inputsCont">
                    <select className="selectInp" value={selectVal || ""} onChange={handleChangeSelect}>
                        <option value="" disabled> Select User </option>
                        {users.map((user) => (
                            <option key={user.userName + user.userName.length}>{user.userName}</option>
                        ))}
                    </select>
                    <input name="name" className="inputs" type="text" placeholder="Your name" value={userPost.name} onChange={handleChangePostInput} />
                    <input name="userName"  className="inputs" type="text" placeholder="Your user name" value={userPost.userName} onChange={handleChangePostInput} />
                    <input name="userLogo"  className="inputs" type="text" placeholder="Your logo" value={userPost.userLogo} onChange={handleChangePostInput} />
                    <input name="userImg"  className="inputs" type="text" placeholder="Your post Img" value={userPost.userImg} onChange={handleChangePostInput} />
                    <textarea name="text" className="myPost" placeholder="Your post" value={userPost.text} onChange={handleChangePostInput}></textarea>
                    <button type="button" className="confirmButt" onClick={confirmButtClick}>Confirm</button>
                    {!status && (<p className="pError"> Fill in all the fields</p>)}
                </form>
            <div className="postsCont">
                <h2 className="h1Post">Posts</h2>
                {usersPosts.map((post) => (
                    <div className="posts" key={post.data + post.text.length}>
                         <div className="userInfo">
                        <img className="logo" src={post.userLogo} alt="userLogo" />
                        <p className="nameInfo">{post.name}</p>
                        <p className="nameInfo">@{post.userName}</p>
                        </div>
                        <div className="contTextData">
                        <span>{post.text}</span>
                        <p className="pData">{post.data}</p>
                        </div>
                        <img className="imgUser" src={post.userImg} alt="userImg" />
                        <div className="reactionBntsCont">
                        <Button className="reactionBtn" onClick={() => likeButtClick(post.postId)}><ThumbUpIcon />{post.like}</Button>
                        <Button  className="reactionBtn" onClick={() => repostButtClick(post.postId)}><ReplyAllIcon sx={{ transform: "rotate(160deg)" }}/>{post.repost}</Button>
                        <Button  className="reactionBtn" onClick={() => commentButtClick(post.postId)}><ChatOutlinedIcon/>{post.comment}</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default PostPage;