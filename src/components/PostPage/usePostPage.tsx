import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser, addPost, likePost, commentPost, repostPost } from "../../app/slicers/couter";

export const usePostPage = (users: ({ name: string, userName: string })[]) => {
    const dispatch = useDispatch();
    const [userPost, setUserPost] = useState({
        reposted: false,
        liked: false,
        commented: false,
        postId: 0,
        userLogo: "",
        name: "",
        userName: "",
        data: "0",
        text: "",
        userImg: "",
        like: 0,
        repost: 0,
        comment: 0,
    });

    const [status, setStatus] = useState(true);
    const [selectVal, setSelectVal] = useState("")

    const usersValidation = () => {
        const exists = users.some((user) => user.name === userPost.name && user.userName === userPost.userName);
        const result = !exists;
        const newUserObj = {
            name: userPost.name,
            userName: userPost.userName,
        }
        if (result) {
            return newUserObj;
        }
    }

    const handleChangePostInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUserPost(prev => ({ ...prev, [name]: value }));
    }

    const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setSelectVal(value);
    }

    const confirmButtClick = () => {
        const isUser = usersValidation();
        const emptyKeys = Object.values(userPost);
        const today = new Date();
        const formatted = today.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
        
        const addNewInfoToPost = { ...userPost, data: formatted, postId: Math.random() };

        if (emptyKeys.includes("")) {
            setStatus(false);
        }
        else if (isUser !== undefined) {
            dispatch(addUser(isUser));
            dispatch(addPost(addNewInfoToPost));
            setStatus(true);
            setUserPost({
                reposted: false, commented: false, liked: false, postId: 0, userLogo: "", name: "", userName: "", data: formatted, text: "", userImg: "", like: 0, repost: 0,
                comment: 0,
            });
        }
        else {
            dispatch(addPost(addNewInfoToPost));
            setStatus(true);
            setUserPost({
                reposted: false, commented: false, liked: false, postId: 0, userLogo: "", name: "", userName: "", data: formatted, text: "", userImg: "", like: 0, repost: 0,
                comment: 0,
            });
        }
    }

    const likeButtClick = (postId: number) => {
        dispatch(likePost(postId));
    }

    const commentButtClick = (postId: number) => {
        dispatch(commentPost(postId));
    }

    const repostButtClick = (postId: number) => {
        dispatch(repostPost(postId));
    }

    useEffect(() => {
        users.forEach((user) => {
            if (user.userName === selectVal) {
                setUserPost(prev => ({ ...prev, userName: user.userName, name: user.name }));
            }
        });
    }, [users, selectVal]);

    return { handleChangePostInput, handleChangeSelect, confirmButtClick, likeButtClick, commentButtClick, repostButtClick, userPost, status };
}
