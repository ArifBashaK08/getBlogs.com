import * as React from "react"
import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
// import moment from "moment"

const HomeCarousel = ({ posts }) => {
    const carouselPosts = posts.slice(5, 11)
    return (
        <Carousel opts={{
            align: "start",
            loop: true,
        }} className="w-full h-full bg-transparent">
            <CarouselContent className="h-full">
                {carouselPosts.map(({ _id, description, img, title }) => (
                    <CarouselItem key={_id} className="h-full">
                        <Card className="h-full bg-transparent">
                            <CardContent className="h-full relative p-0">

                                <div className="w-full h-[20rem] lg:h-[40rem]">
                                    <img src={img} alt={title} className="h-full w-full object-cover" />
                                </div>

                                {/* TITLE & DESCRIPTION */}
                                <div className="home-title-desc-class">
                                    <div className="flex flex-col gap-2 flex-1 relative group overflow-hidden">
                                        {/* TITLE */}
                                        <Link to={`/post/${_id}`}>
                                            <h1 className=" text-xl lg:text-3xl font-bold ">
                                                {title.length > 50 ? title.slice(0, 50) + "..." : title}
                                            </h1>
                                        </Link>

                                        {/* DESCRIPTION */}
                                        <p className="text-xs md:text-md lg:text-xl">
                                            {description.length > 150 ? description.slice(0, 150) + "..." : description}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>

    )
}

export default HomeCarousel;