import React, { useRef , useState } from "react";
import "./gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import newRequest from "../../utils/newRequest";
import { useQuery } from '@tanstack/react-query';
import { useLocation } from "react-router-dom";


function Gigs () {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("sales");
  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation()
  // console.log(location)

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
     newRequest.get(
      `/gig${search}&min=${minRef.current.value}&max=${maxRef.current.value}`
      )
      .then((res) => {
      return res.data;
     }),
      
  });

  console.log(data);



  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

const apply = () => {
 
  refetch()
};


  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">WorhHub : Graphics and Design :</span>
        <h1>AI Artists</h1>
        <p>
          {" "}
          Explore he boundaries of art and technology with WorkHub's AI artists{" "}
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input type="text" placeholder="min" />
            <input type="text" placeholder="max" />
            <button>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">SortBy :</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling </span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {isLoading
           ? "loading" 
           : error 
           ? " Something went wrong!!" 
           : data.map((gig) => <GigCard key={gig._id} item={gig} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Gigs;
