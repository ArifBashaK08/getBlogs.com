import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const MixedPosts = ({ posts, title }) => {

  const { pathname } = useLocation()

  pathname === "/" ? (posts = posts.slice(0, 7)) : null;

  return (
    <>
      <div className="rounded-lg p-2 box-border flex flex-col items-center justify-center gap-2">
        <Link to={"/all-blogs"} className="text-xl lg:text-2xl font-bold uppercase">{title}</Link>
        <hr className="text-gray-800" />
        <Carousel className="min-w-full w-[98vw]">
          <CarouselContent className="-ml-1 flex items-center">
            {posts.map(({ title, img, description, _id, cat }) => (
              <CarouselItem key={_id} className="pl-1 md:basis-1/3 lg:basis-1/4">
                <div className="p-1">
                  <Card className="bg-transparent">
                    <CardContent className="flex items-center justify-center relative p-0">
                      <Link to={`/?cat=${cat}`}
                        className="blog-carousel-card-link-class"
                      >{cat[0].toUpperCase() + cat.slice(1)}</Link>
                      <div className="w-full h-[15rem] rounded-lg">
                        <img src={img} alt={title} className="h-full w-full object-cover rounded-lg" />
                      </div>
                      {/* TITLE & DESCRIPTION */}

                      <div className="flex items-center justify-between absolute z-20 bottom-0 left-0 right-0 text-white bg-gradient-to-t from-black to-transparent p-2 lg:p-4 rounded-lg ">
                        <div className="flex flex-col gap-2 flex-1 relative group overflow-hidden">
                          {/* TITLE */}
                          <Link to={`/post/${_id}`}>
                            <h1 className="lg:text-xl font-bold transform translate-y-0 group-hover:-translate-y-full transition-all duration-300 ease-in-out">
                              {title.length > 50 ? title.slice(0, 50) + "..." : title}
                            </h1>
                          </Link>

                          {/* DESCRIPTION */}
                          <p className="text-xs md:text-sm lg:text-md transform translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                            {description.length > 100 ? description.slice(0, 100) + "..." : description}
                          </p>
                        </div>
                      </div>

                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
            {pathname === "/" && (
              <Card className="h-[15rem] bg-transparent">
                <CardContent className="flex items-center justify-center h-full w-[15rem] bg-gradient-to-r from-white to-transparent rounded-lg">
                  <Link to="/all-blogs" className="">more...</Link>
                </CardContent>
              </Card>
            )}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  )
}

export default MixedPosts;