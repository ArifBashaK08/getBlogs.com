import noData from "/dataNotFound.webp"

const NoData = () => {
  return (
    <div className="noData">
      <img src={noData} alt="Data not found!" />
    </div>
  )
}
export default NoData