import { useState } from "react";
import { IoSendSharp } from "react-icons/io5";


const Comments = () => {

    const [comments, setComments] = useState([{
        comment: "It's yummy!!!"
    },
    {
        comment: "It tastes so good!!!"
    }
])
    const addComment = (e) => { 
        e.preventDefault()
        setComments(e.taget.value)
     }

    return (
        <div className="">
            <form onSubmit={addComment}>
                <input type="text" placeholder="Add comment here..." />
                <button type="submit"><IoSendSharp size={20} /></button>
            </form>
            <div className="comments">
                {comments.map(({comment}, index) => (
                    <div className="" key={index}>
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