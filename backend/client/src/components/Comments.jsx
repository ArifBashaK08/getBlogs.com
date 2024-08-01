import { useState } from "react";
import { IoSendSharp } from "react-icons/io5";


const Comments = () => {

    const [visibility, setVisibility] = useState(false)
    const [comments, setComments] = useState([{
        comment: "It's yummy!!!"
    }])
    const addComment = () => { }

    return (
        <div className="">
            <form onSubmit={addComment}>
                <input type="text" placeholder="Add comment here..." />
                <button type="submit"><IoSendSharp size={20} /></button>
            </form>
            <div className="comments">
                {comments.map(({comment}) => (
                    <div className="">
                        <img src="" alt="User" />
                        <div className="">
                            <p><strong>UserName</strong><span>posted on</span></p>
                            <p>{comment}</p>
                        </div>
                    </div>
                ))
                }
            </div>

        </div>
    )
}
export default Comments