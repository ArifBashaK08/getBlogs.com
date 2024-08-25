import { useContext } from "react"
import { ContextStore } from "../context/ContextStore"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom"


const BlogCatergory = () => {

  const { navigationKeys } = useContext(ContextStore)

  return (
    <div className="w-full grid grid-col-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
      {navigationKeys.map(({ catName, catLink, catImg }) => (
        <Card className="h-[10rem] bg-transparent px-2 md:px-0 border-none">
          <CardContent className="flex items-center justify-center h-full w-full rounded-lg relative p-0">
            <div className="w-full h-full rounded-lg">
              <img src={catImg} alt={catName} className="h-full w-full object-cover rounded-lg" />
            </div>
            <Link to={catLink} className="blog-category-class">{catName}</Link>
          </CardContent>
        </Card>
      ))
      }
    </div>

  )
}
export default BlogCatergory